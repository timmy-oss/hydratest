import React from "react";

function QuestionWindow() {
  return (
    <div className="min-h-[150px]  mt-2 rounded-lg pt-6 shadow-2xl border border-gray-100/80">
      <p className="text-black/60 font-bold px-6 text-xl">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        deleniti quis inventore sed ipsa. Maiores molestiae nostrum nisi beatae
        saepe animi unde exercitationem. Assumenda deserunt voluptates iusto.
        Voluptatem, possimus! Nobis.
      </p>
      <div className="space-y-2 mt-6 text-black/60  text-base font-bold px-6">
        <div className="">
          <input name="choice" id="optionA" type="radio" className="" /> &nbsp;
          <label htmlFor="optionA">
            {" "}
            <span className="font-bold"> A. </span> &nbsp; The love of man{" "}
          </label>
        </div>

        <div>
          <input name="choice" id="optionB" type="radio" className="" /> &nbsp;
          <label htmlFor="optionB">
            {" "}
            <span className="font-bold"> B. </span> &nbsp; Church fellwoship{" "}
          </label>
        </div>

        <div>
          <input name="choice" id="optionC" type="radio" className="" /> &nbsp;
          <label htmlFor="optionC">
            {" "}
            <span className="font-bold"> C. </span> &nbsp; H20 and hydrogen{" "}
          </label>
        </div>

        <div>
          <input name="choice" id="optionD" type="radio" className="" /> &nbsp;
          <label htmlFor="optionD">
            {" "}
            <span className="font-bold"> D. </span> &nbsp; The house of God{" "}
          </label>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="  flex flex-row justify-between  ">
        <div className="min-w-[20%] text-sm flex flex-row  space-x-4 px-4 py-4">
          <button
            className={
              " capitalize bg-[#5A5AB5] px-6 rounded-lg hover:bg-[#5A5AB5]/90 rounded-l-md transition-colors duration-300 text-white py-2  block   "
            }
            role="button"
          >
            <i className="bi-arrow-left"></i>&nbsp; Back
          </button>

          <button
            className={
              " capitalize bg-[#3a3a9a] px-6 rounded-lg hover:bg-[#3a3a9a]/90 rounded-r-md transition-colors duration-300 text-white py-2 block "
            }
            role="button"
          >
            Save &nbsp;
            <i className="bi-fast-forward"></i>
          </button>
        </div>


        <div className="min-w-[20%] text-sm flex flex-row  space-x-4 px-4 py-4">
          <span
            className={
              " capitalize xl:hidden bg-green-500 px-2 rounded-lg  rounded-l-md transition-colors duration-300 text-white py-2  block   "
            }

          >
            <i className="bi-arrow-sync"></i>&nbsp; Attempted &nbsp; <span className="bg-white  text-sm text-green-500 px-2 py-1 rounded-full"> 0 </span>
          </span>
          <button
            className={
              " capitalize xl:hidden bg-blue-500 px-6 rounded-lg hover:bg-blue-500/90 rounded-l-md transition-colors duration-300 text-white py-2  block   "
            }
            role="button"
          >
            <i className="bi-arrow-clockwise"></i>&nbsp; Restart
          </button>
          <button
            className={
              " capitalize xl:hidden bg-red-500 px-6 rounded-lg hover:bg-red-500/90 rounded-l-md transition-colors duration-300 text-white py-2  block   "
            }
            role="button"
          >
            <i className="bi-check2-circle"></i>&nbsp; Submit
          </button>
        </div>

      </div>
    </div>
  );
}

export default QuestionWindow;
