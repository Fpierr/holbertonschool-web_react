import React, { useState } from "react";
import WithLogging from "../HOC/WithLogging";

function Login({ logIn }) {

  // --- State initialization ---
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [enableSubmit, setEnableSubmit] = useState(false);

  // --- Validation logic (same as before) ---
  const validateForm = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 8;
  };

  // --- Handle input changes ---
  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    const updatedForm = { ...formData, email: newEmail };
    setFormData(updatedForm);
    setEnableSubmit(validateForm(newEmail, updatedForm.password));
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    const updatedForm = { ...formData, password: newPassword };
    setFormData(updatedForm);
    setEnableSubmit(validateForm(updatedForm.email, newPassword));
  };

  // --- Handle form submit ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (logIn) {
      logIn(formData.email, formData.password);
    }
  };

  return (
    <div className="App-login flex-1 text-left m-8 border-t-4 border-[var(--main-color)] pt-6">
      <p className="text-lg font-semibold mb-2">
        Login to access the full dashboard
      </p>

      <form
        className="flex flex-wrap items-center gap-4"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="email" className="flex items-center gap-2">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChangeEmail}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
          />
        </label>

        <label htmlFor="password" className="flex items-center gap-2">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChangePassword}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
          />
        </label>

        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className={`px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer transition ${
            !enableSubmit ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </form>
    </div>
  );
}

export default WithLogging(Login);
