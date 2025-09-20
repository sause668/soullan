import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./StudentGrades.css";
import { useParams } from "react-router-dom";
import { fetchGradesClass } from "../../redux/class";
import { fetchStudentBehaviorGrades } from "../../redux/behaviorGrades";
import { calcFinalGradeStudent, calcLetterGrade, sortAssignments, calcBehaviorGrade } from "../../utils/Grading";

function StudentGrades() {
  const dispatch = useDispatch();
  const { studentId, classId } = useParams();
  const class_ = useSelector((state) => state.class.class);
  // const behaviorGrade = useSelector((state) => state.behaviorGrades.currentBehaviorGrade);
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    dispatch(fetchGradesClass({studentId, classId}))
      .then((res) => {
        if (res && res.errors) {
          setErrors(res.errors)
        } else {
          setIsLoaded(true)
        }
      })
  }, [dispatch, studentId, classId]);

  // useEffect(() => {
  //   if (studentId && classId) {
  //     dispatch(fetchStudentBehaviorGrades({ studentId, classId, quarter }));
  //   }
  // }, [dispatch, studentId, classId, quarter]);

  // // Calculate final behavior score
  // const calcFinalBehaviorScore = () => {
  //   if (!behaviorGrade) return 'N/A';
    
  //   const attention = behaviorGrade.attention || 0;
  //   const learningSpeed = behaviorGrade.learning_speed || 0;
  //   const cooperation = behaviorGrade.cooperation || 0;

    
    
  //   const average = (attention + learningSpeed + cooperation) / 3;
  //   return Math.round(average * 10) / 10; // Round to 1 decimal place
  // };

  return (
    <div className="">
      {isLoaded && (
        <div id="gradesCon"> 
          <div id="headerConG">
            <div id="classInfoConG" className="lightBlueBox">
              <h2 id="classNameG">{class_.grade}th Grade {class_.name} - Period {class_.period}</h2>
              <h3 id="classTeacherG">{class_.teacher.last_name}, {class_.teacher.first_name}</h3>
              <h3 id="classRoomG">Room - {class_.room}</h3>
            </div>
            <div id="classGradeConG" className="lightBlueBox">
              <h2 id="currentGradeG">Current Grade: {calcFinalGradeStudent(class_.assignments.filter(a => a.quarter == quarter))}</h2>
              <div className='quarterSelectConG'>
                <label htmlFor='quarter'>
                  <p className=''>
                    Quarter
                  </p>
                </label>
                <select 
                  name="quarter" 
                  id="quarter" 
                  className="quarterSelectG" 
                  value={quarter} 
                  onChange={(e) => setQuarter(parseInt(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
          <div id="classAssignmentsConG">
          {class_.assignments
            .filter(a => a.quarter == quarter)
            .sort((a1, a2) => sortAssignments(a1, a2))
            .map((assignment, index) => (
            <div className="assignmentGridConG" key={`classAssignment${index}`}>
              <div className={`assignmentConG ${assignment.type}`}>
                <h3 className="assignNameG">{assignment.name}</h3>
                <h4 className="assignDueDateG">Due Date: {assignment.due_date.slice(0, assignment.due_date.length - 13)}</h4>
                <h4 className={`assignGradeG`}>Grade: {assignment.grade} ({calcLetterGrade(assignment.grade)})</h4>
              </div>
            </div>
          ))}
          </div>
          {/* <div id="headerConG">
            <div id="classInfoConG" className="lightBlueBox">
              <h2 id="classNameG">{class_.grade}th Grade {class_.name} - Period {class_.period}</h2>
              <h3 id="classTeacherG">{class_.teacher.last_name}, {class_.teacher.first_name}</h3>
              <h3 id="classRoomG">Room - {class_.room}</h3>
            </div>
            <div id="classGradeConG" className="lightBlueBox">
              <h2 id="currentGradeG">Current Grade: {calcFinalGradeStudent(class_.assignments.filter(a => a.quarter == quarter))}</h2>
            </div>
          </div> */}
          <div id="behaviorScoresConG">
            <div id="behaviorScoresHeaderG" className="lightBlueBox">
              <h2 id="behaviorFinalScoreG">
                Current Behavior Grade: {calcBehaviorGrade(class_.behaviors.attention, class_.behaviors.learnability, class_.behaviors.cooperation)}
              </h2>
            </div>
            <div id="behaviorScoresGridG">
              <div className="behaviorScoreConG"
              style={{
                backgroundColor: '#d400f954'
              }}>
                <h3 className="behaviorScoreLabelG">Attention</h3>
                <div className="behaviorScoreValueG">
                  {class_.behaviors.attention}/5
                </div>
              </div>
              <div className="behaviorScoreConG"
              style={{
                backgroundColor: '#00aeff4a'
              }}>
                <h3 className="behaviorScoreLabelG">Learning Speed</h3>
                <div className="behaviorScoreValueG">
                  {class_.behaviors.learnability}/5
                </div>
              </div>
              <div className="behaviorScoreConG"
              style={{
                backgroundColor:'#f500564e'
              }}>
                <h3 className="behaviorScoreLabelG">Cooperation</h3>
                <div className="behaviorScoreValueG">
                  {class_.behaviors.cooperation}/5
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {errors.message && (<h1>{errors.message}</h1>)}
    </div>
  );
}

export default StudentGrades;
