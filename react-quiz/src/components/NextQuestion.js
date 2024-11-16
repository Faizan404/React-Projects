import React from "react";

function NextQuestion({ dispatch, answer, totalLength, index }) {
  if (answer === null) return null;

  const btnStatus =
    index === totalLength - 1
      ? { content: "Finish", type: "finishQuiz" }
      : { content: "Next", type: "nextQuestion" };
      
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: btnStatus.type })}>
      {btnStatus.content}
    </button>
  );
}

export default NextQuestion;
