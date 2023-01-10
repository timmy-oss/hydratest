import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

function DropDown(props) {
  return (
    <div className="absolute top-0 z-20 shadow-xl border border-black/20 rounded-lg right-0 bg-white/40 min-h-[100px] min-w-[120px] px-2 py-4">
      <ul className="text-center text-base space-y-2  ">
        <Link href={`/portal/courses/${props.id}`}>
          <li className="block w-full cursor-pointer hover:bg-white/50 rounded-lg border border-transparent  hover:border-black/50">
            View
          </li>
        </Link>

        <Link href={`/portal/courses/${props.id}?action=contribute`}>
          <li className="block w-full cursor-pointer hover:bg-white/50 rounded-lg border border-transparent  hover:border-black/50">
            Contribute
          </li>
        </Link>

        <li className="block w-full cursor-pointer hover:bg-white/50 rounded-lg border border-transparent  hover:border-black/50">
          Delete
        </li>
      </ul>
    </div>
  );
}

export function CourseQuestionCardPlaceholder({ active }) {
  const [op, setOp] = useState(0.2);
  const [f, setF] = useState(true);

  useEffect(() => {
    if (!active) return;

    const step = 0.01;
    const t = setTimeout(() => {
      if (op >= 1 && f) {
        setF(false);
      }

      if (op <= 0.2 && !f) {
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
      style={{ opacity: op }}
      className="flex flex-row justify-between items-center min-h-[150px] text-xs space-x-4 rounded-lg w-full p-4 bg-black/10"
    >
      <div className=" space-y-2 flex flex-col justify-start items-start   "></div>
      <div className="w-[55%]  text-sm rounded-lg bg-black/20 text-white self-stretch space-y-4 p-4"></div>
    </div>
  );
}

function CourseQuestionCard(props) {
  const [showDropDown, setDropDown] = useState(false);

  useEffect(() => {
    if (!showDropDown) return;

    let t = setTimeout(() => setDropDown(false), 5000);

    return () => {
      clearTimeout(t);
    };
  }, [showDropDown]);

  return (
    <div className="flex flex-row justify-between items-center min-h-[150px] text-xs space-x-4 rounded-lg w-full p-4 bg-[#5522A9]/10">
      <div className=" space-y-2 flex flex-col justify-start items-start   ">
        <p className="inline-block  bg-[#5522A9]/60 text-white py-1 px-2 rounded-lg">
          {" "}
          ID:{" "}
          <span className="font-bold uppercase">
            {props.id && props.id.slice(0, 8)}...
          </span>
        </p>

        <p className="inline-block uppercase  bg-[#5522A9]/60 text-white py-1 px-2 rounded-lg">
          {" "}
          TYPE:
          <span className="font-bold"> {props.question_type}</span>
        </p>

        <p className="inline-block uppercase  bg-[#5522A9]/60 text-white py-1 px-2 rounded-lg">
          {" "}
          AUTHOR: <span className="font-bold"> {props.author}</span>
        </p>

        <p className="inline-block uppercase  bg-[#5522A9]/60 text-white py-1 px-2 rounded-lg">
          {" "}
          CREATED:
          <span className="font-bold">
            {" "}
            {new Date(props.created * 1000).toLocaleString()}
          </span>
        </p>

        <p className="inline-block uppercase  bg-[#5522A9]/60 text-white py-1 px-2 rounded-lg">
          {" "}
          LAST UPDATED:{" "}
          <span className="font-bold">
            {" "}
            {new Date(props.last_updated * 1000).toLocaleString()}
          </span>
        </p>

        {props.illustration && (
          <p className="inline-block uppercase  bg-[#5522A9]/60 text-white py-1 px-2 rounded-lg">
            {" "}
            ILLUSTRATION:{" "}
            <span className=" capitalize ">
              <a target="_blank" href={props.illustration}>
                View <i className="bi-box-arrow-up-right"></i>
              </a>
            </span>
          </p>
        )}

        <div className="block uppercase pt-2 text-base text-black space-x-2  px-2 rounded-lg">
          <i
            role="button"
            className="bi-arrow-bar-up hover:bg-gray-300 px-2 py-1 rounded-lg"
          ></i>
          <i
            role="button"
            className="bi-arrow-bar-down  hover:bg-gray-300 px-2 py-1 rounded-lg"
          ></i>

          <i
            role="button"
            className="bi-flag  hover:bg-gray-300 px-2 py-1 rounded-lg"
          ></i>
          <i
            role="button"
            className="bi-pencil-square  hover:bg-gray-300 px-2 py-1 rounded-lg"
          ></i>
          <i
            role="button"
            className="bi-trash  hover:bg-gray-300 px-2 py-1 rounded-lg"
          ></i>
        </div>
      </div>

      <div className="w-[55%]  text-sm rounded-lg bg-[#5522A9]/50 text-white self-stretch space-y-4 p-4">
        <p>
          {" "}
          <span className="bg-[#5522A9] font-bold inline-block rounded-full px-2 py-1">
            {" "}
            Q
          </span>{" "}
          &nbsp;
          {props.question_content}{" "}
        </p>
        <p>
          <span className="bg-[#5522A9] font-bold inline-block rounded-full px-2 py-1">
            {" "}
            A
          </span>{" "}
          &nbsp;
          {props.question_type === "germane" && props.answer}
          <span className="uppercase font-bold">
            {" "}
            {props.question_type === "objective" && props.correct_option}
          </span>
        </p>
      </div>
    </div>
  );
}

export default CourseQuestionCard;
