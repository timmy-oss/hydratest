import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RpcRequest } from "../lib/rpc";

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
    <div className=" rounded-lg   border p-4 flex flex-col justify-center items-center space-y-6">
      <div>
        <i className="bi-file-earmark-check text-7xl text-black" />
      </div>

      <div className="space-y-2">
        <p> Course: {props.course_name} </p>
        <p> Exam: {props.exam_name} </p>
        <p> Questions : {props.total_attempts} </p>
        <p> Attempts : {props.attempts} </p>
        <p> Correct Attempts : {props.correct_attempts} </p>
        <p> Incorrect Attempts : {props.incorrect_attempts} </p>
        <p> Score : {props.score} </p>
        <p> Remark : {props.remark} </p>
      </div>
    </div>
  );
}

export default ResultCard;
