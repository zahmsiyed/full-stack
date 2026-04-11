import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

function renderApp(initialEntries = ["/home"]) {
  return render(
    <ThemeProvider>
      <MemoryRouter
        initialEntries={initialEntries}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>
    </ThemeProvider>
  );
}

test("renders the home page content", () => {
  renderApp();

  expect(
    screen.getByRole("heading", { name: /welcome home/i })
  ).toBeInTheDocument();
  expect(
    screen.getByText((content, element) => {
      return element?.textContent === "Current theme: light";
    })
  ).toBeInTheDocument();
});

test("toggles the theme from the navbar", async () => {
  renderApp();

  await userEvent.click(
    screen.getByRole("button", { name: /switch to dark mode/i })
  );

  expect(
    screen.getByText((content, element) => {
      return element?.textContent === "Current theme: dark";
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /switch to light mode/i })
  ).toBeInTheDocument();
});

test("prevents the counter from going below zero", async () => {
  renderApp(["/counter"]);

  await userEvent.click(screen.getByRole("button", { name: /decrease/i }));

  expect(screen.getByText(/counter: 0/i)).toBeInTheDocument();
});

test("shows a message after the counter exceeds five", async () => {
  renderApp(["/counter"]);

  for (let index = 0; index < 6; index += 1) {
    await userEvent.click(screen.getByRole("button", { name: /increase/i }));
  }

  expect(
    screen.getByText(/counter is greater than 5\./i)
  ).toBeInTheDocument();
});
