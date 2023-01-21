import cn from "classnames";
import { useState } from "react";

const disallowedStates = ["warning", "error", "idle"];

export default function QuestionAnswerSelector({
  status,
  setResponse,
  question,
  response,
  ...props
}) {
  const [selected, setSelected] = useState(response && response.answer);

  const noInput = disallowedStates.includes(status);

  function selectAnswer(key) {
    if (disallowedStates.includes(status)) {
      return;
    }
    setSelected(key);

    setResponse({
      answer: key,
      qid: question.id,
    });
  }

  return (
    <div className="space-y-2 mt-6 text-black/80  text-base  px-6">
      {["A", "B", "C", "D"].map((l, i) => (
        <div
          onClick={(e) => selectAnswer(l)}
          role="button"
          title={noInput ? "Server offline..." : "Click to select option " + l}
          key={i}
          className={
            "rounded-md w-[98%] flex flex-row justify-start space-x-8 items-center  text-left   transition-colors " +
            cn({
              " bg-[#5522A9]/90 text-white": l === selected,
              " hover:bg-[#5522A9]/50 bg-[#5522A9]/10 hover:text-white ":
                l !== selected && !noInput,
              " opacity-30 cursor-not-allowed ": noInput,
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
            {question["option_" + l]}
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
