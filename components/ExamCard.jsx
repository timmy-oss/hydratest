import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
      className="rounded-lg min-w-[300px] min-h-[200px] bg-black  "
    ></div>
  );
}

function ExamCard(props) {
  const [showDropDown, setDropDown] = useState(false);
  const router = useRouter();

  function toExam() {
    router.push(`/exams/${props.id}`);
  }

  useEffect(() => {
    if (!showDropDown) return;

    let t = setTimeout(() => setDropDown(false), 5000);

    return () => {
      clearTimeout(t);
    };
  }, [showDropDown]);

  return (
    <div className="rounded-lg  ">
      <div className=" relative rounded-lg border">
        <Image
          src={props.course.course_cover}
          width={500}
          height={400}
          alt="Course"
          className="rounded-lg object-cover aspect-[16/9]"
        />
        <i
          title="Take exam"
          onClick={toExam}
          className="bi-chevron-right  text-2xl absolute bottom-[2%] right-[2%] mt-2 cursor-pointer hover:text-black bg-white/50 duration-300  hover:bg-white/70 text-black  transition-colors rounded-full px-2 py-1 "
        ></i>

        <div className="absolute text-justify py-2 bottom-0  flex flex-col   space-y-1  px-2  rounded-bl-lg rounded-tr-lg left-0">
          <span className=" inline-block rounded-lg px-2 py-1 bg-[#5522A9]/80  self-start    text-white  text-xs font-bold capitalize ">
            <i className="bi-laptop"></i> &nbsp;
            {props.exam_title}
          </span>

          <span className=" inline-block rounded-lg px-2 py-1 bg-[#5522A9]/80  self-start    text-white  text-xs font-bold capitalize ">
            <i className="bi-card-heading"></i> &nbsp;
            {props.course.course_title}
          </span>

          <span className="  inline-block rounded-lg px-2 py-1 bg-[#5522A9]/80   self-start    text-white  text-xs font-bold capitalize   ">
            <i className="bi-clock"></i> &nbsp;
            {props.time_allowed} minutes
          </span>

          <span className="  inline-block rounded-lg px-2 py-1 bg-[#5522A9]/80  self-start     text-white  text-xs font-bold capitalize   ">
            <i className="bi-123"></i> &nbsp;
            {props.number_of_questions} questions
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExamCard;
