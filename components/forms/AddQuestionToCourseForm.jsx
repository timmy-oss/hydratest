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
import CustomSelect from "./CustomSelectField";
import CustomRadios from "./CustomRadios";

const FILE_SIZE = 1024 * 1024 * 3;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "image/png",
];

const questionTypes = [
  {
    name: "Objective",
    value: "objective",
  },
  {
    name: "Germane",
    value: "germane",
  },
];

const correctOptionRadios = [
  {
    name: "A",
    value: "a",
  },
  {
    name: "B",
    value: "b",
  },
  {
    name: "C",
    value: "c",
  },
  {
    name: "D",
    value: "d",
  },
];

const baseSchema = {
  questionType: Yup.string()
    .trim()
    .required("Select a question type")
    .oneOf(["objective", "germane"])
    .label("Question Type"),

  questionContent: Yup.string()
    .trim()
    .required("Fill in the question text")
    .label("Question Content")
    .min(8, "Too small!")
    .max(512, "Too long, rephrase it"),

  illustration: Yup.mixed()
    .label("Illustration")
    .test("fileSize", "File too large (Max. 3MB)", (value) => {
      if (!value) return true;

      return value && value.size <= FILE_SIZE;
    })
    .test(
      "fileFormat",
      "Unsupported Format (jpg,jpeg,webp and png only!)",
      (value) => {
        if (!value) return true;

        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    )
    .typeError("Invalid input!"),
};

const objQuestionSchemaExtension = {
  correctOption: Yup.string()
    .trim()
    .oneOf(["a", "b", "c", "d"])
    .required("Select the correct option")
    .label("Correct Option"),

  optionA: Yup.string()
    .trim()
    .min(1, "Too small!")
    .max(512, "Too long, rephrase it")
    .required("Fill in the option")
    .label("Option A"),

  optionB: Yup.string()
    .trim()
    .min(1, "Too small!")
    .max(512, "Too long, rephrase it")
    .required("Fill in the option")
    .label("Option B"),
  optionC: Yup.string()
    .trim()
    .min(1, "Too small!")
    .max(512, "Too long, rephrase it")
    .required("Fill in the option")
    .label("Option C"),
  optionD: Yup.string()
    .trim()
    .min(1, "Too small!")
    .max(512, "Too long, rephrase it")
    .required("Fill in the option")
    .label("Option D"),
};

const germaneQuestionSchemaExtension = {
  answer: Yup.string()
    .trim()
    .min(1, "Too small!")
    .max(512, "Too long, rephrase it")
    .required("Fill in the answer")
    .label("Answer"),
};

export default function AddOrEditQuestionToCourseForm({
  close,
  course,
  editParams,
}) {
  const { store } = useContext(context);
  const [readerReady, setReaderReady] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [schemaCombination, setSchemaCombination] = useState(0);

  let initialValues;

  if (editParams.show) {
    const q = editParams.question;
    initialValues = {
      questionType: q.question_type,
      questionContent: q.question_content,
      answer: q.answer || "",
      optionA: q.option_A || "",
      optionB: q.option_B || "",
      optionC: q.option_C || "",
      optionD: q.option_D || "",
      correctOption: q.correct_option || "",
      lockQuestion: q.lock_question,
      illustrationUrl: q.illustration || "",
      illustration: "",
    };
  } else {
    initialValues = {
      questionType: "objective",
      questionContent: "",
      answer: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "a",
      lockQuestion: false,
      illustration: "",
    };
  }

  let yupSchema = Yup.object().shape(
    schemaCombination === 0
      ? baseSchema
      : schemaCombination === 1
      ? { ...baseSchema, ...objQuestionSchemaExtension }
      : schemaCombination === 2
      ? { ...baseSchema, ...germaneQuestionSchemaExtension }
      : baseSchema
  );

  if (initialValues.questionType === "germane" && schemaCombination === 0) {
    yupSchema = Yup.object().shape({
      ...baseSchema,
      ...germaneQuestionSchemaExtension,
    });
  } else if (schemaCombination === 0) {
    yupSchema = Yup.object().shape({
      ...baseSchema,
      ...objQuestionSchemaExtension,
    });
  }

  async function handleSubmit(values) {
    // console.log(values);
    setFetching(true);

    // Upload the Cover

    let uploadRes = null;
    if (values.illustration) {
      uploadRes = await uploadFile(values.illustration);

      if (!uploadRes.success) {
        setError(uploadRes.errorMessage);
        console.log(uploadRes.error);

        setFetching(false);
        return;
      }
    }

    const body = {
      req: {
        auth: {
          token: store.auth.token,
        },
        body: {
          course: course.id,
          questionId: editParams.show && editParams.question.id,
          questionType: values.questionType || null,
          questionContent: values.questionContent || null,
          answer: values.answer || null,
          correctOption: values.correctOption || null,
          optionA: values.optionA || null,
          optionB: values.optionB || null,
          optionC: values.optionC || null,
          optionD: values.optionD || null,
          lockQuestion: values.lockQuestion,
          illustration: editParams.show
            ? values.illustrationUrl
            : uploadRes && uploadRes.data.url,
        },
      },
    };

    let res;
    if (editParams.show) {
      res = await RpcRequest("courses.edit_question", body);
    } else {
      res = await RpcRequest("courses.add_question", body);
    }

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
          sMsg={
            editParams.show
              ? "Question updated successfully"
              : "Question added successfully"
          }
          eMsg={
            editParams.show
              ? "Unable to update question"
              : "Unable to add question"
          }
          successText="Close"
          successCallback={() => {
            setData(null);
            close();
          }}
        />
      )}

      <Formik
        initialValues={initialValues}
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
                {editParams.show ? "Update question" : "Add a new question"}
              </h2>

              <legend className="text-base  text-black/50 py-4">
                {editParams.show
                  ? "Edit the details of the question below."
                  : "Fill in the details of the new question."}
              </legend>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="questionType"
                >
                  Question Type
                </label>
                <CustomSelect
                  defaultValue={{
                    name: values.questionType,
                    value: values.questionType,
                  }}
                  showNullOption={false}
                  auth={store.auth}
                  currentValue={values.questionType}
                  name="questionType"
                  error={errors.questionType}
                  setValue={(v) => {
                    if (v === "objective" && schemaCombination !== 1) {
                      setSchemaCombination(1);
                    }

                    if (v === "germane" && schemaCombination !== 2) {
                      setSchemaCombination(2);
                    }

                    setFieldValue("questionType", v);
                  }}
                  params={{
                    data: questionTypes,
                    nameKey: "name",
                    valueKey: "value",
                  }}
                />
              </div>

              <div>
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="questionContent"
                >
                  Question Content
                  {values.questionType === "germane" && (
                    <span className="text-xs block pt-1 font-normal text-blue-500">
                      Use '%#' as a placeholder for when an answer box should
                      appear within the question.
                    </span>
                  )}
                </label>
                <Field
                  as="textarea"
                  className={
                    "outline-none block resize-none p-4 h-[100px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                    cn({
                      " border-black/20 ": !errors.questionContent,
                      "border-red-500/40": errors.questionContent,
                    })
                  }
                  name="questionContent"
                  id="questionContent"
                  type="text"
                  placeholder="Type in the question text"
                />

                <p className="block mb-4  text-xs text-red-500">
                  <ErrorMessage name="questionContent" />
                </p>
              </div>

              {values.questionType === "objective" &&
                ["A", "B", "C", "D"].map((l, i) => (
                  <div key={i}>
                    <label
                      className="text-xs select-none text-black/60 font-bold"
                      htmlFor={"option" + l}
                    >
                      Option {l}
                    </label>
                    <Field
                      className={
                        "outline-none block resize-none p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                        cn({
                          " border-black/20 ": !errors["option" + l],
                          "border-red-500/40": errors["option" + l],
                        })
                      }
                      name={"option" + l}
                      id={"option" + l}
                      type="text"
                      placeholder={"Type in option " + l}
                    />

                    <p className="block mb-4  text-xs text-red-500">
                      <ErrorMessage name={"option" + l} />
                    </p>
                  </div>
                ))}

              {values.questionType === "objective" && (
                <div>
                  <label
                    className="text-xs select-none text-black/60 font-bold"
                    htmlFor="correctOption"
                  >
                    Correct Option
                  </label>

                  <CustomRadios
                    radios={correctOptionRadios}
                    label="Correct Option"
                    name="correctOption"
                    type="radio"
                    required
                  />

                  <p className="block mb-4  text-xs text-red-500">
                    <ErrorMessage name="correctOption" />
                  </p>
                </div>
              )}

              {values.questionType === "germane" && (
                <div>
                  <label
                    className="text-xs select-none text-black/60 font-bold"
                    htmlFor="answer"
                  >
                    Answer
                  </label>
                  <Field
                    className={
                      "outline-none block resize-none p-4 h-[50px] px-6 text-sm my-4  text-black/60 border rounded-md py-2 w-full border-black/20 " +
                      cn({
                        " border-black/20 ": !errors.answer,
                        "border-red-500/40": errors.answer,
                      })
                    }
                    name="answer"
                    id="answer"
                    type="text"
                    placeholder="Type in the answer"
                  />

                  <p className="block mb-4  text-xs text-red-500">
                    <ErrorMessage name="answer" />
                  </p>
                </div>
              )}

              <div>
                {(readerReady || values.illustrationUrl) && (
                  <div className="relative">
                    <label
                      className="text-xs select-none  text-black/60 font-bold"
                      htmlFor="illustration"
                    >
                      Illustration
                    </label>
                    <Image
                      alt="upload"
                      height="300"
                      width="300"
                      className="my-4"
                      src={
                        (values.reader && values.reader.result) ||
                        values.illustrationUrl
                      }
                    />

                    <p className="block py-2 text-center text-sm font-normal text-red-500">
                      <ErrorMessage name="illustration" />
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (values.illustrationUrl) {
                          setFieldValue("illustrationUrl", "");
                          return;
                        }
                        handleFile(
                          {
                            target: {
                              files: [],
                              name: "illustration",
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

                {!readerReady && !values.illustrationUrl && (
                  <>
                    <label
                      className="text-xs select-none  text-black/60 font-bold"
                      htmlFor="illustration"
                    >
                      Illustration (optional)
                      <span className="text-xs block pt-1 font-normal text-blue-500">
                        {" "}
                        Only include an illustration if the question references
                        it{" "}
                      </span>
                    </label>

                    <input
                      className={
                        "file:outline-none block  p-4 h-[50px] px-6 text-sm my-4  text-black/60  rounded-md py-2 w-full file:rounded-lg file:px-4 file:py-1 file:border file:border-black/10 file:bg-black/10 shadow border " +
                        cn({
                          " border-black/20 ": !errors.illustration,
                          " border-red-500/40": errors.illustration,
                        })
                      }
                      name="illustration"
                      id="illustration"
                      onChange={(e) => handleFile(e, setFieldValue)}
                      type="file"
                      accept="image/*"
                    />

                    <p className="block mb-4  text-xs text-red-500">
                      <ErrorMessage name="illustration" />
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-row  space-x-4  py-4">
                <Field
                  className="outline-none  inline-block  align-baseline"
                  name="lockQuestion"
                  id="lockQuestion"
                  type="checkbox"
                />
                <label
                  className="text-xs select-none text-black/60 font-bold"
                  htmlFor="lockQuestion"
                >
                  Lock question (only you can edit this question)
                </label>
              </div>

              <div className="mt-8">
                <input
                  type="submit"
                  value={editParams.show ? "Update" : "Create"}
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
