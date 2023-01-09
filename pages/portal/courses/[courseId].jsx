import Head from "next/head";
import Header from "../../../components/Header";
import SideMenu from "../../../components/SideMenu";
import BackToDashboard from "../../../components/BackToDashboard";
import AddQuestionToCourseForm from "../../../components/forms/AddQuestionToCourseForm";

import { useState, useContext, useEffect } from "react";
import { context } from "../../../store/Provisioner";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { RpcRequest } from "../../../lib/rpc";
import { NotifyCard } from "../../../components/forms/SignUpForm";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import InvalidViewportSize from "../../../components/InvalidViewportSize";

function Course({ auth }) {
  const [showForm, setShowForm] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  async function getCourseQuestions() {
    setFetching(true);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          courseId: router.query.courseId,
        },
      },
    };

    const res = await RpcRequest("courses.get_questions", body);

    if (res.success) {
      setQuestions(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  async function getCourse() {
    setFetching(true);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          id: router.query.courseId,
        },
      },
    };

    const res = await RpcRequest("courses.get_one", body);

    if (res.success) {
      setCourse(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);

    if (router.query.action === "contribute") {
      setShowForm(true);
    }
  }

  useEffect(() => {
    if (!router.isReady) return;

    getCourse();
  }, [router.isReady]);

  if (fetching || (!course && !error)) return <Loader />;

  if (error) return <p> {error} </p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>
          {" "}
          {course
            ? course.course_title
            : router.isReady && router.query.courseId}{" "}
        </title>
      </Head>

      <InvalidViewportSize />

      <div className="bg-white  min-h-screen hidden md:block mt-4 px-4  w-full">
        <SideMenu />
        <Header />

        {/* Add New Question To Course Form  */}

        {showForm && (
          <>
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10"></div>

            <div className="fixed min-h-[600px] top-10 rounded-lg right-0 left-0  z-10 max-w-md mx-auto bg-white">
              <AddQuestionToCourseForm
                course={course}
                close={(e) => setShowForm(false)}
              />
            </div>
          </>
        )}

        <div
          style={{ fontFamily: "Montserrat" }}
          className=" p-6 mt-20 ml-[21%] w-[79%] overflow-auto self-start  order-2  border rounded-lg relative"
        >
          {error && (
            <NotifyCard
              closeOnError={() => setError(null)}
              id={data && data.length}
              error={error}
              eMsg="Unable to load courses"
              errorText="Retry"
            />
          )}

          <BackToDashboard to="courses" url="/portal/courses" />

          <hr className="mb-4" />

          {/* Dashboard Content  */}

          <div className="flex flex-col justify-center text-left    items-start space-y-2">
            <div className="rounded-lg flex flex-row justify-between items-center p-6 py-12 bg-[#5522A9] w-full ">
              <h2 className="text-3xl capitalize text-white font-bold text-left ">
                {" "}
                {course.course_title}
              </h2>

              <div
                onClick={(e) => setShowForm(true)}
                className="text-white font-bold cursor-pointer rounded-lg bg-black/40 py-1 px-2 hover:bg-black/60 transition-colors"
              >
                <span className="inline-block align-bottom text-sm">
                  {" "}
                  <i className="bi-plus text-xl "></i> Add new question
                </span>
              </div>
            </div>
          </div>

          {/* Course Details  */}

          <div className="flex flex-col justify-center items-center space-y-6 mt-8">
            {[1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2].map((q, i) => (
              <div
                key={i}
                className="min-h-[200px] p-4 bg-gray-200 rounded-lg w-full"
              >
                <p className="inline-block text-sm bg-gray-300 text-white py-1 px-2 rounded-lg">
                  {" "}
                  ID: {course.id}{" "}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProtectedRoute({ RenderProp: Course });
