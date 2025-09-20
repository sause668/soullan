import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
  import "./GradeBook.css";
import { removeStudent } from "../../redux/class";
import { useState } from "react";


const RemoveStudentModal = ({classId, student}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();
    const [errors, setErrors] = useState({});

    const handleDelete = async () => {
        const serverResponse = await dispatch(removeStudent({
          classId, 
          studentId: student.id
        }));
        
        if (serverResponse && serverResponse.errors) {
          setErrors(serverResponse.errors);
        } else {
          closeModal();
        }
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to remove ${student.first_name} ${student.last_name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </div>
    )
}

export default RemoveStudentModal