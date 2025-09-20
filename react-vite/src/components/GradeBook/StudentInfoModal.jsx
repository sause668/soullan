import "./GradeBook.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import RemoveStudentModal from "./RemoveStudentModal";


const StudentInfoModal = ({classId, student}) => {
    return (
        <div id="studentInfoCon">
            <h2>{`${student.first_name} ${student.last_name}`}</h2>
            <h3>Grade: {student.grade}</h3>
            <OpenModalButton
                buttonText={'Remove Student'}
                modalComponent={<RemoveStudentModal
                    classId={classId}
                    student={student}
                    cssClasses={''}
                />}
            />
        </div>
    )
}

export default StudentInfoModal