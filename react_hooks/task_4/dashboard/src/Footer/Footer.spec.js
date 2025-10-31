import { render, screen } from "@testing-library/react";
import { expect, test, jest } from "@jest/globals";
import Footer from "./Footer.jsx";
import newContext, { user as defaultUser } from "../Context/context";

test("renders copyright text", () => {
  render(
    <newContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
      <Footer />
    </newContext.Provider>
  );

  const footerText = screen.getByText(/Copyright/i);
  expect(footerText).toBeInTheDocument();
});

test('displays "Contact us" when user is logged out', () => {
  const loggedOutUser = {
    email: "",
    password: "",
    isLoggedIn: false,
  };

  render(
    <newContext.Provider value={{ user: loggedOutUser, logOut: jest.fn() }}>
      <Footer />
    </newContext.Provider>
  );

  const contactLink = screen.getByText(/Contact us/i);
  expect(contactLink).toBeInTheDocument();
});

test('displays welcome message when user is logged in', () => {
  const loggedInUser = {
    email: "user@test.com",
    password: "password123",
    isLoggedIn: true,
  };

  render(
    <newContext.Provider value={{ user: loggedInUser, logOut: jest.fn() }}>
      <Footer />
    </newContext.Provider>
  );

  const welcomeMessage = screen.getByText(/Welcome user@test.com/i);
  const logoutLink = screen.getByText(/Logout/i);

  expect(welcomeMessage).toBeInTheDocument();
  expect(logoutLink).toBeInTheDocument();
});
