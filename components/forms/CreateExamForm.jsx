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
  examTitle: Yup.string()
    .required("Fill in exam title")
    .min(8, "Too short!")
    .max(64, "Uhm, Too long!")
    .label("Exam Title"),

  courseId: Yup.string()
    .min(8, "Invalid course ID")
    .required("Select a course")
    .label("Course"),

  numberOfQuestions: Yup.number()
    .integer("Whole numbers only")
    .positive("Negative numbers are not allowed")
    .min(5, "Too small!")
    .max(100, "Too much!")
    .typeError("Numbers only!")
    .label("Number of Questions")
    .required("Fill in number of questions"),

  timeAllowed: Yup.number()
    .integer("Whole numbers only")
    .positive("Negative numbers are not allowed")
    .min(2, "Too small!")
    .max(3600, "Too much!")
    .typeError("Numbers only!")
    .label("Time Allowed")
    .required("Fill in the time allowed"),
});

const options = [
  {
    name: "Economics",
    value: "utw7t3g8ug3",
  },
  {
    name: "Mathematics",
    value: "6t38gyuevc",
  },

  {
    name: "English Language",
    value: "7tiugvs",
  },
  {
    name: "Geography",
    value: "g76r78gi",
  },
];

export default function CreateExamForm({ close }) {
  const { store, dispatch } = useContext(context);
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

    const res = await RpcRequest("exams.create", body);

    if (res.success) {
      setData(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  return (
    <div className="overflow-y-auto max-h-[800px] pb-24 no-scrollbar">
      {(data || error) && (
        <NotifyCard
          closeOnError={() => setError(null)}
          id={data && data.id}
          error={error}
          sMsg="Exam added successfully"
          eMsg="Unable to add exam."
          successText="Close"
          successCallback={() => {
            setData(null);
            close();
          }}
        />
      )}

      <Formik
        initialValues={{
          examTitle: "",
          courseId: "",
          instantResult: true,
          numberOfQuestions: "",
          timeAllowed: "",
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
                Add a new exam
              </h2>

              <legend className="text-base  text-black/50 py-4">
                Fill in the details of the new exam.
              </legend>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="examTitle"
                >
                  Title
                </label>
                <Field
                  className={
                    "outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.examTitle,
                      "border-red-500/40": errors.examTitle,
                    })
                  }
                  name="examTitle"
                  id="examTitle"
                  type="text"
                  placeholder="Name of exam"
                />

                <p className="block mb-4  text-xs text-red-500">
                  <ErrorMessage name="examTitle" />
                </p>
              </div>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="courseId"
                >
                  Course
                </label>

                <CustomSelect
                  currentValue={values.courseId}
                  name="courseId"
                  options={options}
                  setValue={(v) => setFieldValue("courseId", v)}
                  error={errors.courseId}
                  auth={auth}
                />
              </div>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="numberOfQuestions"
                >
                  Number of Questions
                </label>
                <Field
                  className={
                    "outline-none block  text-center p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.numberOfQuestions,
                      "border-red-500/40": errors.numberOfQuestions,
                    })
                  }
                  name="numberOfQuestions"
                  id="numberOfQuestions"
                  type="text"
                  placeholder="How many questions"
                />

                <p className="block mb-4  text-xs text-red-500">
                  <ErrorMessage name="numberOfQuestions" />
                </p>
              </div>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="timeAllowed"
                >
                  Time Allowed
                </label>
                <Field
                  className={
                    "outline-none block text-center p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.timeAllowed,
                      "border-red-500/40": errors.timeAllowed,
                    })
                  }
                  name="timeAllowed"
                  id="timeAllowed"
                  type="text"
                  placeholder="Time in minutes"
                />

                <p className="block mb-4  text-xs text-red-500">
                  <ErrorMessage name="timeAllowed" />
                </p>
              </div>

              <div className="flex flex-row  space-x-4  py-4">
                <Field
                  className="outline-none  inline-block  align-baseline"
                  name="instantResult"
                  id="instantResult"
                  type="checkbox"
                />
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="instantResult"
                >
                  Show exam results instantly
                </label>
              </div>

              <div className="mt-8">
                <input
                  type="submit"
                  value="Create"
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
