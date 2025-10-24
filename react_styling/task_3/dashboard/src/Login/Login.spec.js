import {render, screen} from "@testing-library/react";
import { expect, test} from "@jest/globals";
import Login from "./Login.jsx";

test('Check whether 2 input elements are rendered', () => {
    render(<Login />);
    const inputEmail = screen.getByLabelText(/Email/i);
    const inputPassword = screen.getByLabelText(/Password/i);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
});

test('check if renders 2 label elements with text Email and Password', () => {
    render(<Login/>);
    const labelEmail = screen.getByLabelText(/Email/i);
    const labelPwd = screen.getByLabelText(/Password/i);
    expect(labelEmail).toBeInTheDocument();
    expect(labelPwd).toBeInTheDocument();
});

test('check if render a button text Ok', ()=> {
    render(<Login/>);
    const buttonText = screen.getByRole('button', {name: /ok/i});
    expect(buttonText).toBeInTheDocument();
});