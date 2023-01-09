import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../../components/Header";
import QuestionsMap from "../../../components/QuestionsMap";
import SidePanel from "../../../components/SidePanel";
import QuestionWindow from "../../../components/QuestionWindow";
import Timer from "../../../components/Timer";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Loader from "../../../components/Loader2";
import { useRouter } from "next/router";
import { RpcRequest } from "../../../lib/rpc";
import Link from "next/link";
import InvalidViewportSize from "../../../components/InvalidViewportSize";
import BackToDashboard from "../../../components/BackToDashboard";

function Controller({ auth }) {
  const router = useRouter();
  const [exam, setExam] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

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

      <div className="bg-white min-h-screen hidden space-x-4 px-2 md:flex flex-row  justify-around items-center ">
        <SidePanel {...exam} />

        <div
          style={{ fontFamily: "Montserrat" }}
          className=" px-6 mt-20 self-stretch w-[83%]  order-1 border-t border-l rounded-lg py-6"
        >
          <BackToDashboard to="portal" />
          <hr className="mb-4" />

          <div className="flex flex-row justify-between">
            <h2
              style={{ fontFamily: "Mulish" }}
              className="text-3xl mt-4 capitalize font-bold text-[#241142] text-left"
            >
              {exam.course.course_title}
            </h2>

            <Timer targetTime={exam.time_allowed} />
          </div>
          <p className="text-sm text-[#241142]  mt-4 hover:cursor-pointer font-bold">
            Question 1
          </p>

          <QuestionWindow {...exam} />

          <QuestionsMap {...exam} />
        </div>
      </div>
    </main>
  );
}

export default ProtectedRoute({ RenderProp: Controller });
