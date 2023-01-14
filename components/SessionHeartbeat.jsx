import { RpcRequest } from "../lib/rpc";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

async function sendHeartbeat(auth, session) {
  const body = {
    req: {
      auth: {
        token: auth.token,
      },
      body: {
        id: session.id,
      },
    },
  };

  return await RpcRequest("exams.session.heartbeat", body);
}

export default function Heartbeat({ session, auth, setStatus, debug = false }) {
  const router = useRouter();
  const [lastPing, setLastPing] = useState(null);
  const [pingInterval, setPingInterval] = useState(session.ping_interval);
  const [error, setError] = useState(null);
  const [failedReqs, setFailedReqs] = useState(0);
  const [beats, setBeats] = useState(0);

  let tId;

  async function heartbeatPipeline() {
    if (debug) {
      console.log(
        "\nHEARTBEAT - ",
        "last successful ping: ",
        lastPing,
        "ping interval : ",
        pingInterval + "s",
        "failed reqs: ",
        failedReqs,
        "\n"
      );
    }

    tId = setTimeout(async () => {
      setStatus("sending");
      const res = await sendHeartbeat(auth, session);
      if (res.success) {
        setLastPing(Date.now());
        if (failedReqs > 0) {
          setFailedReqs(0);
        }

        if (pingInterval !== session.ping_interval) {
          setPingInterval(session.ping_interval);
        }

        setStatus("success");
      } else {
        setError(res.error.message);
        setFailedReqs(failedReqs + 1);
        if (failedReqs > 2) {
          setPingInterval(session.ping_interval * (failedReqs - 1));
          setStatus("error");
        } else {
          setStatus("warning");
        }
        console.log(res.error, "Ping Inteval: ", pingInterval, "s");
      }

      setBeats(beats + 1);
    }, pingInterval * 1000);
  }

  useEffect(() => {
    if (!router.isReady) return;

    heartbeatPipeline();

    return () => {
      clearTimeout(tId);
    };
  }, [beats, router.isReady]);

  return null;
}
