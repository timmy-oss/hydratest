import { useEffect, useState } from "react";

export default function SubmitPrompter({ closeMe }) {
  const [countDown, setCountDown] = useState(10);

  function submitExam() {
    closeMe();
  }

  useEffect(() => {
    const tId = setInterval(() => {
      if (countDown > 1) {
        setCountDown(countDown - 1);
      } else {
        submitExam();
      }
    }, 1000);

    return () => {
      clearInterval(tId);
    };
  }, [countDown]);

  return (
    <>
      {" "}
      <div className="fixed z-20 top-0 right-0 left-0 bottom-0 backdrop-blur-sm w-full"></div>
      <div
        style={{ fontFamily: "Mulish" }}
        className={
          "absolute top-[20%] z-20 right-0 left-0 w-[70%] max-w-xl mx-auto min-h-[200px] bg-white shadow-lg rounded-lg  p-2 "
        }
      >
        <div className="mx-auto mt-4 flex flex-col justify-center items-center">
          <i className="bi-emoji-frown text-6xl text-red-500"></i>
        </div>

        <p className="text-black/80 text-xl px-4 pt-4 text-center font-bold">
          Oops! Looks like you are out of time.
        </p>

        <p className="px-3 py-1 text-sm text-center text-red-500 font-normal ">
          Submitting in {countDown}...
        </p>

        <button
          onClick={submitExam}
          className="block border border-black/40 mt-6 transition-colors mb-2 hover:bg-black/10 w-[60%] mx-auto text-lg outline-none text-black/60 px-2 py-1 rounded-lg "
        >
          Submit now
        </button>
      </div>
    </>
  );
}
