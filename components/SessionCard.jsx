import { RpcRequest } from "../lib/rpc";
import { useState, useEffect } from "react";

export default function SessionCard({ sessionId, auth }) {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchSession() {
    // console.log(auth);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          sessionId,
        },
      },
    };

    setFetching(true);

    const res = await RpcRequest("sessions.get_one", body);

    if (res.success) {
      setData(res.data);

      // console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  useEffect(() => {
    fetchSession();
  }, [error]);

  if (fetching && !data)
    return <div className="p-8 bg-black/10 rounded-lg">Loading...</div>;

  if (error) return <div className="p-8 bg-black/10 rounded-lg"> Error </div>;

  return (
    <div className="px-6 pt-4 pb-2 bg-black/10 rounded-lg">
      <h1 className="font-bold capitalize text-base text-black/60">
        {data.name}
      </h1>
      <div className=" flex flex-row justify-end items-center uppercase pt-2 text-base text-black space-x-2  px-2 rounded-lg">
        <div>
          <i title="Flag as inappropriate" role="button"></i>

          <span className="text-xs align-middle hidden  text-black">23 </span>
        </div>
        <i
          title="Submit"
          role="button"
          className="bi-send  hover:bg-gray-300 px-2 py-1 rounded-lg"
        ></i>
        <i
          title="Delete"
          role="button"
          className="bi-trash  hover:bg-gray-300 px-2 py-1 rounded-lg"
        ></i>
      </div>
    </div>
  );
}
