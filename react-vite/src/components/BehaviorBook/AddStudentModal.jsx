import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./BehaviorBook.css";
import { fetchStudents } from "../../redux/student";
import { addStudent } from "../../redux/class";

function AddStudentModal({classId, currentStudentIds}) {
  const dispatch = useDispatch();
  const studentsState = useSelector((state) => state.student.students)
  const students = studentsState && studentsState.filter(student => !currentStudentIds.includes(student.id));
  const [isLoaded, setIsLoaded] = useState(false);
  const [newStudent, setNewStudent] = useState((students) ? `${students[0].last_name}, ${students[0].first_name}`:'');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [lastName, firstName] = newStudent.split(', ')
    const newStudentId = students.find(student => student.first_name == firstName && student.last_name == lastName).id
    const serverResponse = await dispatch(  
        addStudent({
            classId,
            studentId: newStudentId
        })
    );

    if (serverResponse && serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(fetchStudents()).then((studentData) => {
        setIsLoaded(true)
        const studentsNew = studentData && studentData.filter(student => !currentStudentIds.includes(student.id));
        setNewStudent(`${studentsNew[0].last_name}, ${studentsNew[0].first_name}`)
    });
  }, [dispatch, currentStudentIds]);

  return (
    <>
        {(isLoaded && students) && (
            <div className='formCon'>
                <h1 className='inputTitle'>Add Student</h1>
                <form onSubmit={handleSubmit}>
                <div className='inputCon'>
                    <select 
                        name="newStudent" 
                        id="newStudent" 
                        className="formInput"
                        value={newStudent} 
                        onChange={(e) => setNewStudent(e.target.value)}
                    >
                        {students.map((student, index) => (
                            <option value={`${student.last_name}, ${student.first_name}`} key={`newStudent${index}`}>{student.last_name}, {student.first_name}</option>
                        ))}
                    </select>
                </div>
                <div className="submitCon">
                    <button 
                        className='submitButton'
                        type="submit"
                        disabled={(!newStudent.length)}
                    >Submit</button>
                </div>
                {errors.message && <p className='labelTitle error'>{errors.message}</p>}
                </form>
            </div>
        )}
    </>
    
  );
}

export default AddStudentModal;