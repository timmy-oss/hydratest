import { useState, useEffect } from "react";
import cn from "classnames";

export default function WatchTimer({
  duration,
  elapsedTime: elapsed,
  status = "idle",
}) {
  const disallowedStates = ["warning", "error", "idle"];
  const [useServer, setUseServer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60 - elapsed);

  function pd(s) {
    s += "";

    if (s.length >= 2) return s;

    return "0" + s;
  }

  useEffect(() => {
    const t = setTimeout(() => {
      if (disallowedStates.includes(status)) {
        setTimeLeft(timeLeft);

        return;
      }

      if (timeLeft > 0) {
        const serverTimeLeft = duration * 60 - elapsed;

        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [timeLeft]);

  useEffect(() => {
    setUseServer(true);
  }, [elapsed]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = Math.floor(timeLeft % 60);

  // console.log(timeLeft, h, m, s)

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
              "  bi-circle-fill  animate-pulse xl:inline-block transition-colors duration-300  ml-4  rounded-full " +
              cn({
                " text-red-500 ": status === "error",
                " text-green-500 ": status === "success",
                " text-green-500  ": status === "sending",
                " text-yellow-500 ": status === "warning",
                " text-black/20 ": status === "idle",
              })
            }
          >
            {" "}
          </i>
        </div>

        <span
          title={"Status(" + status + ")"}
          className={
            "   hidden xl:hidden animate-pulse h-[55px] w-[20%] transition-colors duration-300    rounded-r-xl " +
            cn({
              " bg-red-500 ": status === "error",
              " bg-green-500 ": status === "success",
              " bg-green-500  ": status === "sending",
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
