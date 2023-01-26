import { useState, useEffect } from "react";
import cn from "classnames";

export default function Loader(props) {
  const [track, setTrack] = useState(1);
  const speed = 150;

  function getData() {
    let a, b, c;

    if (track === 0) {
      a = b = c = false;
    }

    if (track === 1) {
      a = true;
      b = false;
      c = false;
    }

    if (track === 2) {
      a = true;
      b = true;
      c = false;
    }

    if (track === 3) {
      a = b = c = true;
    }

    return {
      a,
      b,
      c,
    };
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (track >= 3) {
        setTrack(0);
      } else {
        setTrack(track + 1);
      }
    }, speed);

    return () => {
      clearTimeout(timerId);
    };
  });

  const data = getData();

  return (
    <div
      role="status"
      className="fixed  z-[1] bg-white cursor-wait   top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center"
    >
      <div className="space-x-4 flex flex-row justify-center items-center">
        <div
          className={cn([
            {
              " h-[20px] w-[20px] md:h-[35px] md:w-[35px] rounded-full  ": true,
              "bg-[#5522A9]": data.a,
              "bg-[#5522A9]/20": !data.a,
            },
          ])}
        ></div>

        <div
          className={cn([
            {
              " h-[20px] w-[20px] md:h-[35px] md:w-[35px] rounded-full  ": true,
              "bg-[#5522A9]": data.b,
              "bg-[#5522A9]/20": !data.b,
            },
          ])}
        ></div>

        <div
          className={cn([
            {
              " h-[20px] w-[20px] md:h-[35px] md:w-[35px] rounded-full  ": true,
              "bg-[#5522A9]": data.c,
              "bg-[#5522A9]/20": !data.c,
            },
          ])}
        ></div>
      </div>
    </div>
  );
}
