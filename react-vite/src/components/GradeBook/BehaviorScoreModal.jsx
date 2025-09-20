import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { csrfFetch } from "../../redux/csrf";
import "./BehaviorBook.css";

function BehaviorScoreModal({ student, classId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [attention, setAttention] = useState(1);
  const [learnability, setLearnability] = useState(1);
  const [cooperation, setCooperation] = useState(1);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await csrfFetch(`/api/classes/${classId}/behaviors`, {
        method: 'POST',
        body: JSON.stringify({
          student_id: student.id,
          attention: parseInt(attention),
          learnability: parseInt(learnability),
          cooperation: parseInt(cooperation),
          notes: notes
        })
      });

      if (response.ok) {
        const data = await response.json();
        closeModal();
        // Optionally dispatch an action to refresh the behavior grades
        // dispatch(fetchClassBehaviorGrades({ classId, quarter }));
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      setErrors({ message: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className='formCon'>
      <h1 className='inputTitle'>Set Behavior Scores for {student.first_name} {student.last_name}</h1>
      <form onSubmit={handleSubmit}>
        <div className='inputCon'>
          <label htmlFor='attention'>
            <p className='labelTitle'>
              Attention (1-5):
            </p>
          </label>
          <select
            className='formInput'
            id="attention"
            value={attention}
            onChange={(e) => setAttention(e.target.value)}
            required
          >
            <option value={1}>1 - Needs Improvement</option>
            <option value={2}>2 - Below Average</option>
            <option value={3}>3 - Average</option>
            <option value={4}>4 - Above Average</option>
            <option value={5}>5 - Excellent</option>
          </select>
          {errors.attention && <p className='labelTitle error'>{errors.attention}</p>}
        </div>

        <div className='inputCon'>
          <label htmlFor='learnability'>
            <p className='labelTitle'>
              Learning Speed (1-5):
            </p>
          </label>
          <select
            className='formInput'
            id="learnability"
            value={learnability}
            onChange={(e) => setLearnability(e.target.value)}
            required
          >
            <option value={1}>1 - Needs Improvement</option>
            <option value={2}>2 - Below Average</option>
            <option value={3}>3 - Average</option>
            <option value={4}>4 - Above Average</option>
            <option value={5}>5 - Excellent</option>
          </select>
          {errors.learnability && <p className='labelTitle error'>{errors.learnability}</p>}
        </div>

        <div className='inputCon'>
          <label htmlFor='cooperation'>
            <p className='labelTitle'>
              Cooperation (1-5):
            </p>
          </label>
          <select
            className='formInput'
            id="cooperation"
            value={cooperation}
            onChange={(e) => setCooperation(e.target.value)}
            required
          >
            <option value={1}>1 - Needs Improvement</option>
            <option value={2}>2 - Below Average</option>
            <option value={3}>3 - Average</option>
            <option value={4}>4 - Above Average</option>
            <option value={5}>5 - Excellent</option>
          </select>
          {errors.cooperation && <p className='labelTitle error'>{errors.cooperation}</p>}
        </div>

        <div className='inputCon'>
          <label htmlFor='notes'>
            <p className='labelTitle'>
              Notes (optional):
            </p>
          </label>
          <textarea
            className='formInput'
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes about the student's behavior..."
            rows={3}
          />
          {errors.notes && <p className='labelTitle error'>{errors.notes}</p>}
        </div>

        <div className="submitCon">
          <button 
            className='submitButton'
            type="submit"
          >
            Save Scores
          </button>
        </div>
        {errors.message && <p className='labelTitle error'>{errors.message}</p>}
      </form>
    </div>
  );
}

export default BehaviorScoreModal;
