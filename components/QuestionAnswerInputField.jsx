import { useState } from "react";

export default function QuestionAnswerInputField({
  response,
  setResponse,
  question,
  ...props
}) {
  const [answer, setAnswer] = useState(response && response.answer);
  function handleAnswerFieldChange(e) {
    const v = e.target.value;

    if (v !== response) {
      if (v.length <= 128) {
        setAnswer(v);
        setResponse({
          answer: v,
          qid: question.id,
        });
      }
    }
  }

  return (
    <span className=" inline-block w-[150px] mr-4 relative bottom-1">
      <input
        onChange={handleAnswerFieldChange}
        value={answer || ""}
        spellCheck
        autoFocus
        placeholder="Type answer"
        inputMode="text"
        className={
          "outline-none inline-block bg-gray-100s text-lg  w-full  disabled:opacity-40 disabled:cursor-not-allowed   pl-4 pr-2 pt-2 pb-1  border-0 border-b-2    border-black/60  caret-black/30  text-left  placeholder:text-black/30 placeholder:font-normal  placeholder:text-sm  placeholder:text-left caret:text-black/60  text-black/80     "
        }
      />
    </span>
  );
}
