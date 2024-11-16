import React from "react";

function ProgressBar({ totalLength, totalPoints, index, score, answer }) {
  return (
    <>
      <progress
        max={totalLength}
        value={index + Number(answer !== null)}
      ></progress>
      <div className="progress">
        <p>
          <strong>{index}</strong>/{totalLength}
        </p>
        <p>
          <strong>{score}</strong>/{totalPoints}
        </p>
      </div>
    </>
  );
}

export default ProgressBar;
