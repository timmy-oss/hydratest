import cn from "classnames";
import { useState } from "react";

export default function QuestionAnswerSelector(props) {
  const [selected, setSelected] = useState(null);

  function selectAnswer(key) {
    setSelected(key);
  }

  return (
    <div className="space-y-2 mt-6 text-black/80  text-base  px-6">
      {["A", "B", "C", "D"].map((l, i) => (
        <div
          onClick={(e) => selectAnswer(l)}
          role="button"
          title={"Click to select option " + l}
          key={i}
          className={
            "rounded-md w-[98%] flex flex-row justify-start space-x-8 items-center  text-left   hover:text-white transition-colors " +
            cn({
              " bg-[#5522A9]/90 text-white": l === selected,
              " hover:bg-[#5522A9]/50 bg-[#5522A9]/10 ": l !== selected,
            })
          }
        >
          <span className="inline-block self-start  w-[10%] py-2 rounded-tl-md rounded-br-md px-4 text-center  font-bold bg-[#5522A9]/20 ">
            {l === selected ? (
              <i className="bi-check-circle text-white text-2xl"></i>
            ) : (
              l
            )}
          </span>

          <span className="self-stretch py-2 px-4 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            sequi itaque veritatis minus corporis nulla tempora ea dolores
            commodi quos quasi hic.
          </span>
        </div>
      ))}

      {/* <div className="">
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
        </div> */}
    </div>
  );
}
