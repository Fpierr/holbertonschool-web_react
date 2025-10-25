import React from 'react';
import PropTypes from 'prop-types';

function CourseListRow({ isHeader, textFirstCell, textSecondCell, customStyle = "" }) {
  if (isHeader) {
    if (textSecondCell === undefined) {
      return (
        <tr>
          <th
            colSpan="2"
            className={`border-2 border-gray-400 ${customStyle} text-left px-4 py-2`}
          >
            {textFirstCell}
          </th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th className={`border-2 border-gray-400 ${customStyle} text-left px-4 py-2`}>
            {textFirstCell}
          </th>
          <th className={`border-2 border-gray-400 ${customStyle} text-left px-4 py-2`}>
            {textSecondCell}
          </th>
        </tr>
      );
    }
  }
  return (
    <tr>
      <td className="border-2 border-gray-400 text-left px-4 py-2">{textFirstCell}</td>
      <td className="border-2 border-gray-400 text-left px-4 py-2">{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customStyle: PropTypes.string,
};

CourseListRow.defaultProps = {
  isHeader: false,
  textFirstCell: '',
  textSecondCell: null,
  customStyle: '',
};

export default CourseListRow;
