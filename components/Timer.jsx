import { useState, useEffect } from "react";

export default function Timer({ targetTime = 61 }) {
  const [target, setTarget] = useState(targetTime * 60);

  function pd(s) {
    s += "";

    if (s.length >= 2) return s;

    return "0" + s;
  }

  useEffect(() => {
    const t = setInterval(() => {
      if (target > 0) {
        setTarget(target - 1);
      }
    }, 1000);

    return () => {
      clearInterval(t);
    };
  });

  const h = Math.floor(target / 3600);
  const m = Math.floor((target % 3600) / 60);
  const s = Math.floor(target % 60);

  // console.log(target, h, m, s)

  return (
    <div className="self-center select-none min-w-[250px] ">
      <div className="flex flex-row justify-center w-full text-4xl bg-[#5522A9]/10 text-[#5522A9] py-2 transform rotate-0 shadow-[#5522A9]   shadow-2lg px-4 rounded-xl">
        <i className="bi-stopwatch"></i>&nbsp;
        {h !== 0 && (
          <>
            <span> {pd(h)} </span> &nbsp;:&nbsp;
          </>
        )}
        <span> {pd(m)} </span> &nbsp;:&nbsp; <span> {pd(s)} </span>
      </div>
    </div>
  );
}
