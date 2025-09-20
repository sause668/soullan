import "./BehaviorBook.css";
import { typeToString } from "../../utils/TypeConvertion";
import DeleteAssignmentModal from "./DeleteAssignmentModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditAssignmentModal from "./EditAssignmentModal";

function AssignmentInfo({assignment}) {
  return (
    <div id="assignInfoCon">
          <h2>{assignment.name}</h2>
          <h3>Type: {typeToString(assignment.type)}</h3>
          <h3>Due Date: {assignment.due_date.slice(0, assignment.due_date.length - 13)}</h3>
          <div id='assignButtonsCon'>
            <OpenModalButton
              buttonText={'Edit'}
              modalComponent={<EditAssignmentModal assignment={assignment}/>}
            />
            <OpenModalButton
              buttonText={'Delete'}
              modalComponent={<DeleteAssignmentModal assignment={assignment}/>}
            />
          </div>
          
      </div>
  );
}

export default AssignmentInfo;