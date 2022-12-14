import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Field, Formik, ErrorMessage } from "formik";
import cn from "classnames";
import FormLoader from "./FormLoader";
import { RpcRequest } from "../../lib/rpc";
import { useRouter } from "next/router";

export function NotifyCard({
  id = "U000000",
  error = false,
  closeOnError,
  sMsg = "",
  eMsg = "",
  successText = "Proceed to sign in",
  successCallback = null,
}) {
  const router = useRouter();

  function handleBtn(e) {
    if (error) {
      closeOnError();
    } else {
      if (successCallback) {
        successCallback();
      } else {
        router.replace(`/?uid=${id}`);
      }
    }
  }
  return (
    <>
      <div className="absolute z-10 top-0 right-0 left-0 bottom-0 bg-black/20 w-full"></div>

      <div
        style={{ fontFamily: "Mulish" }}
        className="absolute top-[20%] z-10 right-0 left-0 w-[60%] mx-auto min-h-[200px] bg-gray-100 shadow rounded-lg  p-2"
      >
        <div className="mx-auto mt-4 flex flex-col justify-center items-center">
          {error ? (
            <i className="bi-exclamation-circle text-6xl text-red-500"></i>
          ) : (
            <i className="bi-check2-circle text-6xl text-green-500"></i>
          )}
        </div>
        {error ? (
          <p className="text-black/60 text-base p-4 text-center font-bold">
            {eMsg || "Unable to create account, please retry."}
            <br />
            <span className="px-3 py-1 text-sm  text-red-500 font-normal ">
              ({error})
            </span>
          </p>
        ) : (
          <p className="text-black/60 text-base p-4 text-center font-bold">
            {sMsg || (
              <>
                Your account has been created. Your ID is{" "}
                <span className="px-3 py-1 text-sm bg-black/5 text-black/60 rounded-lg">
                  {id}
                  <i className="bi-clipboard cursor-pointer ml-1 text-black/60 inline-block"></i>
                </span>
              </>
            )}
          </p>
        )}

        <button
          onClick={handleBtn}
          className="block border border-black/40 mt-2 transition-colors mb-2 hover:bg-black/10 w-[60%] mx-auto outline-none text-black/60 px-2 py-1 rounded-lg "
        >
          {error ? "Close" : successText}
        </button>
      </div>
    </>
  );
}

const yupSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("Please enter your firstname.")
    .min(3, "Too short!")
    .max(32, "Too long!")
    .label("Firstname"),

  lastname: Yup.string()
    .required("Please enter your lastname.")
    .min(3, "Too short!")
    .max(32, "Too long!")
    .label("Lastname"),

  password1: Yup.string()
    .required("Please enter a password.")
    .min(8, "Too short!")
    .max(35, "Too long!")
    .label("Password"),

  password2: Yup.string()
    .required("Please confirm your password.")
    .min(8, "Too short!")
    .max(35, "Too long!")
    .label("Password"),

  agree: Yup.bool().test("is-true", "Accept terms.", (v) => {
    return v;
  }),
});

export default function LogInForm() {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(values) {
    const body = {
      req: {
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.password2,
      },
    };

    setFetching(true);

    const res = await RpcRequest("users.create", body);

    if (res.success) {
      // alert("Success : " + res.data.id);
      setData(res.data);
    } else {
      // alert(res.error.message);
      console.log(res.error);
      setError(res.error.message);
    }

    setFetching(false);
  }

  return (
    <div className="relative p-4 w-full  ">
      {(data || error) && (
        <NotifyCard
          closeOnError={() => setError(null)}
          id={data && data.id}
          error={error}
        />
      )}

      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          password1: "",
          password2: "",
          agree: false,
        }}
        onSubmit={handleSubmit}
        validationSchema={yupSchema}
      >
        {({ errors, isValid, isSubmitting, values, setFieldError }) => {
          if (isValid) {
            if (values.password1 !== values.password2) {
              setFieldError("password2", "Password fields must match.");
            }
          }

          return (
            <Form className="w-[80%] mx-auto">
              {/* Logo Header  starts  */}

              <div className="  text-[#5823B7] flex flex-row  justify-start">
                <Image
                  priority
                  src="/assets/hydratest.png"
                  alt="logo"
                  className="object-contain"
                  width="120"
                  height="120"
                />
                <h1 className="font-black self-center text-4xl inline-block">
                  HydraTest{" "}
                </h1>
              </div>

              {/* Logo Header ends  */}

              <FormLoader active={fetching} />

              <h2 className="text-3xl font-bold  text-left text-black/80">
                {" "}
                Register
              </h2>

              <legend className="text-base  text-black/50 py-4">
                Sign up for the ultimate test now.
              </legend>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="firstname"
                >
                  Firstname
                </label>
                <Field
                  className={
                    "outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.firstname,
                      "border-red-500/40": errors.firstname,
                    })
                  }
                  name="firstname"
                  id="firstname"
                  type="text"
                  placeholder="John"
                />

                <p className="block mb-4  text-xs text-red-500">
                  <ErrorMessage name="firstname" />
                </p>
              </div>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="lastname"
                >
                  Lastname
                </label>
                <Field
                  className={
                    "outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.lastname,
                      "border-red-500/40": errors.lastname,
                    })
                  }
                  name="lastname"
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                />

                <p className="block mb-4  text-xs text-red-500">
                  <ErrorMessage name="lastname" />
                </p>
              </div>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="password1"
                >
                  Password
                </label>
                <Field
                  className={
                    "outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.password1,
                      "border-red-500/40": errors.password1,
                    })
                  }
                  name="password1"
                  id="password1"
                  type="password"
                  placeholder="Password"
                />

                <p className="block mb-2  text-xs text-red-500">
                  <ErrorMessage name="password1" />
                </p>
              </div>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="password2"
                >
                  Confirm Password
                </label>
                <Field
                  className={
                    "outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.password2,
                      "border-red-500/40": errors.password2,
                    })
                  }
                  name="password2"
                  id="password2"
                  type="password"
                  placeholder="Password"
                />

                <p className="block mb-2  text-xs text-red-500">
                  <ErrorMessage name="password2" />
                </p>
              </div>

              <div className="flex flex-row  space-x-4  py-4">
                <Field
                  className="outline-none  inline-block  align-baseline"
                  name="agree"
                  id="agree"
                  type="checkbox"
                />
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="agree"
                >
                  I agree to HydraTest's terms of use and policy.
                </label>
              </div>
              <p className="block mb-2  text-xs text-red-500">
                <ErrorMessage name="agree" />
              </p>

              <div className="mt-8">
                <input
                  type="submit"
                  value="Sign Up"
                  disabled={!isValid || isSubmitting || fetching}
                  className={
                    " capitalize bg-[#AE90E9]  transition-colors duration-500 text-white py-3 w-full block my-4 rounded-md " +
                    cn({
                      " opacity-40 cursor-not-allowed":
                        !isValid || isSubmitting || fetching,
                      " hover:bg-[#5823B7]/60 ":
                        isValid && !isSubmitting && !fetching,
                    })
                  }
                  role="button"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
