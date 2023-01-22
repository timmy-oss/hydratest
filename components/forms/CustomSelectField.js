import { useState, useEffect } from "react";
import { ErrorMessage } from "formik";
import cn from "classnames";
import { RpcRequest } from "../../lib/rpc";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function CustomSelect({
  defaultValue = null,
  currentValue,
  name,
  error: fError,
  setValue,
  showNullOption = true,
  auth,
  params = {
    rpcMethod: "courses.list",
    nameKey: "course_title",
    valueKey: "id",
    data: null,
  },
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  function toggleOpen() {
    setIsOpen(!isOpen);
    if (error) {
      setError(null);
    }
  }
  const ref = useDetectClickOutside({ onTriggered: () => setIsOpen(false) });

  function setI(v) {
    if (
      selected &&
      selected[params.nameKey] === v[params.nameKey] &&
      selected[params.valueKey] === v[params.valueKey]
    ) {
      return;
    }

    // console.log("triggered")
    setSelected(v);
    setValue(v[params.valueKey]);
  }

  async function fetchCourses() {
    // console.log(auth);

    if (params.data) {
      setData(params.data);
      return;
    }

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: null,
      },
    };

    setFetching(true);

    const res = await RpcRequest(params.rpcMethod, body);

    if (res.success) {
      setData(res.data.reverse());

      // console.log(res.data);
    } else {
      setError(res.error.message);
      toggleOpen();
      console.log(res.error);
    }

    setFetching(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    fetchCourses();
  }, [isOpen]);

  return (
    <>
      <div
        ref={ref}
        onClick={toggleOpen}
        className={
          "relative mt-2 w-full border  flex flex-row justify-between items-center bg-white   rounded-md py-4 px-4 cursor-default " +
          cn({
            " border-red-500/40 ": fError || error,
            " border-black/20 ": !fError && !error,
          })
        }
      >
        <span className="text-sm  first-letter:uppercase block w-full lg:w-[80%] truncate  text-black/60 ">
          {selected
            ? selected[params.nameKey]
              ? selected[params.nameKey]
              : `${name} - ${selected[params.valueKey]}`
            : "Select an option"}
        </span>

        <i className="bi-chevron-down text-lg text-black/60 absolute top-[25%] right-[5%]" />

        {/* Drop Down  */}

        {isOpen && (
          <div
            className={
              "absolute bg-white px-2 rounded-md  w-full py-2 overflow-y-auto hide-scroll-bar z-10 top-[95%]  left-0 border shadow-xl min-h-[100px] max-h-[180px] space-y-1 "
            }
          >
            {data && showNullOption && (
              <div
                className="truncate cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
                onClick={(e) => setI("")}
              >
                <span className="capitalize  truncate  text-black/60 text-sm ">
                  -
                </span>
              </div>
            )}

            {data ? (
              data.map((c, i) => {
                return (
                  <div
                    key={i}
                    className="truncate cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
                    onClick={(e) => setI(c)}
                  >
                    <span className="capitalize text-black/60 truncate  text-sm ">
                      {c[params.nameKey] || `${name} - ${c[params.valueKey]}`}
                    </span>
                  </div>
                );
              })
            ) : (
              <>
                <div className="flex flex-col justify-center items-center  space-y-4 pt-6 pb-4">
                  <p className="w-[30px] h-[30px] inline-block  border-r border-black rounded-full animate-spin text-center border-y-gray-400 border-l-gray-400"></p>
                  <p className="text-center text-sm text-black/60">
                    {" "}
                    Loading...{" "}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <p className="block my-4  text-xs text-red-500">
        {error || fError}
        <ErrorMessage name={name} />
      </p>
    </>
  );
}
