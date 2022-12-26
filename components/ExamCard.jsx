import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

function DropDown(props) {
  return (
    <div className="absolute top-0 z-20 shadow-xl border border-black/20 rounded-lg right-0 bg-white/40 min-h-[100px] min-w-[120px] px-2 py-4">
      <ul className="text-center text-base space-y-2  ">
        <li className="block w-full cursor-pointer hover:bg-white/50 rounded-lg">
          View
        </li>

        <li className="block w-full cursor-pointer hover:bg-white/50 rounded-lg">
          Archive
        </li>

        <li className="block w-full cursor-pointer hover:bg-white/50 rounded-lg">
          Share
        </li>

        <li className="block w-full cursor-pointer hover:bg-white/50 rounded-lg">
          Remove
        </li>
      </ul>
    </div>
  );
}

export function ExamCardPlaceholder({ active }) {
  const [op, setOp] = useState(0.1);
  const [f, setF] = useState(true);

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
      className="rounded-lg min-w-[300px] min-h-[300px] bg-black  "
    ></div>
  );
}

function ExamCard(props) {
  const [showDropDown, setDropDown] = useState(false);

  useEffect(() => {
    if (!showDropDown) return;

    let t = setTimeout(() => setDropDown(false), 5000);

    return () => {
      clearTimeout(t);
    };
  }, [showDropDown]);

  return (
    <div className="rounded-lg  ">
      <div className="relative max-h-[400px]">
        <Image
          src={props.course.course_cover}
          width={400}
          height={400}
          alt="Course"
          className="rounded-lg object-cover"
        />
        <i
          onClick={(e) => setDropDown(!showDropDown)}
          className="bi-three-dots-vertical text-white text-base absolute top-0 right-[2%] mt-2 cursor-pointer hover:bg-black/20 duration-300  transition-colors rounded-full px-2 py-1 "
        ></i>

        {showDropDown && <DropDown />}
      </div>

      <div className="relative bg-black/40 bottom-0 flex flex-col space-y-2 justify-center items-center left-[5%]">

        <span className=" rounded  leading-8 px-2 py-1  text-white font-bold capitalize ">
          {props.exam_title}
        </span>


        <span className=" rounded  leading-8 px-2 py-1  text-white font-bold  ">
          {props.time_allowed} minutes
        </span>

        <span className=" rounded  leading-8 px-2 py-1  text-white font-bold  ">
          {props.number_of_questions} questions
        </span>


      </div>
    </div>
  );
}

export default ExamCard;
