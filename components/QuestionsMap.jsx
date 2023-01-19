import React from "react";
import cn from "classnames";

const disallowedStates = ["warning", "error", "idle"];

function QuestionsMap({ status, activeQ, session, ...props }) {
  const noInput = disallowedStates.includes(status);

  function selectQ(i) {
    if (noInput) return;
    if (activeQ.i !== i) {
      activeQ.externalSetQ(i);
    }
  }

  return (
    <div className="mt-8  relative flex flex-row flex-wrap justify-start items-center shadow-lg border  min-h-[150px] px-4 pb-6 pt-10 rounded-lg">
      <span className="inline-block text-xs text-black  bg-white shadow shadow-[#5522A9]  rounded-lg py-1 px-2 absolute top-0 left-0">
        {" "}
        Question Map{" "}
      </span>
      {session.question_ids.map((id, i) => {
        const attempted = session.attempted_question_ids.includes(id);
        const isActive = activeQ && activeQ.i === i;
        return (
          <div
            onClick={(e) => selectQ(i)}
            key={i}
            title={
              noInput ? "Server unresponsive..." : `Q${i + 1} is unattempted`
            }
            className={
              " w-[50px] border border-black/10 font-bold mr-2 mb-2 text-center self-stretch max-h-[40px]   text-sm p-1 py-2 rounded-lg cursor-pointer" +
              cn({
                "  bg-[#5522A9] hover:bg-[#5522A9]/90 text-white ":
                  attempted && !isActive,
                " bg-[#5522A9]/10 hover:bg-[#5522A9]/20  text-[#5522A9] ":
                  (!attempted && !noInput) || (attempted && isActive),
                " opacity-40 bg-black/30 cursor-not-allowed ": noInput,
                " border-2 border-[#5522A9]/80 ": isActive,
              })
            }
          >
            {" "}
            {i + 1}{" "}
          </div>
        );
      })}
    </div>
  );
}

export default QuestionsMap;
