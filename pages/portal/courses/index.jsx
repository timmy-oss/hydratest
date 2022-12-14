import Head from "next/head";
import Header from "../../../components/Header";
import SideMenu from "../../../components/SideMenu";
import BackToDashboard from "../../../components/BackToDashboard";
import CreateCourseForm from "../../../components/forms/CreateCourseForm";
import CourseCard, {
  CourseCardPlaceholder,
} from "../../../components/CourseCard";
import { useState, useContext, useEffect } from "react";
import { context } from "../../../store/Provisioner";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { RpcRequest } from "../../../lib/rpc";

function Exam(props) {
  const [showForm, setShowForm] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { store, dispatch } = useContext(context);

  async function fetchCourses() {
    // console.log(values);

    const body = {
      req: {
        auth: {
          token: store.auth.token,
        },
        body: null,
      },
    };

    setFetching(true);

    const res = await RpcRequest("courses.list", body);

    if (res.success) {
      setData(res.data.reverse());

      console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  useEffect(() => {
    fetchCourses();
  }, [showForm]);

  return (
    <main className="min-h-screen">
      <Head>
        <title> Courses | {process.env.NEXT_PUBLIC_APP_NAME} </title>
      </Head>
      <Header />
      <div className="bg-white  min-h-screen  mt-4 px-4  w-full">
        <SideMenu />

        {/* Create New Course Form  */}

        {showForm && (
          <>
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10"></div>

            <div className="fixed min-h-[600px] top-10 rounded-lg right-0 left-0  z-10 max-w-md mx-auto bg-white">
              <CreateCourseForm close={(e) => setShowForm(false)} />
            </div>
          </>
        )}

        <div
          style={{ fontFamily: "Montserrat" }}
          className=" p-6 mt-20 ml-[21%] w-[79%] overflow-auto self-start  order-2  border rounded-lg"
        >
          <BackToDashboard />

          <hr className="mb-4" />

          {/* Dashboard Content  */}

          <div className="flex flex-col justify-center text-left    items-start space-y-2">
            <div className="rounded-lg flex flex-row justify-between items-center p-6 py-12 bg-[#5522A9] w-full ">
              <h2 className="text-3xl text-white font-bold text-left ">
                {" "}
                Courses
              </h2>

              <div
                onClick={(e) => setShowForm(true)}
                className="text-white font-bold cursor-pointer rounded-lg bg-black/40 py-1 px-2 hover:bg-black/60 transition-colors"
              >
                <span className="inline-block align-bottom text-sm">
                  {" "}
                  <i className="bi-plus text-xl "></i> Add new course{" "}
                </span>
              </div>
            </div>
          </div>

          {/* List of courses  */}

          <div className="grid lg:grid-cols-3 grid-cols-2  gap-y-2  gap-x-4 mt-8">
            {data && data.length
              ? data.map((c, i) => {
                  return <CourseCard {...c} key={i} />;
                })
              : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((a, i) => {
                  return <CourseCardPlaceholder key={i} />;
                })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProtectedRoute({ RenderProp: Exam });
