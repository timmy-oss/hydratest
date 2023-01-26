function Loader() {
  return (
    <div className="fixed z-[1] text-center  bg-white  cursor-wait flex flex-col justify-center items-center  top-0 bottom-0 right-0 left-0 ">
      <div role="status ">
        <p className="w-[70px] h-[70px] inline-block border-8  border-gray-300  border-t-[#5522A9] rounded-full animate-spin  text-center "></p>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
