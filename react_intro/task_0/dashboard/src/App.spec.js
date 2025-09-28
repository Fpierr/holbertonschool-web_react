import {render, screen} from "@testing-library/react";
import App from "./App.jsx";

test('The title h1 is rendered : School Dashboard', () => {
    render(<App/>);
    const title = screen.getByText(/School Dashboard/i);
    expect(title).toBeInTheDocument();
})

test('Render the text p element in app-body and app-footer', () => {
    render(<App />);
    const pBody = screen.getByText(/Login to access the full dashboard/i);
    const pFooter = screen.getByText(/Copyright 2025 - Holberton School/i);
    expect(pBody).toBeInTheDocument();
    expect(pFooter).toBeInTheDocument();
})

test('check if the logo image is rendered using the alt text', () => {
    render(<App/>);
    const imgLogo = screen.getByAltText(/holberton logo/i);
    expect(imgLogo).toBeInTheDocument();
})