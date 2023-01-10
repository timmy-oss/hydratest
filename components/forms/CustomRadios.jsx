import { Field, ErrorMessage } from "formik";

export default function RadioField({
  name,
  label,
  placeholder,
  required = true,
  key,
  type,
  ...props
}) {
  return (
    <div
      key={key || Math.random() + name}
      className="w-full py-2 flex flex-row justify-around  items-center"
    >
      {/* <label
                htmlFor={name}
                className="block text-[#797979] dark:text-white text-sm lg:text-base capitalize"
            >
                {label}
                {required && <span className="text-red-500">*</span>}
            </label> */}
      {props.radios.map((r, i) => (
        <div key={i} className="flex flex-row space-x-2">
          <Field
            id={name + r.name}
            value={r.value}
            type="radio"
            className=" w-[15px]  mt-2 cursor-pointer   border-[#797979] dark:border-white"
            title={"Choose " + r.name}
            name={name}
          />
          <label
            className="text-black/60 dark:text-white mt-2 text-sm  capitalize"
            htmlFor={name + r.name}
          >
            {r.name}
          </label>
        </div>
      ))}
      {props.choices}
      {/* The Field itself  */}
      {/* <span className="mt-1 text-xs lg:text-sm block text-red-500">
                <ErrorMessage name={name} />
            </span> */}
    </div>
  );
}
