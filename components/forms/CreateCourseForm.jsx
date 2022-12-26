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
import uploadFile from "../../lib/uploadFile";

const FILE_SIZE = 1024 * 1024 * 3;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "image/png",
];

const yupSchema = Yup.object().shape({
  courseTitle: Yup.string()
    .required("Fill in course title")
    .min(8, "Too short!")
    .max(64, "Uhm, Too long!")
    .label("Course Title"),
  courseCover: Yup.mixed()
    .required("Upload a cover picture")
    .label("Cover Picture")
    .test(
      "fileSize",
      "File too large (Max. 3MB)",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format (jpg,jpeg,webp and png only!)",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .typeError("Invalid input!"),
});

export default function CreateCourseForm({ close }) {
  const { store, dispatch } = useContext(context);
  const [readerReady, setReaderReady] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(values) {
    // console.log(values);
    setFetching(true);

    // Upload the Cover

    const uploadRes = await uploadFile(values.courseCover);

    if (!uploadRes.success) {
      setError(uploadRes.errorMessage);
      console.log(uploadRes.error);

      setFetching(false);
      return;
    }

    const body = {
      req: {
        auth: {
          token: store.auth.token,
        },
        body: {
          courseCover: uploadRes.data.url,
          courseTitle: values.courseTitle,
          allowPublicContributions: values.allowPublicContributions,
        },
      },
    };

    const res = await RpcRequest("courses.create", body);

    if (res.success) {
      setData(res.data);

      // console.log(res.data);
    } else {
      setError(res.error.message);
      console.log(res.error);
    }

    setFetching(false);
  }

  function handleFile(e, setFieldValue) {
    if (e.target.files.length === 0) {
      setFieldValue(e.target.name, "");
      setReaderReady(false);
    } else {
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        () => {
          setReaderReady(true);
        },
        false
      );

      reader.readAsDataURL(e.target.files[0]);
      setFieldValue("reader", reader);
      setFieldValue(e.target.name, e.target.files[0]);
    }
  }

  return (
    <div className="overflow-y-auto max-h-[800px] pb-24 no-scrollbar">
      {(data || error) && (
        <NotifyCard
          closeOnError={() => setError(null)}
          id={data && data.id}
          error={error}
          sMsg="Course added successfully"
          eMsg="Unable to add course"
          successText="Close"
          successCallback={() => {
            setData(null);  
            close();
          }}
        />
      )}

      <Formik
        initialValues={{
          courseTitle: "",
          allowPublicContributions: true,
          courseCover: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={yupSchema}
      >
        {({ errors, isValid, isSubmitting, values, setFieldValue }) => {
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
                Add a new course
              </h2>

              <legend className="text-base  text-black/50 py-4">
                Fill in the details of the new course.
              </legend>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="courseTitle"
                >
                  Course Title
                </label>
                <Field
                  className={
                    "outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.courseTitle,
                      "border-red-500/40": errors.courseTitle,
                    })
                  }
                  name="courseTitle"
                  id="courseTitle"
                  type="text"
                  placeholder="Technical writing"
                />

                <p className="block mb-4  text-xs text-red-500">
                  <ErrorMessage name="courseTitle" />
                </p>
              </div>

              <div>
                {readerReady && (
                  <div className="relative">
                    <label
                      className="text-xs select-none  text-black/60 font-bold"
                      htmlFor="courseCover"
                    >
                      Cover picture
                    </label>
                    <Image
                      alt="upload"
                      height="300"
                      width="300"
                      className="my-4"
                      src={values.reader && values.reader.result}
                    />

                    <p className="block py-2 text-center text-sm font-normal text-red-500">
                      <ErrorMessage name="courseCover" />
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleFile(
                          {
                            target: {
                              files: [],
                              name: "courseCover",
                            },
                          },
                          setFieldValue
                        );
                      }}
                      className=" absolute top-[20%] right-[12%]  hover:bg-black/30 bg-black/20 transition-colors rounded-lg p-1 "
                    >
                      <i className="bi-x text-xl text-black/80 "></i>
                    </button>
                  </div>
                )}

                {!readerReady && (
                  <>
                    <label
                      className="text-xs select-none  text-black/60 font-bold"
                      htmlFor="courseCover"
                    >
                      Cover Picture
                    </label>

                    <input
                      className={
                        "file:outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60  rounded-md py-2 w-full file:rounded-lg file:px-4 file:py-1 file:border file:border-black/10 file:bg-black/10 shadow border " +
                        cn({
                          " border-black/20 ": !errors.courseCover,
                          " border-red-500/40": errors.courseCover,
                        })
                      }
                      name="courseCover"
                      id="courseCover"
                      onChange={(e) => handleFile(e, setFieldValue)}
                      type="file"
                      accept="image/*"
                    />

                    <p className="block mb-4  text-xs text-red-500">
                      <ErrorMessage name="courseCover" />
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-row  space-x-4  py-4">
                <Field
                  className="outline-none  inline-block  align-baseline"
                  name="allowPublicContributions"
                  id="allowPublicContributions"
                  type="checkbox"
                />
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="allowPublicContributions"
                >
                  Allow public contributions{" "}
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
