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
import Link from "next/link"
import InvalidViewportSize from "../../../components/InvalidViewportSize";

function Controller({ auth }) {

  const router = useRouter()
  const [exam, setExam] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false)


  async function getExam() {
    setFetching(true);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          id: router.query.examId
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

  }, [router.isReady])



  if (fetching || !exam && !error) return <Loader />

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title> {exam ? exam.exam_title : router.isReady && router.query.examId} </title>
      </Head>
      <Header />


      <InvalidViewportSize />

      <div className="bg-white min-h-screen hidden  md:flex flex-row  justify-around items-center mt-4">
        <SidePanel {...exam} />

        <div
          style={{ fontFamily: "Montserrat" }}
          className=" px-6 mt-20 self-start  order-1"
        >

          <Link href="/portal">
          <p
            style={{ fontFamily: "Roboto" }}
            className="text-xs text-[#5522A9] hover:cursor-pointer font-bold"
          >

            <i className="bi-arrow-left text-xs text-[#5522A9]"> </i> &nbsp;
              Back to portal
            </p>
          </Link>
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
