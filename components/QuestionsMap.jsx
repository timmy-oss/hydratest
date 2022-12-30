import React from "react";
import cn from "classnames";

function QuestionsMap(props) {

  const boxes = [];


  for (let i = 0; i < props.number_of_questions; ++i) {
    boxes.push(i)
  }

  return (
    <div className="mt-8 flex flex-row flex-wrap  ">



      {boxes.map((a, i) => (
        <div
          key={i}
          className={
            " w-[50px]  mr-2 mb-2 text-center  p-2 rounded-lg cursor-pointer" +
            cn({
              "  bg-[#5522A9] hover:bg-[#5522A9]/90 text-white ": i > 10,
              " bg-white hover:bg-gray-200 border border-[#5522A9] text-[#5522A9] ":
                i <= 10,
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
