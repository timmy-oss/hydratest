import Link from "next/link";
import cn from "classnames";
import { useState, useEffect } from "react";
import { RpcRequest } from "../lib/rpc";

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
  const [meta, setMeta] = useState({});
  const [fetching, setFetching] = useState({});
  const [error, setError] = useState(null);

  //  Request functions

  async function fetchQuestionMeta() {
    const body = {
      req: {
        auth: {
          token: props.token,
        },
        body: {
          id: props.id,
        },
      },
    };

    const res = await RpcRequest(`courses.questions.get_meta`, body);

    if (res.success) {
      setMeta(res.data);
      // console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }
  }

  async function questionRequest(type = "upvote") {
    if (fetching["upvote"] || fetching["downvote"] || fetching["flag"]) return;

    setFetching({ ...fetching, [type]: true });

    const body = {
      req: {
        auth: {
          token: props.token,
        },
        body: {
          id: props.id,
        },
      },
    };

    const res = await RpcRequest(`courses.questions.${type}`, body);

    if (res.success) {
      setMeta({ ...meta, [type]: res.data });
      // console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching({ ...fetching, [type]: false });
  }

  async function toggleUpvote() {
    await questionRequest("upvote");
  }

  async function toggleDownvote() {
    await questionRequest("downvote");
  }

  async function toggleFlag() {
    await questionRequest("flag");
  }

  function handleEditClick(e) {
    props.editQuestion(props.id);
  }

  useEffect(() => {
    fetchQuestionMeta();
  }, []);

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

        <div className=" flex flex-rowjustify-around items-center uppercase pt-2 text-base text-black space-x-2  px-2 rounded-lg">
          <div>
            <i
              role="button"
              title="Upvote"
              onClick={toggleUpvote}
              className={
                "bi-arrow-bar-up hover:bg-gray-300 px-2 py-1 rounded-lg " +
                cn({
                  " text-green-500 ": meta.upvote && meta.upvote.upvoted,
                  " text-black ": !(meta.upvote && meta.upvote.upvoted),
                  " opacity-40 bg-gray-300 ": fetching.upvote,
                })
              }
            ></i>
            <span className="text-xs align-middle inline-block text-black">
              {" "}
              {meta.upvote && meta.upvote.upvotes}
            </span>
          </div>

          <div>
            <i
              role="button"
              title="Downvote"
              onClick={toggleDownvote}
              className={
                "bi-arrow-bar-down  hover:bg-gray-300 px-2 py-1 rounded-lg " +
                cn({
                  " text-red-500 ": meta.downvote && meta.downvote.downvoted,
                  " text-black ": !(meta.downvote && meta.downvote.downvoted),
                  " opacity-40 bg-gray-300 ": fetching.downvote,
                })
              }
            ></i>
            <span className="text-xs align-middle inline-block text-black">
              {" "}
              {meta.downvote && meta.downvote.downvotes}
            </span>
          </div>

          <div>
            <i
              title="Flag as inappropriate"
              role="button"
              onClick={toggleFlag}
              className={
                "  hover:bg-gray-300 px-2 py-1 rounded-lg " +
                cn({
                  " text-red-500 bi-flag-fill ": meta.flag && meta.flag.flagged,
                  " text-black bi-flag ": !(meta.flag && meta.flag.flagged),
                  " opacity-40 bg-gray-300 ": fetching.flag,
                })
              }
            ></i>

            <span className="text-xs align-middle hidden  text-black">
              {" "}
              {meta.flag && meta.flag.flags}
            </span>
          </div>
          <i
            title="Edit"
            role="button"
            onClick={handleEditClick}
            className="bi-pencil-square  hover:bg-gray-300 px-2 py-1 rounded-lg"
          ></i>
          <i
            title="Delete"
            role="button"
            className="bi-trash cursor-not-allowed opacity-20 bg-gray-300 hover:bg-gray-300 px-2 py-1 rounded-lg"
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
