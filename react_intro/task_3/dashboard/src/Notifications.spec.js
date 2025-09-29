import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  beforeEach(() => {
    render(<Notifications />);
  });

  it('renders the notifications title', () => {
    const title = screen.getByText(/here is the list of notifications/i);
    expect(title).toBeInTheDocument();
  });

  it('renders the close button', () => {
    const button = screen.getByRole('button') || screen.getByText(/close/i);
    expect(button).toBeInTheDocument();
  });

  it('renders exactly 3 notifications', () => {
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  it('logs "Close button has been clicked" when the close button is clicked', () => {
    console.log = jest.fn();

    const button = screen.getByRole('button') || screen.getByText(/close/i);
    fireEvent.click(button);

    expect(console.log).toHaveBeenCalledWith('Close button has been clicked');
  });
});
