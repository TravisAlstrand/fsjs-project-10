import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CoursesContext } from './Context';

const UpdateCourse = () => {

  // get the id param from the url
  const { id } = useParams();

  const { actions } = useContext(CoursesContext);
  const { course } = useContext(CoursesContext);

  // after the component renders, call function to fetch single course data
  useEffect(() => {
    const getCourse = async () => {
      await actions.fetchSingleCourse(id);
    };
    getCourse();
  }, []);

  if (course) {
    return(
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <form>
            <div className="main--flex">
              <div>
                <label for="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" value={course.course.title} />

                <p>By {course.course.creator.firstName} {course.course.creator.lastName}</p>

                <label for="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription">{course.course.description}</textarea>
              </div>
              <div>
                <label for="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" value={course.course.estimatedTime} />

                <label for="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded">{course.course.materialsNeeded}</textarea>
              </div>
            </div>
            <button className="button" type="submit">Update Course</button>
            <Link to={`/courses/${id}`}>
              <button className="button button-secondary">Cancel</button>
            </Link>
          </form>
        </div>
      </main>
    );
  }
};

export default UpdateCourse;