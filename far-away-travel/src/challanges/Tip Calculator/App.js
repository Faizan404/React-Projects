import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [myTip, setMyTip] = useState(0);
  const [friendsTip, setFriendsTip] = useState(0);

  function handleBill(e) {
    setBill(() => e.target.value);
  }

  function handleMyTip(e) {
    setMyTip(() => e.target.value);
  }

  function handleFriendsTip(e) {
    setFriendsTip(() => e.target.value);
  }

  function handleReset() {
    setBill(0);
    setMyTip(0);
    setFriendsTip(0);
  }

  return (
    <div>
      <Bill bill={bill} onAddBill={handleBill} />
      <Tip tip={myTip} onAddTip={handleMyTip}>
        How did you like the service?
      </Tip>
      <Tip tip={friendsTip} onAddTip={handleFriendsTip}>
        How did your friend like the service?
      </Tip>
      <Result bill={bill} myTip={myTip} friendsTip={friendsTip} />
      <Reset onReset={handleReset} />
    </div>
  );
}

function Bill({ bill, onAddBill }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input type="number" value={bill} onChange={onAddBill} />
    </div>
  );
}
function Tip({ tip, onAddTip, children }) {
  return (
    <div>
      <span>{children}</span>
      <select value={tip} onChange={onAddTip}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutly amazing! (20%)</option>
      </select>
    </div>
  );
}
function Result({ bill, myTip, friendsTip }) {
  const tipAvg =
    (Number(bill) * (Number(myTip) + Number(friendsTip))) / 2 / 100;
  const totalBill = Number(bill) + tipAvg;
  return (
    <h4>
      You pay ${totalBill} (${bill ? bill : "0"} + ${tipAvg} tip)
    </h4>
  );
}
function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
