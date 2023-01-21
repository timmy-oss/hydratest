import { useState, useEffect } from "react";
import cn from "classnames";

export default function WatchTimer({
  duration,
  elapsedTime,
  session,
  status = "idle",
}) {
  const disallowedStates = ["warning", "error", "idle"];
  const timeRemaining = duration * 60 - (elapsedTime || session.elapsed_time);
  // console.log(
  //   timeRemaining,
  //   duration * 60,
  //   elapsedTime || session.elapsed_time
  // );
  const [timeLeft, setTimeLeft] = useState(timeRemaining);

  const [t, setT] = useState(0);

  const alert = timeLeft <= 60;

  function pd(s) {
    s += "";

    if (s.length >= 2) return s;

    return "0" + s;
  }

  useEffect(() => {
    const t = setTimeout(() => {
      if (disallowedStates.includes(status)) {
        setT(t + 1);
        return;
      }

      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        setT(t + 1);
      }
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [t]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = Math.floor(timeLeft % 60);

  // console.log(timeLeft, h, m, s)

  return (
    <div className="self-center select-none min-w-[250px] pr-2 ">
      <div className="flex flex-row justify-around items-center space-x-4">
        <i
          title={
            status === "success"
              ? "System operational"
              : status === "warning"
              ? "System error"
              : status === "error"
              ? "System error (critical)"
              : "System offline"
          }
          className={
            "  bi-circle-fill text-4xl animate-pulse transition-colors duration-300 rounded-full " +
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

        <div
          className={
            " flex flex-row items-center  justify-around  text-4xl rounded-xl " +
            cn({
              "   bg-red-500/80 text-white": timeLeft % 2 === 0 && alert,
              "  bg-[#5522A9]/10 text-[#5522A9] ": !(
                timeLeft % 2 === 0 && alert
              ),
            })
          }
        >
          <div className="flex w-[80%] flex-row justify-center  py-2 transform rotate-0 shadow-[#5522A9]    px-4 ">
            <i className="bi-stopwatch"></i>&nbsp;
            {h !== 0 && (
              <>
                <span> {pd(h)} </span> &nbsp;:&nbsp;
              </>
            )}
            <span> {pd(m)} </span> &nbsp;:&nbsp; <span> {pd(s)} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
