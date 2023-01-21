import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RpcRequest } from "../lib/rpc";

export default function SubmitPrompter({ closeMe, auth, session }) {
  const router = useRouter();
  const [fetching, setFetching] = useState(false);

  const [countDown, setCountDown] = useState(10);

  async function submitExam() {
    setFetching(true);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          exam: router.query.examId,
          sessionId: session && session.id,
        },
      },
    };

    const res = await RpcRequest("exams.session.submit", body);

    if (res.success) {
      router.replace("/portal");
    } else {
      closeMe();
      setError(res.error.message);
      console.log(res.error);
      setFetching(false);
    }
  }

  useEffect(() => {
    const tId = setInterval(() => {
      if (countDown > 1) {
        setCountDown(countDown - 1);
      } else {
        submitExam();
      }
    }, 1000);

    return () => {
      clearInterval(tId);
    };
  }, [countDown]);

  return (
    <>
      {" "}
      <div className="fixed z-20 top-0 right-0 left-0 bottom-0 bg-black/60 w-full"></div>
      <div
        style={{ fontFamily: "Mulish" }}
        className={
          "absolute top-[20%] z-20 right-0 left-0 w-[70%] max-w-xl mx-auto min-h-[200px] bg-white shadow-lg rounded-lg  p-2 "
        }
      >
        <div className="mx-auto mt-4 flex flex-col justify-center items-center">
          <i className="bi-emoji-frown text-6xl text-red-500"></i>
        </div>

        <p className="text-black/80 text-xl px-4 pt-4 text-center font-bold">
          Oops! Looks like you are out of time.
        </p>

        <p className="px-3 py-1 text-sm font-bold text-center text-red-500 ">
          Submitting in {countDown}...
        </p>

        <button
          disabled={fetching}
          onClick={submitExam}
          className="block border border-black/40 mt-6 transition-colors mb-2 hover:bg-black/10 w-[60%] mx-auto text-lg outline-none text-black/60 px-2 py-1 rounded-lg "
        >
          {fetching ? (
            <p className="w-[15px] h-[15px] inline-block  border-r-2 border-black/60 rounded-full animate-spin text-center border-y-white border-l-white"></p>
          ) : (
            "Submit now"
          )}
        </button>
      </div>
    </>
  );
}
