import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import { LineChart, Line } from "recharts";
import BackToDashboard from "../../components/BackToDashboard";
import InvalidViewportSize from "../../components/InvalidViewportSize";
import ProtectedRoute from "../../components/ProtectedRoute";
import PostSubmissionCard from "../../components/PostSubmissionCard";
import { useEffect, useState } from "react";
import { RpcRequest } from "../../lib/rpc";
import { NotifyCard } from "../../components/forms/SignUpForm";
import Loader from "../../components/Loader2";

function Portal(props) {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const graphData = [
    { name: "D1", uv: 4 },
    { name: "D2", uv: 8 },
    { name: "D3", uv: 4 },
    { name: "D3", uv: 12 },
    { name: "D3", uv: 9 },
    { name: "D3", uv: 16 },
  ];

  const { post_submit = "" } = useRouter().query;

  async function fetchStats() {
    // console.log(auth);

    const body = {
      req: {
        auth: null,
        body: null,
      },
    };

    setFetching(true);

    const res = await RpcRequest("home", body);

    if (res.success) {
      setData(res.data);

      // console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  useEffect(() => {
    fetchStats();
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title> Portal | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Header />

      <InvalidViewportSize />

      {post_submit === "true" && <PostSubmissionCard />}

      <div className="bg-white md:block hidden min-h-screen   px-4  w-full">
        <SideMenu />

        <div
          style={{ fontFamily: "Montserrat" }}
          className=" p-6 mt-20 ml-[16%] w-[84%] overflow-auto self-start  order-2  border rounded-lg"
        >
          <BackToDashboard to="Home" url="/" />

          {error && (
            <NotifyCard
              closeOnError={() => setError(null)}
              id={data}
              error={error}
              eMsg="Unable to load statistics"
              errorText="Retry"
            />
          )}

          <hr className="mb-4" />

          {/* Dashboard Content  */}

          <div className="flex flex-col justify-center text-left    items-start space-y-2">
            <div className="rounded-lg p-6 py-12 bg-[#5522A9] w-full ">
              <h2 className="text-3xl text-white font-bold text-left ">
                {" "}
                Portal Overview{" "}
              </h2>
            </div>

            {data ? (
              <div
                style={{ fontFamily: "" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-4  w-full gap-x-4 "
              >
                <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                  <p className="text-lg  text-left text-white/80">
                    Total users
                  </p>
                  <p className="py-2 text-3xl text-white text-left">
                    {" "}
                    {data.user}{" "}
                  </p>

                  <div className="text-4xl font-bold text-center text-white">
                    <h1> {data.user} </h1>
                  </div>
                </div>

                <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                  <p className="text-lg  text-left text-white/80">
                    Total courses
                  </p>
                  <p className="py-2 text-3xl text-white text-left">
                    {" "}
                    {data.course}{" "}
                  </p>

                  <div className="text-4xl font-bold text-center text-white">
                    <h1> {data.course} </h1>
                  </div>
                </div>

                <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                  <p className="text-lg  text-left text-white/80">
                    Total exams
                  </p>
                  <p className="py-2 text-3xl text-white text-left">
                    {" "}
                    {data.exam}{" "}
                  </p>

                  <div className="text-4xl font-bold text-center text-white">
                    <h1> {data.exam} </h1>
                  </div>
                </div>

                <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                  <p className="text-lg  text-left text-white/80">
                    Total questions
                  </p>
                  <p className="py-2 text-3xl text-white text-left">
                    {" "}
                    {data.question}{" "}
                  </p>

                  <div className="text-4xl font-bold text-center text-white">
                    <h1> {data.question} </h1>
                  </div>
                </div>

                <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                  <p className="text-lg  text-left text-white/80">
                    Total results
                  </p>
                  <p className="py-2 text-3xl text-white text-left">
                    {" "}
                    {data.result}{" "}
                  </p>

                  <div className="text-4xl font-bold text-center text-white">
                    <h1> {data.result} </h1>
                  </div>
                </div>
              </div>
            ) : error ? (
              <p> An error occured. </p>
            ) : (
              fetching && <Loader />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProtectedRoute({ RenderProp: Portal });
