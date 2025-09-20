import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./Dashboard.css";
import { createClass } from "../../redux/class";

function CreateClassModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState(6);
  const [room, setRoom] = useState(103);
  const [period, setPeriod] = useState(1);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      createClass({
        name,
        subject,
        grade,
        room,
        period
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
      <h1 className='inputTitle'>New Class</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className='inputCon'>
          <label htmlFor='name'>
            <p className='labelTitle'>Name</p>
          </label>
          <input
            className='formInput'
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className='labelTitle error'>{errors.name}</p>}
        </div>
        {/* Subject */}
        <div className='inputCon'>
          <label htmlFor='subject'>
            <p className='labelTitle'>Subject</p>
          </label>
          <input
            className='formInput'
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          {errors.subject && <p className='labelTitle error'>{errors.subject}</p>}
        </div>
        {/* Grade */}
        <div className='inputCon'>
          <label htmlFor='grade'>
            <p className='labelTitle'>Grade</p>
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
        {/* Room */}
        <div className='inputCon'>
          <label htmlFor='room'>
            <p className='labelTitle'>Room</p>
          </label>
          <input
            className='formInput'
            id="room"
            type="number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          {errors.room && <p className='labelTitle error'>{errors.room}</p>}
        </div>
        {/* Period */}
        <div className='inputCon'>
          <label htmlFor='period'>
            <p className='labelTitle'>Period</p>
          </label>
          <input
            className='formInput'
            id="period"
            type="number"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            required
          />
          {errors.period && <p className='labelTitle error'>{errors.period}</p>}
        </div>
        
        <div className="submitCon">
          <button 
            className='submitButton'
            type="submit"
            disabled={(
                !name.length ||
                !subject.length ||
                !parseInt(grade) ||
                !parseInt(room) ||
                !parseInt(period)
            )}
          >Submit</button>
        </div>
        {errors.message && <p className='labelTitle error'>{errors.message}</p>}
      </form>
    </div>
  );
}

export default CreateClassModal;