import React from 'react';
import CourseListRow from './CourseListRow';
import PropTypes from 'prop-types';
import WithLogging from '../HOC/WithLogging';

class CourseList extends React.Component {
  render() {
    const { courses = [] } = this.props;

    return (
      <div className="courses my-32 mx-auto w-[90%] min-h-[33vh]">
        {courses.length > 0 ? (
          <table
            id="CourseList"
            className="w-full border-2 border-gray-400 border-collapse text-left"
          >
            <thead>
              <CourseListRow
                textFirstCell="Available courses"
                isHeader={true}
                customStyle="bg-red-100"
              />
              <CourseListRow
                textFirstCell="Course name"
                textSecondCell="Credit"
                isHeader={true}
                customStyle="bg-red-100"
              />
            </thead>
            <tbody>
              {courses.map((course) => (
                <CourseListRow
                  key={course.id}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <table
            id="CourseList"
            className="w-full border-2 border-gray-400 border-collapse text-left"
          >
            <thead>
              <CourseListRow
                isHeader={true}
                textFirstCell="No course available yet"
                customStyle="bg-red-100"
              />
            </thead>
          </table>
        )}
      </div>
    );
  }
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default WithLogging(CourseList);
