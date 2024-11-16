import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished,
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highScore: 0,
  secondsRemaning: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaning: state.questions.length * 30
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload.ans,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finish",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "resetQuiz":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        score: 0,
      };
    case "tick":
      return {
        ...state,
        secondsRemaning: state.secondsRemaning - 1,
        status: state.secondsRemaning === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [
    { questions, status, index, answer, score, highScore, secondsRemaning },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalLength = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    (async function () {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const questionsList = await res.json();
        dispatch({ type: "dataRecived", payload: questionsList });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    })();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen totalLength={totalLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              answer={answer}
              totalLength={totalLength}
              totalPoints={totalPoints}
              index={index}
              score={score}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaning={secondsRemaning} />
              
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                totalLength={totalLength}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            score={score}
            totalScore={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
