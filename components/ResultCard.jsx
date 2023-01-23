import { useState, useEffect } from "react";
import cn from "classnames";

export function ResultCardPlaceholder({ active }) {
  const [op, setOp] = useState(0.1);
  const [f, setF] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!active) return;

    const step = 0.001;
    const t = setTimeout(() => {
      if (op >= 0.15 && f) {
        setF(false);
      }

      if (op <= 0.05 && !f) {
        setF(true);
      }

      if (f) {
        setOp(op + step);
      }

      if (!f) {
        setOp(op - step);
      }
    }, 3);

    return () => {
      clearTimeout(t);
    };
  }, [op, active]);

  return (
    <div
      style={{
        opacity: op,
      }}
      className="rounded-lg min-w-[300px] min-h-[200px] bg-black  "
    ></div>
  );
}

function ResultCard(props) {
  function scoreColor(score) {
    if (score >= 0 && score <= 40) return " text-red-500 ";
    if (score >= 41 && score <= 50) return " text-yellow-500 ";
    if (score >= 51 && score <= 60) return " text-orange-500 ";
    if (score >= 61 && score <= 70) return " text-green-500 ";
    if (score >= 71 && score <= 100) return " text-blue-500 ";
  }

  return (
    <div className=" rounded-lg shadow-xl relative border bg-[#5522A9]  flex flex-col justify-center items-center">
      <div className="absolute top-[30%] transform scale-[1.5]">
        <i className="bi-file-earmark-check text-9xl text-white/10 " />
      </div>

      <div className="space-y-1 bg-black/70 p-1 w-full rounded-lg text-black/60  text-sm">
        <p className="w-full  bg-black/40 rounded-lg p-1">
          <span className="px-2  rounded-lg text-white bg-black/40 inline-block mr-2 ">
            Course
          </span>

          <span className=" capitalize px-2 text-white text-ellipsis  font-bold">
            {props.course_name}{" "}
          </span>
        </p>
        <p className="w-full bg-black/40 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/40 text-white inline-block mr-2">
            Exam
          </span>
          <span className=" capitalize px-2 text-white text-ellipsis font-bold">
            {props.exam_name}
          </span>
        </p>
        <p className="w-full bg-black/40 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/40 text-white inline-block mr-2">
            Questions
          </span>
          <span className=" capitalize px-2 text-white font-bold">
            {props.total_attempts}
          </span>
        </p>
        <p className="w-full bg-black/40 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/40 text-white inline-block mr-2">
            Attempts
          </span>
          <span className=" capitalize px-2 text-white font-bold">
            {props.attempts}
          </span>
        </p>
        <p className="w-full bg-black/40 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/40 text-white inline-block mr-2">
            Correct Attempts
          </span>
          <span className=" capitalize px-2 text-white font-bold">
            {props.correct_attempts}
          </span>
        </p>
        <p className="w-full bg-black/40 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/40 text-white inline-block mr-2">
            Incorrect Attempts
          </span>
          <span className=" capitalize px-2 text-white font-bold">
            {props.incorrect_attempts}
          </span>
        </p>
        <p className="w-full bg-black/40 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/40 text-white inline-block mr-2">
            Score
          </span>
          <span
            className={
              " capitalize px-2 text-white font-bold " + scoreColor(props.score)
            }
          >
            {props.score}
          </span>
        </p>
        <p className="w-full bg-black/40 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/40 text-white inline-block mr-2">
            Remark
          </span>
          <span
            className={" font-bold px-2 uppercase " + scoreColor(props.score)}
          >
            {props.remark}
          </span>
        </p>

        <div className="w-full bg-black/40 rounded-lg p-1 flex flex-row justify-around items-center ">
          <span className="px-2 rounded-lg bg-black/40 text-white inline-block mr-2">
            Map
          </span>

          <div className="rounded-lg flex flex-row h-[8px] bg-white mx-auto w-[60%]">
            <div
              style={{ width: `${props.score}%` }}
              className="bg-green-500 h-[8px] rounded-l-lg"
            ></div>
            <div
              style={{ width: `${100 - props.score}%` }}
              className="bg-red-500 h-[8px] rounded-r-lg"
            ></div>
          </div>
        </div>

        <p className="w-full text-xs opacity/60 grayscale bg-black/40 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/40 text-white inline-block mr-2">
            <i className="bi-clock"></i> Generated on
          </span>
          <span className=" capitalize  px-2 text-white">
            {new Date(props.created * 1000).toLocaleString()}
          </span>
        </p>
      </div>

      <div
        title="Download as PDF"
        className="backdrop-blur-sm bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer rounded-lg p-1 absolute bottom-1 right-1"
      >
        <i className="bi-file-earmark-arrow-down text-lg text-white "></i>
      </div>
    </div>
  );
}

export default ResultCard;
