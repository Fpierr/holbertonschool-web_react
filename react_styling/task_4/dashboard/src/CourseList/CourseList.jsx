import React from "react";
import PropTypes from "prop-types";

function CourseList({ courses }) {
  return (
    <table className="w-full border-collapse border border-gray-300 text-left mt-4 
                      max-[520px]:text-sm max-[520px]:w-full">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 p-2">Course name</th>
          <th className="border border-gray-300 p-2">Credit</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">{course.name}</td>
            <td className="border border-gray-300 p-2">{course.credit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CourseList;
