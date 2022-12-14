import React from "react";
import Head from "next/head";
import Header from "../../../components/Header";
import QuestionsMap from "../../../components/QuestionsMap";
import SidePanel from "../../../components/SidePanel";
import QuestionWindow from "../../../components/QuestionWindow";

function Exam(props) {
  return (
    <main className="min-h-screen">
      <Head>
        <title> EEE303 </title>
      </Head>
      <Header />
      <div className="bg-white min-h-screen flex flex-row  justify-around items-center mt-4">
        <SidePanel />

        <div
          style={{ fontFamily: "Montserrat" }}
          className=" px-6 mt-20 self-start  order-1"
        >
          <p
            style={{ fontFamily: "Roboto" }}
            className="text-xs text-[#5522A9] hover:cursor-pointer font-bold"
          >
            {" "}
            <i className="bi-arrow-left text-xs text-[#5522A9]"> </i> &nbsp;
            Back to courses{" "}
          </p>
          <div className="flex flex-row justify-between">
            <h2
              style={{ fontFamily: "Mulish" }}
              className="text-3xl mt-4 font-bold text-[#241142] text-left"
            >
              {" "}
              Electronics Engineering I
            </h2>

            <div className="self-center select-none">
              <div className="flex flex-row  text-2xl bg-[#5522A9] text-white py-2 transform rotate-3 shadow-[#5522A9]   shadow-2xl px-4 rounded-xl">
                <span> 02 </span> &nbsp;:&nbsp; <span> 42 </span> &nbsp;:&nbsp;{" "}
                <span> 12 </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-[#241142]  mt-4 hover:cursor-pointer font-bold">
            Question 25
          </p>

          <QuestionWindow />

          <QuestionsMap />
        </div>
      </div>
    </main>
  );
}

export default Exam;
