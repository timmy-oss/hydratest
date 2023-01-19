import { useContext, useState } from "react";
import Image from "next/image";
import { context } from "../store/Provisioner";

function Header(props) {
  const { store, logOut } = useContext(context);

  const [q, setQ] = useState("");

  function handleQChange(e) {
    if (q !== e.target.value.trim()) {
      setQ(e.target.value.trim());
    }
  }

  // console.log(store.auth);

  return (
    <header className="hidden md:flex flex-row fixed top-0 left-0 right-0 bg-white z-[2] justify-between items-center w-full border-b mb-4 px-4">
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
            onChange={handleQChange}
            value={q}
            className={
              "outline-none block max-w-[800px] focus:bg-gray-100 w-full p-4 h-[35px] px-6 text-xs my-4 placeholder:text-[#5522A9]/50 placeholder:text-xs ring-1 ring-[#5522A9]/20 text-[#5522A9] border rounded-xl py-2 bg-white transition-colors duration-300 border-transparent "
            }
            name="query"
            id="searchBar"
            type="text"
            placeholder="Search..."
          />

          {q.length > 0 ? (
            <i
              role="button"
              onClick={() => setQ("")}
              className="bi-x-octagon text-sm  text-[#5522A9]/60  absolute top-[35%] right-[2%]"
            ></i>
          ) : (
            <i className="bi-search text-xs  text-[#5522A9]/60  absolute top-[40%] right-[2%]"></i>
          )}
        </div>
      </div>

      {store.auth && store.auth.token && (
        <div className="">
          <div className="flex text-[#5823B7]/80  flex-row justify-around space-x-12 2xl:space-x-8 items-center">
            <i className="bi-bell text-xl"></i>
            <i className="bi-chat-left text-xl"></i>
            <i className="bi-person-circle text-2xl "></i>
            <div className=" border border-[#5522A9]/60 select-none font-bold tracking-wider text-sm rounded-lg flex flex-row justify-between items-center space-x-2">
              <span className="pl-3 font-bold">{store.auth.user.id}</span>
              <div
                role="button"
                onClick={logOut}
                className="bg-[#5522A9]/10 relative transition-colors group hover:bg-[#5522A9]/60 px-2  rounded-r-lg hover:text-white "
              >
                <i className="bi-power text-xl cursor-pointer align-baseline"></i>

                <span className="bg-black/20 font-normal text-xs text-center hidden group-hover:block text-black/70 rounded-lg  min-w-[80px]  right-0 -bottom-[100%] py-1 absolute">
                  {" "}
                  Log out{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
