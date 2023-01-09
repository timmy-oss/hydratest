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

export function CourseCardPlaceholder({ active }) {
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

function CourseCard(props) {
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
      <div className="relative  border rounded-lg">
        <Image
          src={props.course_cover}
          width={400}
          height={400}
          alt="Course"
          className="rounded-lg object-cover"
        />
        {!showDropDown && (
          <i
            onClick={(e) => setDropDown(true)}
            className="bi-three-dots-vertical text-white text-base absolute top-0 right-[2%] mt-2 cursor-pointer hover:bg-black/50 duration-300  transition-colors rounded-full px-2 py-1 bg-black/80"
          ></i>
        )}

        {showDropDown && <DropDown {...props} />}
      </div>
      <span className="relative bottom-[30%] rounded bg-[#5522A9] leading-8 px-2 py-1  text-white font-bold capitalize left-[5%]">
        {props.course_title}
      </span>
    </div>
  );
}

export default CourseCard;
