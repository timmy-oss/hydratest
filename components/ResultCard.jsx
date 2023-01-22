import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RpcRequest } from "../lib/rpc";

export function ResultCardPlaceholder({ active }) {
  const [op, setOp] = useState(0.1);
  const [f, setF] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!active) return;

    const step = 0.001;
    const t = setTimeout(() => {
      if (op >= 0.15 && f) {
        setF(false);
      }

      if (op <= 0.05 && !f) {
        setF(true);
      }

      if (f) {
        setOp(op + step);
      }

      if (!f) {
        setOp(op - step);
      }
    }, 3);

    return () => {
      clearTimeout(t);
    };
  }, [op, active]);

  return (
    <div
      style={{
        opacity: op,
      }}
      className="rounded-lg min-w-[300px] min-h-[200px] bg-black  "
    ></div>
  );
}

function ResultCard({ sessionKey, ...props }) {
  async function getResult(sessionKey) {
    setFetching(true);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          sessionKey,
        },
      },
    };

    const res = await RpcRequest("result.generate", body);

    if (res.success) {
      setData(res.data.reverse());

      // console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }
  return <div className=" rounded-lg   border pb-4"></div>;
}

export default ResultCard;
