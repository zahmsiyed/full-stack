import React from "react";

function CounterControls({ increment, decrement }) {
  return (
    <div className="counter-controls">
      <button type="button" onClick={increment}>
        Increase
      </button>
      <button type="button" onClick={decrement}>
        Decrease
      </button>
    </div>
  );
}

export default CounterControls;
