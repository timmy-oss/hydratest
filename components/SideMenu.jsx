import { context } from "../store/Provisioner";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";
import { useContext } from "react";

const menuList = [
  {
    title: "Users",
    icon: "bi-people",
    url: "/users",
  },
  {
    title: "Courses",
    icon: "bi-database",
    url: "/courses",
  },

  {
    title: "Exams",
    icon: "bi-card-list",
    url: "/exams",
  },
  {
    title: "Sessions",
    icon: "bi-hdd-network",
    url: "/sessions",
  },
  {
    title: "Results",
    icon: "bi-file-earmark-person",
    url: "/results",
  },
  {
    title: "Settings",
    icon: "bi-gear",
    url: "/settings",
  },
];

function SideMenu(props) {
  const router = useRouter();
  const path = router.pathname;
  const { logOut } = useContext(context);

  return (
    <div className="order-1 w-[15%] bg-white z-10 mx-2 mb-2 fixed top-0 left-0 bottom-0 select-none  xl:block min-h-[650px] self-start mt-20 shadow-xl px-4 rounded-lg  border ">
      <div className="   text-[#5823B7]/80 flex flex-row  justify-center mt-3">
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

      <ul className="space-y-6">
        {menuList.map((a, b) => (
          <Link key={b} href={"/portal" + a.url}>
            <li
              style={{ fontFamily: "Mulish" }}
              className={
                "text-base  transition-colors px-6  py-2  mt-4  text-black/60 bg-gray-100 rounded-md text-left " +
                cn({
                  " border border-black cursor-default":
                    path === "/portal" + a.url,
                  " hover:bg-gray-200 cursor-pointer ":
                    path !== "/portal" + a.url,
                })
              }
            >
              {" "}
              <i
                className={a.icon + " text-xl hidden xl:inline-block"}
              ></i>{" "}
              &nbsp;&nbsp;{a.title}
            </li>
          </Link>
        ))}
      </ul>

      <div className="w-full mt-12">
        <button
          onClick={logOut}
          className="rounded-lg transition-colors duration-300 hover:bg-red-100 block w-full p-1 text-red-500 border border-red-500 bg-white text-sm "
        >
          <i className="bi-power text-base"></i>&nbsp;&nbsp; Log Out
        </button>
      </div>

      <p className="mt-8 text-center text-xs hover:underline cursor-pointer text-black/50">
        {" "}
        Leave feedback{" "}
      </p>
    </div>
  );
}

export default SideMenu;
