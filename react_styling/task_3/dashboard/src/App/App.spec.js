import { render, fireEvent, cleanup } from '@testing-library/react';
import { beforeEach, afterEach, describe, test, expect, jest } from '@jest/globals';
import App from './App';

describe('App Component keyboard event', () => {
  let originalAlert;

  beforeEach(() => {
    originalAlert = window.alert;
    window.alert = jest.fn();
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    window.alert = originalAlert;
    document.addEventListener.mockRestore();
    document.removeEventListener.mockRestore();
    cleanup();
  });

  test('calls logOut function when Ctrl+H is pressed', () => {
    const logOutMock = jest.fn();
    render(<App logOut={logOutMock} isLoggedIn={true} />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(logOutMock).toHaveBeenCalled();
  });

  test('calls alert with "Logging you out" on Ctrl+H', () => {
    const logOutMock = jest.fn();
    render(<App logOut={logOutMock} isLoggedIn={true} />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });

  test('adds and removes event listeners on mount/unmount', () => {
    const { unmount } = render(<App isLoggedIn={true} />);
    expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    unmount();
    expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  test('renders the News from the School section with correct paragraph', () => {
    const { getByText } = render(<App isLoggedIn={false} />);
    const heading = getByText(/news from the school/i);
    const paragraph = getByText(/holberton school news goes here/i);
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});
