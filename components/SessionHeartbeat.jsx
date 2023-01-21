import { RpcRequest } from "../lib/rpc";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MAX_PING_INTERVAL = 30;

async function sendHeartbeat(auth, session, exam, init) {
  const body = {
    req: {
      auth: {
        token: auth.token,
      },
      body: {
        id: session.id,
        exam: exam.id,
        init,
      },
    },
  };

  return await RpcRequest("exams.session.heartbeat", body);
}

export default function Heartbeat({
  session,
  auth,
  exam,
  setStatus,
  status,
  setElapsedTime,
  debug = false,
  autoSubmit,
}) {
  const router = useRouter();
  const [lastPing, setLastPing] = useState(null);
  const [pingInterval, setPingInterval] = useState(session.ping_interval);
  const [error, setError] = useState(null);
  const [failedReqs, setFailedReqs] = useState(0);
  const [beats, setBeats] = useState(0);

  let tId;

  async function heartbeatReq(init = false) {
    if (status === "success") {
      setStatus("sending");
    }

    const res = await sendHeartbeat(auth, session, exam, init);
    if (res.success) {
      setElapsedTime(res.data.session.elapsed_time);

      setLastPing(Date.now());
      if (failedReqs > 0) {
        setFailedReqs(0);
      }

      if (pingInterval !== session.ping_interval) {
        setPingInterval(session.ping_interval);
      }
      setStatus("success");

      if (res.data.auto_submit && autoSubmit) {
        setStatus("idle");
        autoSubmit();
        return;
      }
    } else {
      setError(res.error.message);
      setFailedReqs(failedReqs + 1);
      if (failedReqs > 2) {
        if (!(pingInterval >= MAX_PING_INTERVAL)) {
          setPingInterval(session.ping_interval * failedReqs);
        }

        setStatus("error");
      } else {
        setStatus("warning");
      }
      console.log(res.error, "Ping(", pingInterval, ")");
    }

    setBeats(beats + 1);
  }

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

    if (beats === 0) {
      await heartbeatReq(true);
    }
    tId = setTimeout(heartbeatReq, pingInterval * 1000);
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
