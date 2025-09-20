import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./BehaviorBook.css";
import { deleteAssignment } from "../../redux/class";
import { useState } from "react";


const DeleteAssignmentModal = ({assignment}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();
    const [errors, setErrors] = useState({});

    const handleDelete = async () => {
        const serverResponse = await dispatch(deleteAssignment({assignmentId: assignment.id}));
        if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
          } else {
            closeModal();
          }
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to delete ${assignment.name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </div>
    )
}

export default DeleteAssignmentModal