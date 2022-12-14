import React from "react";

function SidePanel() {
  return (
    <div className="order-2 w-[40%] select-none hidden xl:block min-h-[600px] self-start mt-20 shadow-xl px-4 rounded-lg mr-3 border pt-4">
      <div>
        <p className="text-lg text-[#241142]   font-bold">Test</p>

        <h3 className="text-base px-6  py-3 mt-4  text-black/40 bg-gray-100 rounded-md text-left">
          1st Semester Exam
        </h3>
      </div>

      <div className="mt-4">
        <p className="text-lg text-[#241142]   font-bold">Stats</p>
        <div className="flex flex-row select-none space-x-4 w-full mt-4">
          <div className="flex flex-row -space-x-4 w-full">
            <p
              className={
                "outline-none w-[80%] inline-block  bg-gray-100  py-3 px-6 text-lg  placeholder:text-[#5522A9]/50 placeholder:text-sm  text-[#5522A9] border rounded-l-xl   border-transparent "
              }
            >
              Questions
            </p>
            <button className="rounded-xl flex-1 cursor-default bg-[#5522A9] text-white text-base font-bold">
              70
            </button>
          </div>
        </div>

        <div className="flex select-none flex-row space-x-4 w-full mt-4">
          <div className="flex flex-row -space-x-4 w-full">
            <p
              className={
                "outline-none w-[80%] inline-block  bg-gray-100  py-3 px-6 text-lg  placeholder:text-[#5522A9]/50 placeholder:text-sm  text-[#5522A9] border rounded-l-xl   border-transparent "
              }
            >
              Attempted
            </p>
            <button className="rounded-xl flex-1 cursor-default  bg-[#5522A9] text-white text-base font-bold">
              59
            </button>
          </div>
        </div>
      </div>

      <p className="text-lg text-[#241142]  py-4 hover:cursor-pointer font-bold">
        Actions
      </p>

      <div className="flex flex-row space-x-4 w-full">
        <div className="flex flex-row -space-x-4 w-full">
          <input
            placeholder="Go to question"
            className={
              "outline-none w-[80%] text-center inline-block  bg-gray-100  py-3 px-6 text-lg  placeholder:text-[#5522A9]/50 placeholder:text-sm  text-[#5522A9] border rounded-l-xl   border-transparent "
            }
          />
          <button className="rounded-xl flex-1  bg-[#5522A9] hover:bg-[#5522A9]/70 transition-colors duration-300 text-white text-base font-bold">
            <i className="bi-arrow-right text-xl"></i>
          </button>
        </div>
      </div>

      <div className="w-full mt-4 space-y-4">
        <button className="rounded-xl transition-colors duration-300 hover:bg-[#5522A9]/70 block w-full p-3  border bg-[#5522A9] text-white text-base font-bold">
          Submit
        </button>
        <button className="rounded-xl transition-colors duration-300 hover:bg-gray-200 block w-full p-3 text-[#5522A9] border border-[#5522A9] bg-white text-base font-bold">
          Restart
        </button>
      </div>

      <p className="mt-8 text-center text-xs hover:underline cursor-pointer text-black/50">
        {" "}
        Leave feedback{" "}
      </p>
    </div>
  );
}

export default SidePanel;
