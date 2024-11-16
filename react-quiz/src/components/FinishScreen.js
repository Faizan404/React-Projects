import React from "react";

function FinishScreen({ score, totalScore, highScore, dispatch }) {
  const progressInPercents = (score / totalScore) * 100;
  let emoji;
  if (progressInPercents === 100) emoji = "🥇";
  if (progressInPercents >= 80 && progressInPercents < 100) emoji = "🥈";
  if (progressInPercents >= 50 && progressInPercents < 80) emoji = "🥉";
  if (progressInPercents < 50) emoji = "👍";
  if (progressInPercents === 0) emoji = "😒";

  return (
    <>
      <p className="result">
        <span>
          {emoji} You score <strong>{score}</strong> out of {totalScore} (
          {Math.ceil(progressInPercents)}%)
        </span>
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({type: 'resetQuiz'})}>Reset Quiz</button>
    </>
  );
}

export default FinishScreen;
