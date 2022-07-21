import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CoursesContext } from './Context';

const CreateCourse = () => {

  const { actions, user } = useContext(CoursesContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [materialsNeeded, setMaterialsNeeded] = useState(null);
  const [errors, setErrors] = useState({});

  // function to handle form submit
  function handleSubmit(e) {
    e.preventDefault(); /* prevent default form actions */

    // set the object of course body details to send to context/index.js
    const courseBody = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: user.userId
    }

    // call the handleCreateNewCourse function sending body object above
    actions.createCourse(courseBody)
      .then(response => {
        // if successful...
        if (response === true) {
          navigate('/');
        } 
        // if unsuccessful, set errors state with returned errors
        else {
          setErrors(response);
          console.log(errors);
        }
      });
  }

  return(
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        
        {errors.length > 0 ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => {
                return ( 
                  <li key={index}>{error}</li>
                )
              })}
            </ul>
          </div>  
        ) : (
          <></>
        )}

        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" onChange={e => setTitle(e.target.value)} />

                <p>By {user.firstName} {user.lastName}</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription" onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" onChange={e => setEstimatedTime(e.target.value)} />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" onChange={e => setMaterialsNeeded(e.target.value)}></textarea>
            </div>
          </div>
          <button className="button" type="submit">Create Course</button>
          <Link to='/'>
            <button className="button button-secondary">Cancel</button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;