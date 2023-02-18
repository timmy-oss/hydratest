import { RpcRequest } from "../lib/rpc";
import { useState, useEffect } from "react";

export default function SessionCard({ sessionId, auth, refresh }) {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function deleteSession() {
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

    const res = await RpcRequest("sessions.delete_one", body);

    if (res.success) {
      if (refresh) refresh();
      // console.log("Deleted");
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  async function submitSession() {
    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          sessionId,
          exam: data && data.exam,
          lax: true,
        },
      },
    };

    setFetching(true);

    const res = await RpcRequest("exams.session.submit", body);

    if (res.success) {
      // setError(null);
      if (refresh) refresh();
      // console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

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
    return (
      <div className="py-8 px-4  bg-black/10 text-sm rounded-lg flex flex-col items-center justify-center">
        <p className="w-[20px] h-[20px] inline-block  border-r-2 border-black rounded-full animate-spin text-center border-y-black border-l-black"></p>
      </div>
    );

  if (error)
    return (
      <div className="py-8 px-4  bg-black/10 text-sm rounded-lg flex flex-col items-center justify-center">
        <p className="text-center">
          Unable to load session
          <br />
          <span className="text-xs text-red-500">{error}</span>
        </p>
        <button
          onClick={() => setError(null)}
          className="max-w-[80%] mt-6 block p-1 px-4 border border-black/70 rounded-lg "
        >
          {" "}
          Retry
        </button>
      </div>
    );

  const h = Math.floor(data.elapsed_time / 3600);
  const m = Math.floor((data.elapsed_time % 3600) / 60);
  const s = Math.floor(data.elapsed_time % 60);

  return (
    <div className="px-6 pt-4 pb-2 bg-[#5522A9]/10 rounded-lg">
      <h1 className=" capitalize text-sm text-stone-700 font-normal">
        {data.name.split("-")[0]} ({data.name.split("-")[1]})
      </h1>

      <p className=" capitalize my-2 text-sm text-stone-700 font-normal">
        {new Date(data.created * 1000).toLocaleString()}
      </p>

      <p className=" capitalize my-2 text-sm text-stone-700 font-normal">
        {data.question_ids.length} questions
      </p>

      <p className=" capitalize my-2 text-sm text-stone-700 font-normal">
        {data.attempted_question_ids.length} attempted
      </p>

      <p className="  my-2  text-[#5522A9] text-xs font-bold">
        {h}H {m}M {s}S elapsed
      </p>

      {data.submitted && (
        <p className=" capitalize my-2 text-xs font-bold text-green-500">
          Submitted <i className="bi-check-circle"></i>
        </p>
      )}

      {!data.is_active ? (
        <p className=" capitalize my-2 text-xs font-bold text-red-500">
          Inactive <i className="bi-x-circle"></i>
        </p>
      ) : (
        <p className=" capitalize my-2 text-xs font-bold text-green-500">
          Active <i className="bi-check-circle"></i>
        </p>
      )}
      <div className=" py-[1px] mt-4 border-black/50 flex flex-row justify-end items-center uppercase text-sm text-stone-700 font-normal space-x-2  px-2 rounded-3xl">
        {!data.submitted && !fetching && (
          <i
            onClick={submitSession}
            title="Submit"
            role="button"
            className="bi-send  hover:bg-gray-300 px-2 py-1 rounded-lg"
          ></i>
        )}

        {!fetching && (
          <i
            title="Delete"
            onClick={deleteSession}
            role="button"
            className="bi-trash  hover:bg-gray-300 px-2 py-1 rounded-lg"
          ></i>
        )}
      </div>
    </div>
  );
}
