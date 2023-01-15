import React from "react";
import cn from "classnames";

const disallowedStates = ["warning", "error", "idle"];

function QuestionsMap({ status, activeQ, ...props }) {
  const boxes = [];
  const noInput = disallowedStates.includes(status);

  function selectQ(i) {
    if (activeQ.i !== i) {
      activeQ.externalSetQ(i);
    }
  }

  for (let i = 0; i < props.number_of_questions; ++i) {
    boxes.push(i);
  }

  return (
    <div className="mt-8 flex flex-row flex-wrap  ">
      {boxes.map((a, i) => (
        <div
          onClick={(e) => selectQ(i)}
          key={i}
          title={
            noInput ? "Server unresponsive..." : `Q${i + 1} is unattempted`
          }
          className={
            " w-[50px]  mr-2 mb-2 text-center text-sm p-1 py-2 rounded-lg cursor-pointer" +
            cn({
              "  bg-[#5522A9] hover:bg-[#5522A9]/90 text-white ": false,
              " bg-[#5522A9]/10 hover:bg-[#5522A9]/20  text-[#5522A9] ":
                true && !noInput,
              " blur-sm cursor-not-allowed ": noInput,
              " border border-[#5522A9]/80 ": activeQ && activeQ.i === i,
            })
          }
        >
          {" "}
          {i + 1}{" "}
        </div>
      ))}
    </div>
  );
}

export default QuestionsMap;
