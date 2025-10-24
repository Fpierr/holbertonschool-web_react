import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import Footer from "./Footer.jsx";
import { getCurrentYear, getFooterCopy } from "../utils/utils";

test("Render the text p element in app-footer", () => {
  render(<Footer />);
  const footerText = screen.getByText(
    new RegExp(`Copyright ${getCurrentYear()}.*${getFooterCopy(true)}`, "i")
  );
  expect(footerText).toBeInTheDocument();
});
