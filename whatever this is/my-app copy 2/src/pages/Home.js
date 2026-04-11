import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Home() {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  return (
    <section
      className={`home-page ${isDarkTheme ? "home-page-dark" : "home-page-light"}`}
    >
      <p className="home-eyebrow">Theme-aware demo</p>
      <h1>Welcome Home</h1>
      <p className="home-copy">
        This app includes a shared theme toggle and a counter page with guarded
        state updates.
      </p>
      <p className="home-status">
        Current theme: <strong>{theme}</strong>
      </p>
    </section>
  );
}

export default Home;
