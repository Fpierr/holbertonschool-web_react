import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
};

export default function CourseList({ courses = [] }) {
    return (
        <div className="mx-auto my-8 w-[80%] md:w-[85%] lg:w-[90%] max-[912px]:w-full max-[912px]:my-4">
            {courses.length > 0 ? (
                <table id="CourseList" className="w-full border-collapse max-[912px]:text-sm">
                    <thead>
                        <CourseListRow textFirstCell="Available courses" isHeader={true} />
                        <CourseListRow
                            textFirstCell="Course name"
                            textSecondCell="Credit"
                            isHeader={true}
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
                <table id="CourseList" className="w-full border-collapse max-[912px]:text-sm">
                    <thead>
                        <CourseListRow
                            isHeader={true}
                            textFirstCell="No course available yet"
                        />
                    </thead>
                </table>
            )}
        </div>
    );
}