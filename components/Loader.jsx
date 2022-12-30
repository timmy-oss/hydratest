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
        <p className="w-[35px] h-[35px] inline-block border-8   border-y-[#5522A9] rounded-full animate-spin text-center "></p>



        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
