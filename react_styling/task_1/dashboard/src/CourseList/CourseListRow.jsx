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
  const bgColor = isHeader ? 'bg-[var(--color-table-header)]' : 'bg-[var(--color-table-rows)]';
  const opacity = isHeader ? 'opacity-66' : 'opacity-45';
  const commonClasses = `border border-gray-400 ${bgColor} ${opacity}`;
  
  return isHeader ? (
    <tr>
      <th 
        colSpan={textSecondCell ? 1 : 2}
        className={commonClasses}
      >
        {textFirstCell}
      </th>
      {textSecondCell ? (
        <th className={commonClasses}>
          {textSecondCell}
        </th>
      ) : null}
    </tr>
  ) : (
    <tr>
      <td className={`${commonClasses} pl-2`}>
        {textFirstCell}
      </td>
      <td className={`${commonClasses} pl-2`}>
        {textSecondCell}
      </td>
    </tr>
  );
}