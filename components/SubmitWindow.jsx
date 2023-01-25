import { useRouter } from "next/router";
import { useState } from "react";
import { RpcRequest } from "../lib/rpc";

export default function SubmitWindow({ closeMe, auth, session }) {
  const router = useRouter();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const unattemptedQs =
    session.question_ids.length - session.attempted_question_ids.length;

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
      router.replace("/portal?post_submit=true");
    } else {
      closeMe();
      setError(res.error.message);
      setFetching(false);
      console.log(res.error);
    }
  }

  return (
    <>
      {" "}
      <div className="fixed z-20 backdrop-blur-md top-0 right-0 left-0 bottom-0 bg-black/60 w-full"></div>
      <div
        style={{ fontFamily: "Mulish" }}
        className={
          "fixed top-[20%] z-20 right-0 left-0 w-[70%] max-w-xl mx-auto min-h-[200px] bg-white shadow-lg rounded-lg  p-2 "
        }
      >
        <div className="mx-auto mt-4 flex flex-col justify-center items-center">
          <i className="bi-send text-6xl text-[#5522A9]"></i>
        </div>

        <p className="text-black/80 text-xl px-4 pt-4 text-center font-bold">
          Are you sure you want to submit?
        </p>

        {unattemptedQs > 0 && (
          <p className="px-3 py-1 text-sm font-bold text-center text-red-500  ">
            (You still have {unattemptedQs} unattempted
            {unattemptedQs > 1 ? " questions" : " question"})
          </p>
        )}

        <div className="mt-8 flex flex-row justify-around items-center space-x-4 px-4">
          <button
            disabled={fetching}
            onClick={closeMe}
            className="block border border-black/40  transition-colors mb-2 hover:bg-black/10 w-[40%] mx-auto text-lg outline-none text-black/60 px-2 py-1 rounded-lg "
          >
            Continue exam
          </button>

          <button
            disabled={fetching}
            onClick={submitExam}
            className="block   transition-colors mb-2 hover:bg-[#5522A9]/80 w-[40%] mx-auto text-lg outline-none text-white px-2 py-1 rounded-lg bg-[#5522A9]"
          >
            {fetching ? (
              <p className="w-[15px] h-[15px] inline-block  border-r-2 border-white rounded-full animate-spin text-center border-y-white border-l-white"></p>
            ) : (
              "Submit now"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
