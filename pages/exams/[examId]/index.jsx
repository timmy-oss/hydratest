import React from "react";
import Head from "next/head";
import Header from "../../../components/Header";
import Image from "next/image";

function intro() {
  return (
    <main className="min-h-screen w-full ">
      <Head>
        <title> EEE303 </title>
      </Head>

      <Header />

      <div className="flex min-h-screen bg-no-repeat bg-fixed bg-center bg-clip-content bg-cover bg-[url('/assets/exam2.jpg')] flex-col bg-white justify-center items-center w-full">
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
              Test
            </p>

            <h3 className="text-base px-6 py-3 mt-4  text-black/40 bg-gray-100 rounded-md text-left">
              1st Semester Exam
            </h3>
          </div>
          <div className="mt-4">
            <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
              Course
            </p>

            <h3 className="text-base px-6 py-3 mt-4  text-black/40 bg-gray-100 rounded-md text-left">
              Electronics Engineering I
            </h3>
          </div>

          <div className="mt-4">
            <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
              Questions
            </p>

            <h3 className="text-base px-6 py-3 mt-4  text-black/40 bg-gray-100 rounded-md text-left">
              70
            </h3>
          </div>

          <div className="mt-4">
            <p className="text-lg text-[#241142]  hover:cursor-pointer font-bold">
              Time Allowed
            </p>

            <h3 className="text-base px-6 py-3 mt-4  text-black/40 bg-gray-100 rounded-md text-left">
              45 Minutes
            </h3>
          </div>

          <div className=" mt-4 mb-2 w-full">
            <button className="rounded-lg w-full block hover:bg-[#5522A9]/90 transition-colors duration-300 px-4 py-2  bg-[#5522A9] text-white text-base font-bold">
              Begin
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default intro;
