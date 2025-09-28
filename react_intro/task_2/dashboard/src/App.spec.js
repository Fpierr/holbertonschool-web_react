import {render, screen} from "@testing-library/react";
import { expect, test} from "@jest/globals";
import App from "./App.jsx";

test('Whether the title h1 is rendered : School Dashboard', () => {
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

test('Check whether 2 input elements are rendered', () => {
    render(<App />);
    const inputEmail = screen.getByRole("textbox");
    const inputPassword = screen.getByLabelText(/Password/i);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
});

test('check if renders 2 label elements with text Email and Password', () => {
    render(<App/>);
    const labelEmail = screen.getByText(/Email/i);
    const labelPwd = screen.getByText(/Password/i);
    expect(labelEmail).toBeInTheDocument();
    expect(labelPwd).toBeInTheDocument();
});

test('check if render a button text Ok', ()=> {
    render(<App/>);
    const buttonText = screen.getByRole('button', {name: /Ok/i});
    expect(buttonText).toBeInTheDocument();
});