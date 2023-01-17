import { useEffect, useState, memo } from "react";
import QuestionAnswerSelector from "./QuestionAnswerSelector";
import { RpcRequest } from "../lib/rpc";
import { encryptRsa, decryptRsa } from "../lib/securesession";
import ProgressX from "./ExamProgressX";

const disallowedStates = ["warning", "error", "idle"];

function QuestionLoader() {
  return (
    <div className="w-[98%] px-6 flex flex-col justify-center items-start space-y-3 py-3">
      <div className="rounded-md py-3 w-full bg-black/10"></div>
      <div className="rounded-md py-3 w-[80%] bg-black/10"></div>
      {/* <div className="rounded-md py-3 w-[60%] bg-black/10"></div> */}
    </div>
  );
}

const QuestionWindow = memo(function ({
  session,
  status,
  auth,
  setActiveQ,
  setSession,
  fetching,
  setQWindowFetching: setFetching,
  ...props
}) {
  const [q, setQ] = useState(null);
  const [error, setError] = useState(null);
  const [activeQid, setQid] = useState(session.question_ids[0]);
  const [response, setResponse] = useState(null);

  const noInput = disallowedStates.includes(status) || fetching;
  const progressPercent = session
    ? (session.attempted_question_ids.length / session.question_ids.length) *
      100
    : 0;

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

      if (prev < 0) prev = session.question_ids.length - 1;

      setQid(session.question_ids[prev]);
    }
  }

  function externalSetQ(i) {
    if (i >= 0 && i < session.question_ids.length) {
      setQid(session.question_ids[i]);
    }
  }

  // console.log(session);

  async function submitResponse() {
    if (!response) {
      toNextQ();
      return;
    }
    setFetching(true);

    // const encryptedResponse = encryptRsa(
    //   JSON.stringify(response),
    //   session.public_key
    // );

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          response,
          sessionId: session.id,
        },
      },
    };

    const res = await RpcRequest("exams.session.submit_response", body);

    if (res.success) {
      toNextQ();
      setSession(res.data.session);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

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

    if (response) {
      setResponse(null);
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
        className="relative  mt-2 rounded-lg pt-6 shadow-lg border border-black/10"
      >
        {(fetching || !q) && (
          <div className="absolute  -top-2 -right-2 bg-[#5522A9] shadow-lg rounded-full px-2 py-1">
            <i className="bi-arrow-repeat block animate-spin text-white text-base " />
          </div>
        )}

        <div className="min-h-[100px]">
          {(fetching && !q) || !q ? (
            <QuestionLoader />
          ) : (
            <p className="text-black/80  font-normal px-6 text-xl">
              {q.question_content}
            </p>
          )}

          {q && q.question_type === "objective" && (
            <QuestionAnswerSelector
              setResponse={setResponse}
              question={q}
              status={status}
            />
          )}
        </div>
        {/* <hr className="mt-12" /> */}

        <ProgressX progress={progressPercent} />

        <div className="relative min-h-[125px]">
          <div className=" absolute bottom-2  right-0 left-0 flex flex-row justify-between  ">
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
                onClick={submitResponse}
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
                  {session.attempted_question_ids.length}
                </span>
                <span className="inline-block px-2 ">of</span>
                <span className="bg-white  text-sm text-green-500 px-2 py-1 rounded-full">
                  {session.question_ids.length}
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
      </div>
    </>
  );
});

export default QuestionWindow;
