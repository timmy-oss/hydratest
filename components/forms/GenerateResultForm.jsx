import Image from "next/image";
import { useContext } from "react";
import * as Yup from "yup";
import { Form, Field, Formik, ErrorMessage } from "formik";
import cn from "classnames";
import FormLoader from "./FormLoader";
import { useState } from "react";
import { RpcRequest } from "../../lib/rpc";
import { context } from "../../store/Provisioner";
import { NotifyCard } from "./SignUpForm";
import CustomSelect from "./CustomSelectField";

const yupSchema = Yup.object().shape({
  sessionKey: Yup.string().min(4).required("Choose a session").label("Session"),
});

export default function GenerateResultForm({ close }) {
  const { store } = useContext(context);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { auth } = store;

  async function handleSubmit(values) {
    // console.log(values);
    setFetching(true);

    const body = {
      req: {
        auth: {
          token: auth.token,
        },
        body: {
          ...values,
        },
      },
    };

    const res = await RpcRequest("results.generate", body);

    if (res.success) {
      setData(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  return (
    <div className="overflow-y-auto  pb-36 no-scrollbar">
      {(data || error) && (
        <NotifyCard
          closeOnError={() => setError(null)}
          id={data && data.id}
          error={error}
          sMsg="Result generated successfully."
          eMsg="Unable to generate result."
          successText="Close"
          successCallback={() => {
            setData(null);
            close();
          }}
        />
      )}

      <Formik
        initialValues={{
          sessionKey: "",
          isRegenerated: false,
          generatePdf: false,
        }}
        onSubmit={handleSubmit}
        validationSchema={yupSchema}
      >
        {({ errors, isValid, isSubmitting, values, setFieldValue }) => {
          // console.log(errors);
          return (
            <Form className="bg-gray-30   p-4 w-[80%] mx-auto ">
              {/* Logo Header  starts  */}

              <div className="mt-2   text-[#5823B7] flex flex-row  justify-start">
                <Image
                  priority
                  src="/assets/hydratest.png"
                  alt="logo"
                  className="object-contain"
                  width="120"
                  height="120"
                />
                <h1 className="font-black self-center text-2xl inline-block">
                  HydraTest{" "}
                </h1>
              </div>

              {/* Logo Header ends  */}

              <FormLoader active={fetching} />

              <h2 className="text-xl font-bold  text-left text-black/80">
                {" "}
                Generate an exam result
              </h2>

              <legend className="text-base  text-black/50 py-4">
                Choose one of the exams you took recently to generate its result
              </legend>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="sessionKey"
                >
                  Recent sessions
                </label>

                <CustomSelect
                  currentValue={values.sessionKey}
                  name="session"
                  setValue={(v) => setFieldValue("sessionKey", v)}
                  error={errors.sessionKey}
                  auth={auth}
                  params={{
                    rpcMethod: "results.get_pending_results",
                    nameKey: "name",
                    valueKey: "key",
                  }}
                />
              </div>

              <div className="flex flex-row  space-x-4  py-4">
                <Field
                  className="outline-none  inline-block  align-baseline"
                  name="generatePdf"
                  id="generatePdf"
                  type="checkbox"
                />
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="generatePdf"
                >
                  Generate PDF
                </label>
              </div>

              <div className="mt-8">
                <input
                  type="submit"
                  value="Proceed"
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

              <div className="mt-2">
                <button
                  onClick={(e) => {
                    if (!isSubmitting && !fetching) {
                      close();
                    }
                  }}
                  type="button"
                  disabled={isSubmitting && fetching}
                  className={
                    " capitalize  border border-[#AE90E9]  transition-colors duration-500  bg-white text-[#5823B7] py-3 w-full block my-4 rounded-md " +
                    cn({
                      " opacity-40 cursor-not-allowed":
                        isSubmitting || fetching,
                      " hover:bg-[#5823B7]/20 transition-all duration-300 ":
                        !isSubmitting && !fetching,
                    })
                  }
                  role="button"
                >
                  {" "}
                  Close{" "}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
