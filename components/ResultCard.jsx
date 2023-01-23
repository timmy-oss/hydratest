import { useState, useEffect } from "react";

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
  return (
    <div className=" rounded-lg shadow-xl relative border py-3 px-3 flex flex-col justify-center items-center">
      <div className="absolute top-[30%] transform scale-[1.5]">
        <i className="bi-file-earmark-check text-9xl text-black/10 " />
      </div>

      <div className="space-y-2 text-black/60  text-sm">
        <p className="w-full bg-black/20 rounded-lg p-1">
          <span className="px-2  rounded-lg bg-black/20 inline-block mr-2">
            Course
          </span>

          <span className="capitalize px-2 text-[#5522A9] text-ellipsis">
            {props.course_name}{" "}
          </span>
        </p>
        <p className="w-full bg-black/20 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/20 inline-block mr-2">
            Exam
          </span>
          <span className="capitalize px-2 text-[#5522A9] text-ellipsis">
            {props.exam_name}
          </span>
        </p>
        <p className="w-full bg-black/20 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/20 inline-block mr-2">
            Questions
          </span>
          <span className="capitalize px-2 text-[#5522A9]">
            {props.total_attempts}
          </span>
        </p>
        <p className="w-full bg-black/20 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/20 inline-block mr-2">
            Attempts
          </span>
          <span className="capitalize px-2 text-[#5522A9]">
            {props.attempts}
          </span>
        </p>
        <p className="w-full bg-black/20 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/20 inline-block mr-2">
            Correct Attempts
          </span>
          <span className="capitalize px-2 text-[#5522A9]">
            {props.correct_attempts}
          </span>
        </p>
        <p className="w-full bg-black/20 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/20 inline-block mr-2">
            Incorrect Attempts
          </span>
          <span className="capitalize px-2 text-[#5522A9]">
            {props.incorrect_attempts}
          </span>
        </p>
        <p className="w-full bg-black/20 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/20 inline-block mr-2">
            Score
          </span>
          <span className="capitalize px-2 text-[#5522A9]">{props.score}</span>
        </p>
        <p className="w-full bg-black/20 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/20 inline-block mr-2">
            Remark
          </span>
          <span className="capitalize px-2 text-[#5522A9]">{props.remark}</span>
        </p>
        <p className="w-full bg-black/20 rounded-lg p-1">
          <span className="px-2 rounded-lg bg-black/20 inline-block mr-2">
            Generated on
          </span>
          <span className="capitalize px-2 text-[#5522A9]">
            {new Date(props.created * 1000).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResultCard;
