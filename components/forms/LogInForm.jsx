import Image from "next/image";
import { useState, useContext } from "react";
import * as Yup from "yup";
import { Form, Field, Formik, ErrorMessage, isInteger } from "formik";
import cn from "classnames";
import FormLoader from "./FormLoader";
import { RpcRequest } from "../../lib/rpc";
import { NotifyCard } from "./SignUpForm";
import { useRouter } from "next/router";
import { persistSession } from "../../lib/session";
import { context } from "../../store/Provisioner";

const yupSchema = Yup.object().shape({
  userId: Yup.string()
    .required("Please enter your ID.")
    .min(7, "Uhm, that ID isn't valid.")
    .max(7, "Uhm, that ID isn't valid.")
    .label("User ID")
    .test("is-valid-id", "Uhm, that ID isn't valid.", (v) => {
      const id = v ? v.toUpperCase() : "";

      if (id.length !== 7) {
        return false;
      }

      if (id.charAt(0) !== "U") {
        return false;
      }

      const slice = id.slice(1);

      if (isInteger(slice)) {
        return true;
      }

      return false;
    }),

  password: Yup.string()
    .required("Please enter your password.")
    .min(8, "Too short!")
    .max(35, "Too long!")
    .label("Password"),
});

export default function LogInForm() {
  const router = useRouter();
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { store, dispatch } = useContext(context);

  async function handleSubmit(values) {
    const body = {
      req: {
        id: values.userId,
        password: values.password,
      },
    };
    setFetching(true);

    const res = await RpcRequest("users.login", body);

    if (res.success) {
      setData(res.data);

      // console.log(res.data);

      // Persist the session

      persistSession(res.data);

      dispatch({
        type: "SET_AUTH",
        payload: {
          ...res.data,
        },
      });

      // console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  if (!router.isReady) return null;

  return (
    <div className="relative p-4 w-full  min-h-screen">
      {(data || error) && (
        <NotifyCard
          closeOnError={() => setError(null)}
          id={data && data.id}
          error={error}
          sMsg="Sign in successful"
          eMsg="Unable to sign in"
          successText="Proceed"
          successCallback={() => router.replace("/portal/courses")}
        />
      )}

      <Formik
        initialValues={{
          password: "",
          userId: router.query.uid || "",
          rememberMe: false,
        }}
        onSubmit={handleSubmit}
        validationSchema={yupSchema}
      >
        {({ errors, isValid, isSubmitting, values, setFieldValue }) => {
          if (values.userId.trim() === "u") {
            setFieldValue("userId", "U");
          }

          return (
            <Form className="bg-gray-30  p-4 w-[80%] mx-auto ">
              {/* Logo Header  starts  */}

              <div className="my-4 mb-8  text-[#5823B7] flex flex-row  justify-start">
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
                Log in
              </h2>

              <legend className="text-base  text-black/50 py-4">
                {" "}
                Log in with your credentials to take your test.
              </legend>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="userId"
                >
                  {" "}
                  Your ID
                </label>
                <Field
                  className={
                    "outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.userId,
                      "border-red-500/40": errors.userId,
                    })
                  }
                  name="userId"
                  id="userId"
                  type="text"
                  placeholder="U000000"
                />

                <p className="block mb-4  text-xs text-red-500">
                  <ErrorMessage name="userId" />
                </p>
              </div>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className={
                    "outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.password,
                      "border-red-500/40": errors.password,
                    })
                  }
                  name="password"
                  id="password"
                  type="password"
                  placeholder="your password"
                />

                <p className="block mb-2  text-xs text-red-500">
                  <ErrorMessage name="password" />
                </p>
              </div>

              <div className="flex flex-row  space-x-4  py-4">
                <Field
                  className="outline-none  inline-block  align-baseline"
                  name="rememberMe"
                  id="rememberMe"
                  type="checkbox"
                />
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="rememberMe"
                >
                  Keep me signed in
                </label>
              </div>

              <div className="mt-8">
                <input
                  type="submit"
                  value="Log in"
                  disabled={!isValid || isSubmitting || fetching}
                  className={
                    " capitalize bg-[#AE90E9]  transition-colors duration-500 text-white py-3 w-full block my-4 rounded-md " +
                    cn({
                      " opacity-40  cursor-not-allowed":
                        !isValid || isSubmitting || fetching,
                      " hover:bg-[#5823B7]/60 ":
                        !fetching && isValid && !isSubmitting,
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