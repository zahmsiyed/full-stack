import React, { useEffect, useState } from "react";
import CounterDisplay from "./CounterDisplay";
import CounterControls from "./CounterControls";

function CounterPage() {
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (counter > 5) {
      setMessage("Counter is greater than 5.");
    } else {
      setMessage("");
    }
  }, [counter]);

  useEffect(() => {
    if (counter < 0) {
      setCounter(0);
    }
  }, [counter]);

  const increment = () => {
    setCounter((currentCounter) => currentCounter + 1);
  };

  const decrement = () => {
    setCounter((currentCounter) => currentCounter - 1);
  };

  return (
    <section className="counter-page">
      <CounterDisplay counter={counter} />
      <CounterControls increment={increment} decrement={decrement} />
      {message && <p className="counter-message">{message}</p>}
    </section>
  );
}

export default CounterPage;
