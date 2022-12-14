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
      <div className="  flex flex-row justify-start  ">
        <div className="w-[20%] text-sm flex flex-row  space-x-4 px-4 py-4">
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
      </div>
    </div>
  );
}

export default QuestionWindow;
