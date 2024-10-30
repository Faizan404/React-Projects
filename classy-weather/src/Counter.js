import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
  }

  handleDecrement() {
    this.setState((c) => ({ count: c.count - 1 }));
  }

  handleIncrement() {
    this.setState((c) => ({ count: c.count + 1 }));
  }

  render() {
    const date = new Date("october 30 2024");
    date.setDate(date.getDate() + this.state.count);
    return (
      <>
        <button onClick={this.handleDecrement.bind(this)}>-</button>
        <span>{date.toDateString()}</span>
        <button onClick={this.handleIncrement.bind(this)}>+</button>
      </>
    );
  }
}

export default Counter;
