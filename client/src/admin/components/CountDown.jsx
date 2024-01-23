import './components.css'
import PropTypes from 'prop-types';


const CountDown = ({ countdown, period }) => {
  // Check if countdown or period is undefined or null
  if (!countdown || !period) {
    return null; // or render a loading state, an error message, or default values
  }

  // Ensure that countdown has the expected structure
  if (!countdown.minutes || !countdown.seconds) {
    return null; // or handle the unexpected structure
  }

  return (
    <div className='game-inform'>
      <div className='period-inform'>
        <span className='period-txt'>Period</span>
        <span className='period-number'>{period}</span>
      </div>

      <div className='count-down'>
        <span className='count-txt'>Count Down</span>

        <div className='count-down-box'>
          <span className="boxs">{countdown.minutes[0]}</span>
          <span className="boxs">{countdown.minutes[1]}</span>:
          <span className="boxs">{countdown.seconds[0]}</span>
          <span className="boxs">{countdown.seconds[1]}</span>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking
CountDown.propTypes = {
  countdown: PropTypes.shape({
    minutes: PropTypes.string.isRequired,
    seconds: PropTypes.string.isRequired,
  }),
  period: PropTypes.string,
};

export default CountDown;
