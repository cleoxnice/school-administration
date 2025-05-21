import { render, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

jest.mock("./components/NavBar/NavBar");

describe("App", () => {
  it("routes to dashboard on first rendering of App", async () => {
    const component = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const welcomeWords = component.getByText(
        "Welcome to the School Administration System",
      );
      expect(welcomeWords).toBeVisible();
    });
  });
  it("displays the nav bar", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(NavBar).toHaveBeenCalled();
  });
});
