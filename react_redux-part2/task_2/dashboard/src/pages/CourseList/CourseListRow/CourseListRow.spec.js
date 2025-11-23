import { render, screen, within } from '@testing-library/react';
import { test, expect } from "@jest/globals";
import CourseListRow from './CourseListRow';

test('Should display 2 "th" element whenever the isHeader props set to true', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell="Second" />
      </tbody>
    </table>
  );
  const trElement = screen.getAllByRole('columnheader');
  expect(trElement).toHaveLength(2);
});

test('Should display 2 "td" element whenever the "isHeader" props set to false', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Test" textSecondCell="Value" />
      </tbody>
    </table>
  );
  const trElement = screen.getAllByRole('cell');
  expect(trElement).toHaveLength(2);
});

test('Should display 1 "th" element whenever the "isHeader" props set to true, and "textSecondCell" set to null', () => {
  const props = {
    isHeader: true,
    textFirstCell: 'Test',
    textSecondCell: null
  };
  render(
    <table>
      <tbody>
        <CourseListRow {...props} />
      </tbody>
    </table>
  );
  const thElement = screen.getByRole('columnheader');
  expect(thElement).toHaveAttribute('colSpan', '2');
});

test('Should display 2 "th" elements whenever the "isHeader" props set to true, and "textSecondCell" is not null', () => {
  const props = {
    isHeader: true,
    textFirstCell: 'First',
    textSecondCell: 'dummy title'
  };
  render(
    <table>
      <tbody>
        <CourseListRow {...props} />
      </tbody>
    </table>
  );
  const thElements = screen.getAllByRole('columnheader');
  expect(thElements).toHaveLength(2);
});

test('Should render 2 "td" elements inside a "tr" element whenever the "isHeader" prop is set to false', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Test" textSecondCell="Value" />
      </tbody>
    </table>
  );
  const trElement = screen.getByRole('row');
  const tdElement = within(trElement).getAllByRole('cell');
  expect(trElement).toBeInTheDocument();
  expect(tdElement).toHaveLength(2);
});

test('Should render a checkbox in the first cell when isHeader is false', () => {
  render(
    <table>
      <tbody>
        <CourseListRow 
          isHeader={false} 
          textFirstCell="ES6" 
          textSecondCell="60"
          id={1}
          isChecked={false}
          onChangeRow={() => {}}
        />
      </tbody>
    </table>
  );
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

test('Should call onChangeRow with correct arguments when checkbox is clicked', () => {
  const mockOnChangeRow = jest.fn();
  render(
    <table>
      <tbody>
        <CourseListRow 
          isHeader={false} 
          textFirstCell="ES6" 
          textSecondCell="60"
          id={1}
          isChecked={false}
          onChangeRow={mockOnChangeRow}
        />
      </tbody>
    </table>
  );
  const checkbox = screen.getByRole('checkbox');
  checkbox.click();
  expect(mockOnChangeRow).toHaveBeenCalledWith(1, true);
});