import PropTypes from 'prop-types';

CourseListRow.propTypes = {
  isHeader: PropTypes.bool.isRequired,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.string,
};

export default function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {

  const bgStyle = isHeader 
    ? { backgroundColor: 'rgba(222, 181, 181, 0.66)' }
    : { backgroundColor: 'rgba(205, 205, 205, 0.45)' };
  
  const cellClasses = 'border border-gray-400';
  const tdClasses = `${cellClasses} pl-2`;
  
  return isHeader ? (
    <tr>
      <th 
        colSpan={textSecondCell ? 1 : 2}
        className={cellClasses}
        style={bgStyle}
      >
        {textFirstCell}
      </th>
      {textSecondCell ? (
        <th 
          className={cellClasses}
          style={bgStyle}
        >
          {textSecondCell}
        </th>
      ) : null}
    </tr>
  ) : (
    <tr>
      <td 
        className={tdClasses}
        style={bgStyle}
      >
        {textFirstCell}
      </td>
      <td 
        className={tdClasses}
        style={bgStyle}
      >
        {textSecondCell}
      </td>
    </tr>
  );
}