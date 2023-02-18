import { useEffect, useState, memo } from "react";
import QuestionAnswerSelector from "./QuestionAnswerSelector";
import { RpcRequest } from "../lib/rpc";
import ProgressX from "./ExamProgressX";
import QuestionAnswerInputField from "./QuestionAnswerInputField";
import Image from "next/image";

const disallowedStates = ["warning", "error", "idle"];

function interpolateWithComponent(text, placeholder, render) {
  if (!text.includes(placeholder)) return text;

  const splitTextArr = text.split(placeholder);
  let addedPlaceholder = false;
  let interpolatedArr = [];

  for (let item in splitTextArr) {
    interpolatedArr.push(<span key={item}> {splitTextArr[item]} </span>);

    if (!addedPlaceholder) {
      interpolatedArr.push(render);
      addedPlaceholder = true;
    }
  }

  return interpolatedArr;
}

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
    if (!response || (response && !response.answer)) {
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
          exam: props.id,
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
          exam: props.id,
        },
      },
    };

    const res = await RpcRequest("exams.session.get_question", body);

    if (res.success) {
      setQ(res.data.question);
      if (res.data.response) {
        setResponse({
          qid: res.data.question.id,
          answer: res.data.response.response,
        });
      } else {
        setResponse(null);
      }
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

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 150, left: 0 });
  }, [activeQid]);

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

        <div className="min-h-[250px] ">
          {(fetching && !q) || !q ? (
            <QuestionLoader />
          ) : (
            <div className="relative">
              {q && q.question_type === "objective" && (
                <p className="text-black/80  font-normal px-6 text-xl">
                  {q.question_content}
                </p>
              )}

              {q && q.question_type === "germane" && (
                <>
                  <p className="text-black/80  font-normal px-6 text-xl">
                    {interpolateWithComponent(
                      q.question_content,
                      "%#",
                      <QuestionAnswerInputField
                        key={q.id}
                        response={response}
                        question={q}
                        setResponse={setResponse}
                      />
                    )}
                  </p>

                  {/* Question Illutrsation  */}
                  {q.illustration && (
                    <div className=" rounded-lg mt-8 ml-8">
                      <Image
                        src={q.illustration}
                        width="300"
                        height="200"
                        alt="Question Illustration"
                        className="bg-gray-200 rounded-lg"
                      />
                    </div>
                  )}

                  <div className="transform grayscale absolute  top-12 left-0 right-0 -rotate-6  opacity-20">
                    <h1 className="pt-8  text-8xl tracking-widest 2xl:text-9xl font-bold text-[#5522A9]  text-center ">
                      {" "}
                      HydraTest
                    </h1>
                    <p className="text-center text-xl tracking-widest text-black font-bold pt-4">
                      {" "}
                      The ultimate test
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {q && q.question_type === "objective" && (
            <QuestionAnswerSelector
              key={q.id}
              setResponse={setResponse}
              question={q}
              response={response}
              status={status}
            />
          )}
        </div>
        {/* <hr className="mt-12" /> */}

        <ProgressX progress={progressPercent} />

        <div id="questionwindow" className="relative min-h-[125px]">
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
                onClick={props.showSubmitDialog}
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
