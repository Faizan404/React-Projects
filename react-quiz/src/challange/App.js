import React, { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  openAccount: false,
  loanStatus: false,
};

const DEPOSIT_AMOUNT = 150;
const WIDRAW_AMOUNT = 50;
const LOAN_AMOUNT = 5000;

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        openAccount: action.payload,
        balance: state.balance + DEPOSIT_AMOUNT,
      };
    case "depositAmount":
      return { ...state, balance: state.balance + DEPOSIT_AMOUNT };
    case "widrawAmount":
      return {
        ...state,
        balance:
          state.balance >= 50 ? state.balance - WIDRAW_AMOUNT : state.balance,
      };
    case "requestLoan":
      return {
        ...state,
        balance: state.loanStatus ? state.balance : state.balance + LOAN_AMOUNT,
        loan: LOAN_AMOUNT,
        loanStatus: true,
      };
    case "payLoan":
      const isAmountSufficient = state.balance >= LOAN_AMOUNT;
      return {
        ...state,
        balance: isAmountSufficient
          ? state.balance - LOAN_AMOUNT
          : state.balance,
        loan: isAmountSufficient ? state.loan - LOAN_AMOUNT : state.loan,
      };
    case "closeAccount":
      return { ...initialState };

    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>useReducer Bank Account</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            marginBottom: "2rem",
            fontSize: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ marginBottom: "1rem" }}>
            <strong>Balance:</strong> {state.balance} 💶
          </span>
          <span>
            <strong>Loan:</strong> {state.loan} 💶
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            style={{
              cursor: "pointer",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
            disabled={state.openAccount}
            onClick={() => dispatch({ type: "openAccount", payload: true })}
          >
            Open Account
          </button>
          <button
            onClick={() => dispatch({ type: "depositAmount" })}
            disabled={!state.openAccount}
            type="button"
            style={{
              cursor: "pointer",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
          >
            Deposit 150
          </button>
          <button
            onClick={() => dispatch({ type: "widrawAmount" })}
            disabled={!state.openAccount}
            type="button"
            style={{
              cursor: "pointer",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
          >
            Withdraw 50
          </button>
          <button
            onClick={() => dispatch({ type: "requestLoan" })}
            disabled={!state.openAccount}
            type="button"
            style={{
              cursor: "pointer",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
          >
            Request Loan of 5000
          </button>
          <button
            onClick={() => dispatch({ type: "payLoan" })}
            disabled={!state.openAccount}
            type="button"
            style={{
              cursor: "pointer",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
          >
            Pay Loan
          </button>
          <button
            onClick={() => dispatch({ type: "closeAccount" })}
            disabled={!state.openAccount}
            type="button"
            style={{
              cursor: "pointer",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
          >
            Close Account
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
