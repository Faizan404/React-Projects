import { useState } from "react";

export default function App() {
  return <Counter />;
}

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const date = new Date("Sep 5 2024");
  date.setDate(date.getDate() + count);

  function handleRange(e) {
    setStep((s) => +e.target.value);
  }

  return (
    <div>
      <div style={{ margin: "0 auto", display: "flex", width: "fit-content" }}>
        <input type="range" min={1} value={step} onChange={handleRange} />
        <span>{step}</span>
        {/* <button onClick={() => setStep((s) => s - 1)}>-</button>
        <p>Step : {step}</p>
        <button onClick={() => setStep((s) => s + 1)}>+</button> */}
      </div>

      <div style={{ margin: "0 auto", display: "flex", width: "fit-content" }}>
        <button onClick={() => setCount((c) => c - Math.abs(step))}>-</button>
        <input
          type="number"
          min={0}
          value={count}
          onChange={(e) => setCount(() => +e.target.value)}
        />
        {/* <p>Count : {count}</p> */}
        <button onClick={() => setCount((c) => c + Math.abs(step))}>+</button>
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from Today is `
            : `${Math.abs(count)} days was ago `}
        </span>
        <span>{date.toDateString()}</span>
      </div>
    </div>
  );
}
