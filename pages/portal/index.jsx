import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import { LineChart, Line } from "recharts";
import BackToDashboard from "../../components/BackToDashboard";
import InvalidViewportSize from "../../components/InvalidViewportSize";
import ProtectedRoute from "../../components/ProtectedRoute";
import PostSubmissionCard from "../../components/PostSubmissionCard";

function Portal(props) {
  const graphData = [
    { name: "D1", uv: 4 },
    { name: "D2", uv: 8 },
    { name: "D3", uv: 4 },
    { name: "D3", uv: 12 },
    { name: "D3", uv: 9 },
    { name: "D3", uv: 16 },
  ];

  const { post_submit = "" } = useRouter().query;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title> Portal | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Header />

      <InvalidViewportSize />

      <PostSubmissionCard show={post_submit === "true"} />

      <div className="bg-white md:block hidden min-h-screen   px-4  w-full">
        <SideMenu />

        <div
          style={{ fontFamily: "Montserrat" }}
          className=" p-6 mt-20 ml-[16%] w-[84%] overflow-auto self-start  order-2  border rounded-lg"
        >
          <BackToDashboard to="Home" url="/" />

          <hr className="mb-4" />

          {/* Dashboard Content  */}

          <div className="flex flex-col justify-center text-left    items-start space-y-2">
            <div className="rounded-lg p-6 py-12 bg-[#5522A9] w-full ">
              <h2 className="text-3xl text-white font-bold text-left ">
                {" "}
                Portal Overview{" "}
              </h2>
            </div>

            <div
              style={{ fontFamily: "" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4  w-full gap-x-4 "
            >
              <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                <p className="text-lg  text-left text-white/80">Total users</p>
                <p className="py-2 text-3xl text-white text-left"> 2,402 </p>

                <div className="">
                  <LineChart width={250} height={100} data={graphData}>
                    <Line
                      dot={false}
                      strokeWidth={2}
                      type="linear"
                      dataKey="uv"
                      stroke="#ffffff"
                    />
                  </LineChart>
                </div>

                <p className=" text-xs  text-white text-left">
                  {" "}
                  ~ 23 new users
                </p>
              </div>

              <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                <p className="text-lg  text-left text-white/80">
                  Total courses
                </p>
                <p className="py-2 text-3xl text-white text-left"> 56 </p>

                <div className="">
                  <LineChart width={250} height={100} data={graphData}>
                    <Line
                      dot={false}
                      strokeWidth={2}
                      type="linear"
                      dataKey="uv"
                      stroke="#ffffff"
                    />
                  </LineChart>
                </div>

                <p className=" text-xs  text-white text-left">
                  ~ 5 new courses
                </p>
              </div>

              <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                <p className="text-lg  text-left text-white/80">Total exams</p>
                <p className="py-2 text-3xl text-white text-left"> 102 </p>

                <div className="">
                  <LineChart width={250} height={100} data={graphData}>
                    <Line
                      dot={false}
                      strokeWidth={2}
                      type="linear"
                      dataKey="uv"
                      stroke="#ffffff"
                    />
                  </LineChart>
                </div>

                <p className=" text-xs  text-white text-left">~ 2 new exams</p>
              </div>

              <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                <p className="text-lg  text-left text-white/80">
                  {" "}
                  Active sessions
                </p>
                <p className="py-2 text-3xl text-white text-left"> 12,103 </p>

                <div className="">
                  <LineChart width={250} height={100} data={graphData}>
                    <Line
                      dot={false}
                      strokeWidth={2}
                      type="linear"
                      dataKey="uv"
                      stroke="#ffffff"
                    />
                  </LineChart>
                </div>

                <p className=" text-xs  text-white text-left">
                  ~ 655 new sessions
                </p>
              </div>

              <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                <p className="text-lg  text-left text-white/80">
                  {" "}
                  Results generated{" "}
                </p>
                <p className="py-2 text-3xl text-white text-left"> 29,206 </p>

                <div className="">
                  <LineChart width={250} height={100} data={graphData}>
                    <Line
                      dot={false}
                      strokeWidth={2}
                      type="linear"
                      dataKey="uv"
                      stroke="#ffffff"
                    />
                  </LineChart>
                </div>

                <p className=" text-xs  text-white text-left">
                  ~ 132 new results
                </p>
              </div>

              <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                <p className="text-lg  text-left text-white/80">Total users</p>
                <p className="py-2 text-3xl text-white text-left"> 2,402 </p>

                <div className="">
                  <LineChart width={250} height={100} data={graphData}>
                    <Line
                      dot={false}
                      strokeWidth={2}
                      type="linear"
                      dataKey="uv"
                      stroke="#ffffff"
                    />
                  </LineChart>
                </div>

                <p className=" text-xs  text-white text-left">~ 23 new users</p>
              </div>

              <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                <p className="text-lg  text-left text-white/80">
                  Total courses
                </p>
                <p className="py-2 text-3xl text-white text-left"> 56 </p>

                <div className="">
                  <LineChart width={250} height={100} data={graphData}>
                    <Line
                      dot={false}
                      strokeWidth={2}
                      type="linear"
                      dataKey="uv"
                      stroke="#ffffff"
                    />
                  </LineChart>
                </div>

                <p className=" text-xs  text-white text-left">
                  ~ 5 new courses
                </p>
              </div>

              <div className="rounded-lg bg-[#5522A9] px-4 max-w-[300px] min-h-[100px] py-4 flex-1 border  border-[#5522A9]/20 shadow-2xl">
                <p className="text-lg  text-left text-white/80">Total users</p>
                <p className="py-2 text-3xl text-white text-left"> 2,402 </p>

                <div className="">
                  <LineChart width={250} height={100} data={graphData}>
                    <Line
                      dot={false}
                      strokeWidth={2}
                      type="linear"
                      dataKey="uv"
                      stroke="#ffffff"
                    />
                  </LineChart>
                </div>

                <p className=" text-xs  text-white text-left">~ 23 new users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProtectedRoute({ RenderProp: Portal });
