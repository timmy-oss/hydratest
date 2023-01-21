import { useState, useEffect, memo } from "react";
import Head from "next/head";
import Header from "../../../components/Header";
import QuestionsMap from "../../../components/QuestionsMap";
import SidePanel from "../../../components/SidePanel";
import QuestionWindow from "../../../components/QuestionWindow";
import WatchTimer from "../../../components/WatchTimer";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Loader from "../../../components/Loader2";
import { useRouter } from "next/router";
import { RpcRequest } from "../../../lib/rpc";
import InvalidViewportSize from "../../../components/InvalidViewportSize";
import BackToDashboard from "../../../components/BackToDashboard";
import { createSession } from "../../../lib/securesession";
import { NotifyCard } from "../../../components/forms/SignUpForm";
import Heartbeat from "../../../components/SessionHeartbeat";
import SubmitPrompter from "./SubmitPrompter";
import SubmitWindow from "./SubmitWindow";

const SessionController = memo(function ({ auth }) {
  const router = useRouter();
  const [exam, setExam] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("idle");
  const [activeQ, setActiveQ] = useState(null);
  const [qWindowFetching, setQWindowFetching] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [autoSubmitExam, setAutoSubmitExam] = useState(false);
  const [showSubmitWindow, setShowSubmitWindow] = useState(false);

  function showSubmitDialog() {
    setShowSubmitWindow(true);
  }

  async function getExam() {
    setFetching(true);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          id: router.query.examId,
        },
      },
    };

    const res = await RpcRequest("exams.get_one", body);

    if (res.success) {
      setExam(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  // Secure Session Pipeline
  async function connectSession() {
    const { res, key } = await createSession(
      router.query.examId,
      auth.token,
      "resume"
    );

    if (res.success) {
      setSession(res.data);
    } else {
      setError(res.error && res.error.message);
      console.log(res.error);
    }
    setInitializing(false);
  }

  // Automatic Submission

  function autoSubmit() {
    if (!autoSubmitExam) {
      setAutoSubmitExam(true);
    }
  }

  useEffect(() => {
    if (!router.isReady) return;

    // console.log("Ran connectSession");

    connectSession();
  }, [exam]);

  useEffect(() => {
    if (!router.isReady) return;
    if (exam) return;

    // console.log("Ran getExam");

    getExam();
  }, [exam]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>
          {" "}
          {exam ? exam.exam_title : router.isReady && router.query.examId}{" "}
        </title>
      </Head>
      <Header />

      <InvalidViewportSize />

      {exam && session && session.id && autoSubmitExam && (
        <SubmitPrompter
          session={session}
          auth={auth}
          closeMe={() => setAutoSubmitExam(false)}
        />
      )}

      {exam && session && session.id && showSubmitWindow && (
        <SubmitWindow
          auth={auth}
          session={session}
          closeMe={() => setShowSubmitWindow(false)}
        />
      )}

      {initializing || fetching || (!exam && !error) ? (
        <Loader />
      ) : error ? (
        <NotifyCard
          closeOnError={() => {
            setExam(null);
          }}
          error={error}
          eMsg="Unable to establish session."
          errorText="Retry"
        />
      ) : (
        exam &&
        session &&
        session.id && (
          <div className="bg-white min-h-screen hidden space-x-4 pr-2 md:flex flex-row  justify-around items-center w-full ">
            <Heartbeat
              session={session}
              auth={auth}
              setStatus={setStatus}
              status={status}
              exam={exam}
              setElapsedTime={setElapsedTime}
              autoSubmit={autoSubmit}
            />

            <SidePanel
              activeQ={activeQ}
              fetching={qWindowFetching}
              session={session}
              status={status}
              showSubmitDialog={showSubmitDialog}
              {...exam}
            />

            <div
              style={{ fontFamily: "Montserrat" }}
              className=" px-6 mt-20 self-stretch w-[98%] mx-auto xl:w-[83%]  order-1 border-t border-l border-r xl:border-r-0 rounded-lg py-6"
            >
              <BackToDashboard to="portal" />

              <hr className="mb-4" />

              <div className="flex flex-row justify-between sticky z-10 top-2 bg-white left-0 right-0 w-full">
                <h2
                  style={{ fontFamily: "Mulish" }}
                  className="text-2xl mt-4 pl-2 rounded-lg  capitalize font-bold text-[#241142] text-left"
                >
                  {exam.course.course_title}
                </h2>

                <WatchTimer
                  duration={exam.time_allowed}
                  elapsedTime={elapsedTime}
                  status={status}
                  session={session}
                />
              </div>

              <QuestionWindow
                setActiveQ={setActiveQ}
                status={status}
                auth={auth}
                session={session}
                setSession={setSession}
                setQWindowFetching={setQWindowFetching}
                fetching={qWindowFetching}
                showSubmitDialog={showSubmitDialog}
                {...exam}
              />

              <QuestionsMap
                activeQ={activeQ}
                status={status}
                auth={auth}
                session={session}
                {...exam}
              />
            </div>
          </div>
        )
      )}
    </main>
  );
});

export default ProtectedRoute({ RenderProp: SessionController });
