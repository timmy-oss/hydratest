import Link from "next/link";
import { useState } from "react";
import ConfettiGenerator from "confetti-js";
import { useEffect } from "react";

export default function PostSubmissionCard(props) {
  const [close, setClose] = useState(false);

  useEffect(() => {
    const confettiSettings = {
      target: "my-canvas",
      start_from_edge: true,
      clock: 50,
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, []);

  if (close) return null;
  return (
    <>
      <div className="fixed  z-20 top-0 right-0 left-0 bottom-0 bg-black/60 w-full"></div>
      <canvas id="my-canvas"></canvas>
      <div
        style={{ fontFamily: "Mulish" }}
        className={
          "fixed top-[20%] z-20 right-0 left-0 w-[70%] max-w-xl mx-auto min-h-[200px] bg-white shadow-lg rounded-lg  p-2 "
        }
      >
        <div className="mx-auto mt-4 flex flex-col justify-center items-center">
          <i className="bi-check-circle text-6xl text-green-500"></i>
        </div>

        <p className="text-black/80 text-xl px-4 pt-4 text-center font-bold">
          Your exam submission was successful.
        </p>

        <p className="px-3 py-1 text-sm font-bold text-center text-gray-500 ">
          Visit the{" "}
          <Link href="/portal/results">
            {" "}
            <span className="text-sky-500 hover:underline">results</span>{" "}
          </Link>{" "}
          page to generate your result.
        </p>

        <button
          onClick={() => setClose(true)}
          className="block border border-black/40 mt-6 transition-colors mb-2 hover:bg-black/10 w-[60%] mx-auto text-lg outline-none text-black/60 px-2 py-1 rounded-lg "
        >
          Close
        </button>
      </div>
    </>
  );
}
