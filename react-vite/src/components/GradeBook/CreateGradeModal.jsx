import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { createGrade } from "../../redux/class";

function CreateGradeModal({assignmentId, studentId}) {
  const dispatch = useDispatch();
  const [grade, setGrade] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(  
        createGrade({
            assignmentId,
            studentId,
            grade
        })
    );

    if (serverResponse && serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };



  return (
    <div className='formCon'>
        <h1 className='inputTitle'>New Grade</h1>
        <form onSubmit={handleSubmit}>
          <div className='inputCon'>
            <label htmlFor='grade'>
              <p className='labelTitle'>
                Grade
              </p>
            </label>
            <input
              className='formInput'
              id="grade"
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
            {errors.grade && <p className='labelTitle error'>{errors.grade}</p>}
          </div>
          <div className="submitCon">
            <button 
              className='submitButton'
              type="submit"
            >Submit</button>
          </div>
        {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </form>
    </div>
  );
}

export default CreateGradeModal;