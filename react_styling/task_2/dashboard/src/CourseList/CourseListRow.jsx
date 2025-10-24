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
  const style = isHeader
    ? { backgroundColor: 'var(--color-table-header)', opacity: 0.66 }
    : { backgroundColor: 'var(--color-table-rows)', opacity: 0.45 };

  return isHeader ? (
    <tr style={style}>
      <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
      {textSecondCell ? <th>{textSecondCell}</th> : null}
    </tr>
  ) : (
    <tr style={style}>
      <td>{textFirstCell}</td>
      <td>{textSecondCell}</td>
    </tr>
  );
}
