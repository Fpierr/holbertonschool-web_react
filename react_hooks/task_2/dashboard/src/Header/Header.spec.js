import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";
import Header from "./Header.jsx";
import newContext, { user as defaultUser } from "../Context/context";
import React from "react";

test("renders logo and header title", () => {
  render(
    <newContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
      <Header />
    </newContext.Provider>
  );

  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 1, name: /School dashboard/i })
  ).toBeInTheDocument();
});

test("does not render logoutSection with default context", () => {
  render(
    <newContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
      <Header />
    </newContext.Provider>
  );

  const logoutSection = screen.queryByText(/logout/i);
  expect(logoutSection).not.toBeInTheDocument();
});

test("renders logoutSection when user is logged in", () => {
  const loggedInUser = {
    email: "user@test.com",
    password: "password123",
    isLoggedIn: true,
  };

  render(
    <newContext.Provider value={{ user: loggedInUser, logOut: jest.fn() }}>
      <Header />
    </newContext.Provider>
  );

  const logoutSection = screen.getByText(/logout/i);
  expect(logoutSection).toBeInTheDocument();
  expect(screen.getByText(/Welcome user@test.com/i)).toBeInTheDocument();
});

test("clicking logout calls logOut function", () => {
  const loggedInUser = {
    email: "user@test.com",
    password: "password123",
    isLoggedIn: true,
  };
  const logOutSpy = jest.fn();

  render(
    <newContext.Provider value={{ user: loggedInUser, logOut: logOutSpy }}>
      <Header />
    </newContext.Provider>
  );

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(logOutSpy).toHaveBeenCalled();
});
