import React, { useState } from "react";

const disallowedStates = ["warning", "error", "idle"];

function SidePanel({ status, activeQ, fetching, session, ...props }) {
  const noInput = disallowedStates.includes(status) || fetching;
  const [goto, setGoto] = useState("");

  function selectQ(i) {
    if (activeQ.i !== i) {
      activeQ.externalSetQ(i);
    }
  }

  function handleGoto(e) {
    e.preventDefault();

    if (!goto) return;

    selectQ(+goto - 1);
  }

  function handleGotoFieldChange(e) {
    const v = e.target.value;

    if (v === "") {
      setGoto("");
      return;
    }
    const isDigit = !isNaN(parseInt(v.charAt(v.length - 1)));

    if (!isDigit) return;

    if (+v > session.question_ids.length || v < 1) return;

    setGoto(v);
  }

  return (
    <div className="order-2 w-[15%] select-none overflow-y-auto hidden xl:block  self-stretch mt-20  px-4 rounded-lg mr-3 border shadow-lg pt-4">
      <div>
        <p className="text-lg text-[#241142]   font-bold">Exam</p>

        <h3 className="text-base capitalize px-6  py-3 mt-4  text-black/50 bg-gray-100 rounded-md text-left">
          {props.exam_title}
        </h3>
      </div>

      <div className="mt-6">
        <p className="text-lg text-[#241142]   font-bold">Stats</p>

        <div className="flex flex-row select-none space-x-4 w-full mt-4">
          <div className="flex flex-row -space-x-4 w-full">
            <p
              className={
                " w-[80%] inline-block  bg-gray-100  py-3 px-6 text-base   text-black/50 border rounded-l-xl   border-transparent "
              }
            >
              Time Allowed
            </p>
            <button className="rounded-xl flex-1 cursor-default bg-gray-300 text-sm text-black/80 font-normal">
              {props.time_allowed}m
            </button>
          </div>
        </div>

        <div className="flex flex-row select-none space-x-4 w-full mt-4">
          <div className="flex flex-row -space-x-4 w-full">
            <p
              className={
                " w-[80%] inline-block  bg-gray-100  py-3 px-6 text-base   text-black/50 border rounded-l-xl   border-transparent "
              }
            >
              Questions
            </p>
            <button className="rounded-xl flex-1 cursor-default bg-gray-300 text-sm text-black/80 font-normal">
              {props.number_of_questions}
            </button>
          </div>
        </div>

        <div className="flex select-none flex-row space-x-4 w-full mt-4">
          <div className="flex flex-row -space-x-4 w-full">
            <p
              className={
                " w-[80%] inline-block  bg-gray-100  py-3 px-6 text-base   text-black/50 border rounded-l-xl   border-transparent "
              }
            >
              {" "}
              Attempted
            </p>
            <button className="rounded-xl flex-1 cursor-default  bg-gray-300 text-black/80 text-sm font-normal">
              {session.attempted_question_ids.length}
            </button>
          </div>
        </div>
      </div>

      <p className="text-lg text-[#241142] mt-6 hover:cursor-pointer font-bold">
        Actions
      </p>

      <div className="flex flex-row space-x-4 w-full mt-4">
        <div className="flex flex-row -space-x-4 w-full">
          <input
            disabled={noInput}
            onChange={handleGotoFieldChange}
            value={goto}
            placeholder="Go to question"
            inputMode="numeric"
            className={
              "outline-none w-[80%] disabled:opacity-40 disabled:cursor-not-allowed text-center inline-block  bg-gray-100  py-3 px-6 text-lg  placeholder:text-[#5522A9]/50 placeholder:text-sm  text-[#5522A9]/80 border rounded-l-xl   border-transparent "
            }
          />
          <button
            disabled={noInput}
            onClick={handleGoto}
            className="rounded-xl flex-1 disabled:opacity-40 disabled:cursor-not-allowed bg-[#5522A9] hover:bg-[#5522A9]/70 transition-colors duration-300 text-white text-base font-bold"
          >
            <i className="bi-arrow-right text-xl"></i>
          </button>
        </div>
      </div>

      <div className="w-full mt-4 space-y-4">
        <button
          onClick={props.showSubmitDialog}
          disabled={noInput}
          className="rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-red-500/80 block w-full p-3  border bg-red-500 text-white text-base font-bold"
        >
          Submit
        </button>
        <button
          disabled={noInput}
          className="rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-blue-100 block w-full p-3 text-blue-500 border border-blue-500 bg-white text-base font-bold"
        >
          Restart
        </button>
      </div>

      <p className="mt-8 text-center text-xs hover:underline cursor-pointer text-black/50">
        Leave feedback
      </p>
    </div>
  );
}

export default SidePanel;
