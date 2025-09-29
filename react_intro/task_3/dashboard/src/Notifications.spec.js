import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  beforeEach(() => {
    render(<Notifications />);
  });

  it('should render the notifications title', () => {
    const title = screen.getByText(/here is the list of notifications/i);
    expect(title).toBeInTheDocument();
  });

  it('should render the close button', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render exactly 3 notifications', () => {
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });

  it('should log "Close button has been clicked" when the close button is clicked', () => {
    console.log = jest.fn();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(console.log).toHaveBeenCalledWith('Close button has been clicked');
  });
});
