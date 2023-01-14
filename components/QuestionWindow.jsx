import { useEffect, useState } from "react";
import QuestionAnswerSelector from "./QuestionAnswerSelector";
import { RpcRequest } from "../lib/rpc";

function QuestionWindow({ session, auth, ...props }) {
  const [q, setQ] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [activeQid, setQid] = useState(session.question_ids[0]);

  async function fetchQ() {
    setFetching(true);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          id: activeQid,
          sessionId: session.id,
        },
      },
    };

    const res = await RpcRequest("exams.session.get_question", body);

    if (res.success) {
      setQ(res.data.question);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  useEffect(() => {
    fetchQ();
  }, [activeQid]);

  return (
    <div
      style={{ fontFamily: "Mulish" }}
      className="min-h-[150px]  mt-2 rounded-lg pt-6 shadow-xl border border-gray-100/80"
    >
      <p className="text-black/80 font-normal px-6 text-xl">
        {fetching || !q ? "Loading..." : q.question_content}
      </p>

      {<QuestionAnswerSelector />}

      <hr className="mt-4" />
      <div className="  flex flex-row justify-between  ">
        <div className="min-w-[20%] text-sm flex flex-row  space-x-4 px-4 py-4">
          <button
            className={
              " capitalize bg-[#5A5AB5] px-6 rounded-lg hover:bg-[#5A5AB5]/90 rounded-l-md transition-colors duration-300 text-white py-2  block   "
            }
            role="button"
          >
            <i className="bi-arrow-left"></i>&nbsp; Back
          </button>

          <button
            className={
              " capitalize bg-[#3a3a9a] px-6 rounded-lg hover:bg-[#3a3a9a]/90 rounded-r-md transition-colors duration-300 text-white py-2 block "
            }
            role="button"
          >
            Save &nbsp;
            <i className="bi-fast-forward"></i>
          </button>
        </div>

        <div className="min-w-[20%] text-sm flex flex-row  space-x-4 px-4 py-4">
          <span
            className={
              " capitalize xl:hidden bg-green-500 px-2 rounded-lg  rounded-l-md transition-colors duration-300 text-white py-2  block   "
            }
          >
            <i className="bi-arrow-sync"></i>&nbsp; Attempted &nbsp;{" "}
            <span className="bg-white  text-sm text-green-500 px-2 py-1 rounded-full">
              {" "}
              0{" "}
            </span>
          </span>
          <button
            className={
              " capitalize xl:hidden bg-blue-500 px-6 rounded-lg hover:bg-blue-500/90 rounded-l-md transition-colors duration-300 text-white py-2  block   "
            }
            role="button"
          >
            <i className="bi-arrow-clockwise"></i>&nbsp; Restart
          </button>
          <button
            className={
              " capitalize xl:hidden bg-red-500 px-6 rounded-lg hover:bg-red-500/90 rounded-l-md transition-colors duration-300 text-white py-2  block   "
            }
            role="button"
          >
            <i className="bi-check2-circle"></i>&nbsp; Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionWindow;
