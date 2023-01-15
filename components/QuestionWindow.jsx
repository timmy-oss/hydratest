import { useEffect, useState, memo } from "react";
import QuestionAnswerSelector from "./QuestionAnswerSelector";
import { RpcRequest } from "../lib/rpc";

const disallowedStates = ["warning", "error", "idle"];

const QuestionWindow = memo(function ({
  session,
  status,
  auth,
  setActiveQ,
  ...props
}) {
  const [q, setQ] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [activeQid, setQid] = useState(session.question_ids[0]);

  const noInput = disallowedStates.includes(status);

  function toNextQ() {
    if (fetching) return;
    const i = session.question_ids.indexOf(activeQid);
    if (i !== -1) {
      const next = i + 1;

      if (next < session.question_ids.length) {
        setQid(session.question_ids[next]);
      } else {
        setQid(session.question_ids[0]);
      }
    }
  }

  function toPrevQ() {
    if (fetching) return;

    const i = session.question_ids.indexOf(activeQid);
    if (i !== -1) {
      let prev = i - 1;

      if (prev < 0) prev = session.question_ids.length;

      setQid(session.question_ids[prev]);
    }
  }

  function externalSetQ(i) {
    if (i >= 0 && i < session.question_ids.length) {
      setQid(session.question_ids[i]);
    } else {
      console.log(i, "exceeded");
    }
  }

  // console.log(session);

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
    if (setActiveQ) {
      setActiveQ({
        id: activeQid,
        i: session.question_ids.lastIndexOf(activeQid),
        externalSetQ,
      });
    }
    fetchQ();
  }, [activeQid, session]);

  return (
    <>
      <p className="text-sm pl-2 text-[#241142]  mt-4 hover:cursor-pointer font-bold">
        Question{" "}
        {(activeQid && session.question_ids.indexOf(activeQid) + 1) || 1}
      </p>

      <div
        style={{ fontFamily: "Mulish" }}
        className="min-h-[300px]  mt-2 rounded-lg pt-6 shadow-xl border border-gray-100/80"
      >
        <p className="text-black/80 font-normal px-6 text-xl">
          {fetching || !q ? "Loading..." : q.question_content}
        </p>

        {q && q.question_type === "objective" && (
          <QuestionAnswerSelector question={q} status={status} />
        )}
        <hr className="mt-4" />
        <div className="  flex flex-row justify-between  ">
          <div className="min-w-[20%] text-sm flex flex-row  space-x-4 px-4 py-4">
            <button
              disabled={noInput}
              onClick={toPrevQ}
              className={
                " capitalize bg-[#5A5AB5] disabled:opacity-40 disabled:cursor-not-allowed px-6 rounded-lg hover:bg-[#5A5AB5]/90 rounded-l-md transition-colors duration-300 text-white py-2  block   "
              }
              role="button"
            >
              <i className="bi-arrow-left"></i>&nbsp; Back
            </button>

            <button
              disabled={noInput}
              onClick={toNextQ}
              className={
                " capitalize disabled:opacity-40 disabled:cursor-not-allowed bg-[#3a3a9a] px-6 rounded-lg hover:bg-[#3a3a9a]/90 rounded-r-md transition-colors duration-300 text-white py-2 block "
              }
              role="button"
            >
              Save &nbsp;
              <i className="bi-fast-forward"></i>
            </button>
          </div>

          <div
            className={
              " min-w-[20%] text-sm flex flex-row  space-x-4 px-4 py-4 "
            }
          >
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
              disabled={noInput}
              className={
                " capitalize disabled:opacity-40 disabled:cursor-not-allowed xl:hidden bg-blue-500 px-6 rounded-lg hover:bg-blue-500/90 rounded-l-md transition-colors duration-300 text-white py-2  block   "
              }
              role="button"
            >
              <i className="bi-arrow-clockwise"></i>&nbsp; Restart
            </button>
            <button
              disabled={noInput}
              className={
                " capitalize disabled:opacity-40 disabled:cursor-not-allowed xl:hidden bg-red-500 px-6 rounded-lg hover:bg-red-500/90 rounded-l-md transition-colors duration-300 text-white py-2  block   "
              }
              role="button"
            >
              <i className="bi-check2-circle"></i>&nbsp; Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default QuestionWindow;
