import Head from "next/head";
import Header from "../../../components/Header";
import SideMenu from "../../../components/SideMenu";
import BackToDashboard from "../../../components/BackToDashboard";
import { useState, useEffect } from "react";
import InvalidViewportSize from "../../../components/InvalidViewportSize";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { NotifyCard } from "../../../components/forms/SignUpForm";
import Loader from "../../../components/Loader2";
import { RpcRequest } from "../../../lib/rpc";
import SessionCard from "../../../components/SessionCard";
import cn from "classnames";

function Sessions({ auth }) {
  const filters = ["all", "active", "inactive", "submitted"];

  const { user } = auth;

  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectionIndex, setSelectionIndex] = useState(0);

  async function fetchSessions() {
    // console.log(auth);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: null,
      },
    };

    setFetching(true);
    const s = filters[selectionIndex];

    const res = await RpcRequest("sessions." + s, body);

    if (res.success) {
      setData(res.data);

      // console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  function setSelection(index) {
    if (index === selectionIndex) return;
    if (index > 3) index = 0;
    if (index < 0) index = 3;

    setSelectionIndex(index);
  }

  useEffect(() => {
    fetchSessions();
  }, [error, selectionIndex]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title> Sessions | {process.env.NEXT_PUBLIC_APP_NAME} </title>
      </Head>

      <InvalidViewportSize />
      <div className="bg-white min-h-screen hidden md:block px-4  w-full">
        <SideMenu />
        <Header />

        <div
          style={{ fontFamily: "Montserrat" }}
          className=" p-6 mt-20 ml-[16%] w-[84%] overflow-auto self-start  order-2  border rounded-lg relative "
        >
          {error && (
            <NotifyCard
              closeOnError={() => setError(null)}
              id={data && data.length}
              error={error}
              eMsg="Unable to load sessions"
              errorText="Retry"
            />
          )}

          <BackToDashboard />

          <hr className="mb-4" />

          {/* Dashboard Content  */}

          <>
            <div className="flex flex-col justify-center text-left    items-start space-y-2">
              <div className="rounded-lg flex flex-row justify-between items-center p-6 py-12 bg-[#5522A9] w-full ">
                <h2 className="text-3xl text-white font-bold text-left ">
                  {" "}
                  Sessions
                </h2>

                <div className="min-w-[200px]  rounded-lg">
                  <div className="flex text-sm flex-row space-x-2 px-1 py-1 rounded-lg justify-evenly items-center  border border-white/40 w-full">
                    {/* Cols  */}
                    <div
                      onClick={(e) => setSelection(0)}
                      className={
                        "bg-[#5522A9]/50  text-white px-4 hover:cursor-pointer  hover:bg-black/40  py-2 " +
                        cn({
                          " border-b-2 border-white ": selectionIndex === 0,
                        })
                      }
                    >
                      {" "}
                      All{" "}
                    </div>
                    <div
                      onClick={(e) => setSelection(1)}
                      className={
                        "bg-[#5522A9]/50  text-white px-4 hover:cursor-pointer  hover:bg-black/40  py-2 " +
                        cn({
                          " border-b-2 border-white ": selectionIndex === 1,
                        })
                      }
                    >
                      {" "}
                      Active
                    </div>{" "}
                    <div
                      onClick={(e) => setSelection(2)}
                      className={
                        "bg-[#5522A9]/50  text-white px-4 hover:cursor-pointer  hover:bg-black/40  py-2 " +
                        cn({
                          " border-b-2 border-white ": selectionIndex === 2,
                        })
                      }
                    >
                      {" "}
                      Inactive
                    </div>{" "}
                    <div
                      onClick={(e) => setSelection(3)}
                      className={
                        "bg-[#5522A9]/50  text-white px-4 hover:cursor-pointer  hover:bg-black/40  py-2 " +
                        cn({
                          " border-b-2 border-white ": selectionIndex === 3,
                        })
                      }
                    >
                      Submitted
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  List of Sessions  */}

            {fetching ? (
              <Loader />
            ) : error ? (
              <p> An error occured </p>
            ) : (
              data && (
                <div className="grid grid-cols-1 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2  gap-y-4  gap-x-4 mt-8">
                  {data.map((d, i) => {
                    return (
                      <SessionCard
                        key={i}
                        refresh={() => setSelection(selectionIndex + 1)}
                        sessionId={d}
                        auth={auth}
                      />
                    );
                  })}
                </div>
              )
            )}
          </>
        </div>
      </div>
    </main>
  );
}

export default ProtectedRoute({ RenderProp: Sessions });
