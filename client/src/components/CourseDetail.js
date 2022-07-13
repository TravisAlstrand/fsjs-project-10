import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CoursesContext } from './Context';

const CourseDetail = () => {

	const { actions } = useContext(CoursesContext);
  const { course } = useContext(CoursesContext);

	// get the id param from the url
	const { id } = useParams();

	// after the component renders, call function to fetch single course data
	useEffect(() => {
		const getCourse = async () => {
			await actions.fetchSingleCourse(id);
		};
		getCourse();
	}, []);

	if(course !== null) {
		console.log(course);
		return(
			<main>
				<div className="actions--bar">
						<div className="wrap">
								<Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
								<a className="button" href="#">Delete Course</a>
								<Link className="button button-secondary" to="/">Return to List</Link>
						</div>
				</div>
				<div className="wrap">
					<h2>Course Detail</h2>
					<form>
						<div className="main--flex">
							<div>
								<h3 className="course--detail--title">Course</h3>
								<h4 className="course--name">{course.course.title}</h4>
								<p>By {course.course.creator.firstName} {course.course.creator.lastName}</p>
								<p>{course.course.description}</p>
							</div>
							<div>
								<h3 className="course--detail--title">Estimated Time</h3>
								<p>{course.course.estimatedTime}</p>
								<h3 className="course--detail--title">Materials Needed</h3>
								<ul className="course--detail--list">
									<li>{course.course.materialsNeeded}</li>
								</ul>
							</div>
						</div>
					</form>
				</div>
			</main>
		);
	}
};

export default CourseDetail;