import { useContext } from "react";
import Image from "next/image";
import { context } from "../store/Provisioner";

function Header(props) {
  const { store, dispatch } = useContext(context);

  // console.log(store.auth);

  return (
    <header className="flex flex-row fixed top-0 left-0 right-0 bg-white z-10 justify-between items-center w-full border-b mb-4 px-4">
      <div className="   text-[#5823B7]/80 flex flex-row  justify-start">
        <Image
          priority
          src="/assets/hydratest.png"
          alt="logo"
          className="object-contain"
          width="50"
          height="50"
        />
        <h1 className=" self-center text-lg inline-block">HydraTest</h1>
      </div>

      <div className="  lg:flex flex-col justify-center items-center flex-1 hidden  ">
        <div className="relative min-w-[600px]">
          <input
            className={
              "outline-none block max-w-[800px] bg-gray-100 w-full p-4 h-[35px] px-6 text-xs my-4 placeholder:text-[#5522A9]/50 placeholder:text-xs  text-[#5522A9] border rounded-xl py-2  border-transparent "
            }
            name="query"
            id="searchBar"
            type="text"
            placeholder="Search..."
          />

          <i className="bi-search text-xs  text-[#5522A9]/60  absolute top-[40%] right-[2%]"></i>
        </div>
      </div>

      {store.auth && store.auth.token && (
        <div className="">
          <div className="flex text-[#5823B7]/80  flex-row justify-around space-x-4 2xl:space-x-8 items-center">
            <i className="bi-bell text-xl"></i>
            <i className="bi-chat-left text-xl"></i>
            <i className="bi-person-circle text-2xl "></i>
            <span
              style={{ fontFamily: "Mulish" }}
              className=" border border-[#5522A9]/60 select-none font-bold tracking-widest text-sm rounded-lg px-2 py-1"
            >
              {store.auth.user.id}
              <i className="bi-power text-xl cursor-pointer align-baseline"></i>
            </span>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
