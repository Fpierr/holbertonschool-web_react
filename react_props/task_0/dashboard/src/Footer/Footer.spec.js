
import {render, screen} from "@testing-library/react";
import { expect, test} from "@jest/globals";
import Footer from "./Footer.jsx";

test('Render the text p element in app-footer', () => {
    render(<Footer />);
    const pFooter = screen.getByText(/Copyright 2025 Holberton School/i);
    expect(pFooter).toBeInTheDocument();
})