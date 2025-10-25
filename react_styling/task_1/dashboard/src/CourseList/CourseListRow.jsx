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
  const bgColorClass = isHeader 
    ? 'bg-[var(--color-table-header)]' 
    : 'bg-[var(--color-table-rows)]';
  
  const opacityValue = isHeader ? 0.66 : 0.45;
  
  const cellClasses = `border border-gray-400 ${bgColorClass}`;
  const cellStyle = { opacity: opacityValue };
  
  return isHeader ? (
    <tr>
      <th 
        colSpan={textSecondCell ? 1 : 2}
        className={cellClasses}
        style={cellStyle}
      >
        {textFirstCell}
      </th>
      {textSecondCell ? (
        <th 
          className={cellClasses}
          style={cellStyle}
        >
          {textSecondCell}
        </th>
      ) : null}
    </tr>
  ) : (
    <tr>
      <td 
        className={`${cellClasses} pl-2`}
        style={cellStyle}
      >
        {textFirstCell}
      </td>
      <td 
        className={`${cellClasses} pl-2`}
        style={cellStyle}
      >
        {textSecondCell}
      </td>
    </tr>
  );
}