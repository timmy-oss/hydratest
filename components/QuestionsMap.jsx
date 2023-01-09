import React from "react";
import cn from "classnames";

function QuestionsMap(props) {
  const boxes = [];

  for (let i = 0; i < props.number_of_questions + 100; ++i) {
    boxes.push(i);
  }

  return (
    <div className="mt-8 flex flex-row flex-wrap  ">
      {boxes.map((a, i) => (
        <div
          key={i}
          title={`Q${i + 1} is unattempted`}
          className={
            " w-[50px]  mr-2 mb-2 text-center text-sm p-1 py-2 rounded-lg cursor-pointer" +
            cn({
              "  bg-[#5522A9] hover:bg-[#5522A9]/90 text-white ": false,
              " bg-[#5522A9]/10 hover:bg-gray-200  text-[#5522A9] ": true,
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
