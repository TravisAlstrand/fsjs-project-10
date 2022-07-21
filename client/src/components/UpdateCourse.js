import { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CoursesContext } from './Context';

const UpdateCourse = () => {

  // get the id param from the url
  const { id } = useParams();

  const navigate = useNavigate();

  const { actions } = useContext(CoursesContext);
  const { course, user } = useContext(CoursesContext);

  const [title, setTitle] = useState(course.course.title);
  const [description, setDescription] = useState(course.course.description);
  const [estimatedTime, setEstimatedTime] = useState(course.course.estimatedTime);
  const [materialsNeeded, setMaterialsNeeded] = useState(course.course.materialsNeeded);

  // after the component renders, call function to fetch single course data
  useEffect(() => {
    const getCourse = async () => {
      await actions.fetchSingleCourse(id);
    };
    getCourse();
  }, [actions, id]);



  // calls update course PUT request in index.js
  const handleSubmit = (e) => {

    e.preventDefault();

    const courseBody = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: user.userId
    }

    actions.updateCourse(id, courseBody)
      .then(response => {
        if (response === true) {
          navigate(`/courses/${id}`);
        }
      })
  };

  if (course) {
    return(
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.course.title} onChange={e => setTitle(e.target.value)} />

                <p>By {course.course.creator.firstName} {course.course.creator.lastName}</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription" onChange={e => setDescription(e.target.value)} defaultValue={course.course.description}></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.course.estimatedTime || ''} onChange={e => setEstimatedTime(e.target.value)} />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" onChange={e => setMaterialsNeeded(e.target.value)} defaultValue={course.course.materialsNeeded || ''}></textarea>
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