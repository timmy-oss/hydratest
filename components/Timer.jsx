import { useState, useEffect } from "react";
import cn from "classnames";

export default function Timer({ targetTime = 61, status = "idle" }) {
  const disallowedStates = ["warning", "error", "idle"];
  const [target, setTarget] = useState(targetTime * 60);
  const [n, setN] = useState(0);

  function pd(s) {
    s += "";

    if (s.length >= 2) return s;

    return "0" + s;
  }

  useEffect(() => {
    const t = setTimeout(() => {
      if (disallowedStates.includes(status)) {
        setN(n + 1);

        return;
      }

      if (target > 0) {
        setTarget(target - 1);
      }

      setN(n + 1);
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [n]);

  const h = Math.floor(target / 3600);
  const m = Math.floor((target % 3600) / 60);
  const s = Math.floor(target % 60);

  // console.log(target, h, m, s)

  return (
    <div className="self-center select-none min-w-[250px] pr-2">
      <div className="flex flex-row items-center justify-around  text-4xl bg-[#5522A9]/10 text-[#5522A9] rounded-xl">
        <div className="flex w-[80%] flex-row justify-center  py-2 transform rotate-0 shadow-[#5522A9]    px-4 ">
          <i className="bi-stopwatch"></i>&nbsp;
          {h !== 0 && (
            <>
              <span> {pd(h)} </span> &nbsp;:&nbsp;
            </>
          )}
          <span> {pd(m)} </span> &nbsp;:&nbsp; <span> {pd(s)} </span>
          <i
            title={"Status(" + status + ")"}
            className={
              "  bi-circle-fill xl:hidden transition-colors duration-300  ml-4  rounded-full " +
              cn({
                " text-green-400 ": status === "sending",
                " text-red-500 ": status === "error",
                " text-green-500 ": status === "success",
                " text-black/20 ": status === "idle",
                " text-yellow-500 ": status === "warning",
              })
            }
          >
            {" "}
          </i>
        </div>

        <span
          title={"Status(" + status + ")"}
          className={
            "   hidden xl:inline-block h-[55px] w-[20%] transition-colors duration-300    rounded-r-xl " +
            cn({
              " bg-green-400 ": status === "sending",
              " bg-red-500 ": status === "error",
              " bg-green-500 ": status === "success",
              " bg-black/20 ": status === "idle",
              " bg-yellow-500 ": status === "warning",
            })
          }
        >
          {" "}
        </span>
      </div>
    </div>
  );
}
