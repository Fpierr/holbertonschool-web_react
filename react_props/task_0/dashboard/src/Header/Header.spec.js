import {render, screen} from "@testing-library/react";
import { expect, test} from "@jest/globals";
import Header from "./Header.jsx";

test('Whether the Header title h1 and logo are rendered', () => {
    render(<Header />);
    expect(screen.getByText(/School Dashboard/i)).toBeInTheDocument();
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});