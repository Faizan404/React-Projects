import React, { useEffect } from "react";

function Timer({ dispatch, secondsRemaning }) {
  const min = Math.round(secondsRemaning / 60);
  const sec = secondsRemaning % 60;

  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "tick" }), 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <button className="btn btn-ui timer">
      {min >= 10 ? "" : "0"}
      {min}:{sec >= 10 ? "" : "0"}
      {sec}
    </button>
  );
}

export default Timer;
