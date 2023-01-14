import Head from "next/head";
import Header from "../../../components/Header";
import Image from "next/image";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RpcRequest } from "../../../lib/rpc";
import Loader from "../../../components/Loader2";
import InvalidViewportSize from "../../../components/InvalidViewportSize";

function Intro({ auth }) {
  const router = useRouter();
  const [exam, setExam] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  function begin() {
    router.replace(`/exams/${exam.id}/session?key=${"session_key"}`);
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

    getExam();
  }, [router.isReady]);

  if (fetching || (!exam && !error)) return <Loader />;

  if (error) return <p> {error} </p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <Head>
        <title>
          {" "}
          {exam ? exam.exam_title : router.isReady && router.query.examId}{" "}
        </title>
      </Head>

      <Header />

      <InvalidViewportSize />

      <div className=" hidden md:flex min-h-screen bg-no-repeat bg-fixed bg-center bg-clip-content bg-cover bg-[url('/assets/exam2.jpg')] flex-col bg-white justify-center items-center w-full">
        <div className=" mt-8  text-[#5823B7] flex flex-row  justify-start">
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

            <h3 className="text-base px-6 py-3 mt-4 capitalize text-black/40 bg-gray-100 rounded-md text-left">
              {exam.exam_title}
            </h3>
          </div>
          <div className="mt-4">
            <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
              Course
            </p>

            <h3 className="text-base px-6 py-3 mt-4 capitalize text-black/40 bg-gray-100 rounded-md text-left">
              {exam.course.course_title}
            </h3>
          </div>

          <div className="mt-4">
            <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
              Questions
            </p>

            <h3 className="text-base px-6 py-3 mt-4  text-black/40 bg-gray-100 rounded-md text-left">
              {exam.number_of_questions}
            </h3>
          </div>

          <div className="mt-4">
            <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
              Time Allowed
            </p>

            <h3 className="text-base px-6 py-3 mt-4  text-black/40 bg-gray-100 rounded-md text-left">
              {exam.time_allowed} Minutes
            </h3>
          </div>

          <div className=" mt-4 mb-2 w-full">
            <button
              onClick={begin}
              className="rounded-lg w-full block hover:bg-[#5522A9]/90 transition-colors duration-300 px-4 py-2  bg-[#5522A9] text-white text-base font-bold"
            >
              Begin
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProtectedRoute({ RenderProp: Intro });
