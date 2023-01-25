import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useId, forwardRef } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDetectClickOutside } from "react-detect-click-outside";

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
      className="rounded-lg min-w-[300px] min-h-[200px] bg-black  "
    ></div>
  );
}

function CourseCard(props) {
  const [copied, setCopied] = useState(false);

  function closeDrop() {
    setDropDown(false);
  }

  const ref = useDetectClickOutside({ onTriggered: closeDrop });

  return (
    <div className=" rounded-lg  relative border border-black/20 pb-4">
      <div className="border-b border-black/20 rounded-lg">
        <Image
          src={props.course_cover}
          width={500}
          height={400}
          alt="Course"
          className="rounded-lg object-cover aspect-[16/9]"
        />

        <CopyToClipboard
          text={`${process.env.NEXT_PUBLIC_APP_URL}/portal/courses/${props.id}`}
          onCopy={() => {
            setCopied(true);
            let t;
            t = setTimeout(() => {
              setCopied(false);

              clearTimeout(t);
            }, 2000);
          }}
        >
          {copied ? (
            <i className="bi-check2 text-white text-base absolute top-0 right-[2%] mt-2 cursor-pointer hover:bg-black/60 duration-300  transition-colors rounded-full px-2 py-1 bg-black/80"></i>
          ) : (
            <i
              title="Copy link"
              className="bi-link-45deg text-white text-base absolute top-0 right-[2%] mt-2 cursor-pointer hover:bg-black/60 duration-300  transition-colors rounded-full px-2 py-1 bg-black/80"
            ></i>
          )}
        </CopyToClipboard>

        <Link
          title="Contribute questions"
          href={`/portal/courses/${props.id}?action=contribute`}
        >
          <i className="bi-plus text-white text-base absolute top-[12%] right-[2%] mt-2 cursor-pointer hover:bg-black/60 duration-300  transition-colors rounded-full px-2 py-1 bg-black/80"></i>
        </Link>

        <Link title="View course" href={`/portal/courses/${props.id}`}>
          <i className="bi-eye text-white text-base absolute top-[24%] right-[2%] mt-2 cursor-pointer hover:bg-black/60 duration-300  transition-colors rounded-full px-2 py-1 bg-black/80"></i>
        </Link>
      </div>

      <div className="mt-4 py-4 px-2 text-left">
        <Link href={`/portal/courses/${props.id}`}>
          <span
            style={{
              fontFamily: "Roboto",
            }}
            className=" text-2xl rounded  px-2 py-1  text-[#5522A9]  capitalize  hover:underline"
          >
            {props.course_title}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
