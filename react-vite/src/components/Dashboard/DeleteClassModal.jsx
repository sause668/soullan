import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./Dashboard.css";
import { deleteClass } from "../../redux/class";
import { useState } from "react";


const DeleteClassModal = ({classDelete}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();
    const [errors, setErrors] = useState({});

    const handleDelete = async () => {
        const serverResponse = await dispatch(deleteClass({classId: classDelete.id}));

        if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
          } else {
            closeModal();
          }
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmTextCon">{`Are you sure you want to delete ${classDelete.name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </div>
    )
}

export default DeleteClassModal