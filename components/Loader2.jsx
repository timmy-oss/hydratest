import Image from "next/image";

function Loader() {
  return (
    <div
      style={{
        zIndex: 100,
      }}
      className="fixed  text-center  bg-white  cursor-not-allowed flex flex-col justify-center items-center  top-0 bottom-0 right-0 left-0 "
    >
      <div role="status ">
        <p className="w-[45px] h-[45px] inline-block  border-r-4  border-[#5522A9] rounded-full animate-spin text-center border-y-gray-400"></p>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
