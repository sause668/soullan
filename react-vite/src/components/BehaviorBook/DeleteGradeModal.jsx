import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./BehaviorBook.css";
import { deleteGrade } from "../../redux/class";
import { useState } from "react";


const DeleteGradeModal = ({studentId, assignmentId}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();
    const [errors, setErrors] = useState({});

    const handleDelete = async () => {
        const serverResponse = await dispatch(deleteGrade({assignmentId, studentId}));

        if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
          } else {
            closeModal();
          }
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to delete this Grade?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </div>
    )
}

export default DeleteGradeModal