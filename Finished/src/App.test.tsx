import ReactDOM from "react-dom";
import App from "./main-page";
import { render, screen, waitFor } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("header text is present", () => {
  render(<App />);

  expect(
    screen.getByText("providing houses all over the world", { exact: false })
  ).toBeInTheDocument();
});

it("country select is present", () => {
  render(<App />);

  expect(screen.getByTestId("countryselect")).toBeInTheDocument();
});

it("Featured house is present", async () => {
  render(<App />);
  const featuredHouse = await waitFor(() =>
    screen.getByTestId("featuredhouse")
  );
  expect(featuredHouse).toBeInTheDocument();
});
