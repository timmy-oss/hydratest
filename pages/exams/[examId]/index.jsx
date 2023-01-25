import Head from "next/head";
import Header from "../../../components/Header";
import Image from "next/image";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RpcRequest } from "../../../lib/rpc";
import Loader from "../../../components/Loader2";
import InvalidViewportSize from "../../../components/InvalidViewportSize";
import { NotifyCard } from "../../../components/forms/SignUpForm";
import { createSession } from "../../../lib/securesession";
import cn from "classnames";

function Intro({ auth }) {
  const router = useRouter();
  const [exam, setExam] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [proceed, setProceed] = useState(0);
  const [fetching2, setFetching2] = useState(false);

  // Secure Session Pipeline
  async function initSession() {
    setFetching2(true);
    const { res, key } = await createSession(
      router.query.examId,
      auth.token,
      "new"
    );

    if (res.success) {
      setProceed(proceed + 1);
    } else {
      setError(res.error && res.error.message);
      console.log(res.error);
      setFetching2(false);
    }
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

  useEffect(() => {
    if (!router.isReady) return;
    if (exam) return;

    getExam();
  }, [router.isReady, exam]);

  useEffect(() => {
    if (proceed !== 1) return;

    router.replace(`/exams/${exam.id}/session#questionwindow`);
  }, [proceed]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <Head>
        <title>
          {" "}
          {exam ? exam.exam_title : router.isReady && router.query.examId}{" "}
        </title>
      </Head>

      <InvalidViewportSize />

      {fetching || (!exam && !error) ? (
        <>
          <Header />
          <div className=" hidden md:flex min-h-screen bg-no-repeat bg-fixed bg-center bg-clip-content bg-cover bg-[url('/assets/exam2.jpg')] flex-col bg-white justify-center items-center w-full">
            <div className="   text-[#5823B7] flex flex-row  justify-start">
              <Image
                priority
                src="/assets/hydratest.png"
                alt="logo"
                className="object-contain"
                width="100"
                height="100"
              />
              <h1 className="font-black text-center self-center text-3xl inline-block">
                HydraTest{" "}
              </h1>
            </div>

            <div className=" max-w-xl bg-white/30 min-w-[300px] min-h-[400px]   shadow-xl px-4 rounded-lg  border pt-4 flex flex-col justify-center items-center">
              <p className="w-[50px] h-[50px] inline-block  border-r-4 border-white rounded-full animate-spin text-center border-y-white border-l-white"></p>
            </div>
          </div>
        </>
      ) : error ? (
        <NotifyCard
          closeOnError={() => {
            setExam(null);
          }}
          error={error}
          eMsg="Unable to load exam."
          errorText="Retry"
        />
      ) : (
        exam && (
          <div className=" hidden md:flex min-h-screen bg-no-repeat bg-fixed bg-center bg-clip-content bg-cover bg-[url('/assets/exam2.jpg')] flex-col bg-white justify-center items-center w-full">
            <div className="   text-[#5823B7] flex flex-row  justify-start">
              <Image
                priority
                src="/assets/hydratest.png"
                alt="logo"
                className="object-contain"
                width="100"
                height="100"
              />
              <h1 className="font-black text-center self-center text-3xl inline-block">
                HydraTest{" "}
              </h1>
            </div>

            <div className=" max-w-xl bg-white/30 min-w-[300px] min-h-[400px]   shadow-xl px-4 rounded-lg  border pt-4">
              <div>
                <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
                  Exam
                </p>

                <h3 className="text-base px-6 py-2 mt-4 capitalize text-black/60 bg-gray-100 rounded-md text-left">
                  {exam.exam_title}
                </h3>
              </div>
              <div className="mt-4">
                <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
                  Course
                </p>

                <h3 className="text-base px-6 py-2 mt-4 capitalize text-black/60 bg-gray-100 rounded-md text-left">
                  {exam.course.course_title}
                </h3>
              </div>

              <div className="mt-4">
                <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
                  Questions
                </p>

                <h3 className="text-base px-6 py-2 mt-4  text-black/60 bg-gray-100 rounded-md text-left">
                  {exam.number_of_questions}
                </h3>
              </div>

              <div className="mt-4">
                <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
                  Time Allowed
                </p>

                <h3 className="text-base px-6 py-2 mt-4  text-black/60 bg-gray-100 rounded-md text-left">
                  {exam.time_allowed} Minutes
                </h3>
              </div>

              <div className=" mt-4 mb-2 w-full">
                <button
                  disabled={fetching2}
                  onClick={initSession}
                  className={
                    "rounded-lg disabled:bg-opacity-60 w-full block transition-colors duration-300 px-4 py-2  bg-[#5522A9] text-white text-base font-bold " +
                    cn({
                      " bg-[#5522A9]/80 ": fetching2,
                      " bg-[#5522A9] hover:bg-[#5522A9]/90 ": !fetching2,
                    })
                  }
                >
                  {fetching2 ? (
                    <p className="w-[15px] h-[15px] inline-block  border-r-2 border-white rounded-full animate-spin text-center border-y-white border-l-white"></p>
                  ) : (
                    "Begin"
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </main>
  );
}

export default ProtectedRoute({ RenderProp: Intro });
