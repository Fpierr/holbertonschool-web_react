import {render} from "@testing-library/react";
import { test} from "@jest/globals";
import App from "./App.jsx";

test('Render the header, login and footer components', () => {
    render (<App />);
});

