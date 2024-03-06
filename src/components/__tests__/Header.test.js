import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


it("Should render Header Component With a login button", () => {

  render(
  <BrowserRouter>
  <Provider store = {appStore}>
  <Header />
  </Provider>
  </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", {name: "Login"});

  // const loginButton = screen.getByText("Login");

  expect(loginButton).toBeInTheDocument();
});


it("Should render Header Component With a Cart Item 0", () => {

  render(
  <BrowserRouter>
  <Provider store = {appStore}>
  <Header />
  </Provider>
  </BrowserRouter>
  );

  const cartItem = screen.getByText("Cart - (0 items)");

  // const loginButton = screen.getByText("Login");

  expect(cartItem).toBeInTheDocument();
});


it("Should render Header Component With a Cart", () => {

  render(
  <BrowserRouter>
  <Provider store = {appStore}>
  <Header />
  </Provider>
  </BrowserRouter>
  );

  const cartItem = screen.getByText(/Cart/);


  expect(cartItem).toBeInTheDocument();
});


it("Should change Login Button to Logout onClick", () => {

  render(
  <BrowserRouter>
  <Provider store = {appStore}>
  <Header />
  </Provider>
  </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", {name: "Login"});

  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole("button", {name: "Logout"});

  expect(logoutButton).toBeInTheDocument();
});

