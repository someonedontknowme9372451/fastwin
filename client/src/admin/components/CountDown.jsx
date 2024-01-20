
const CountDown = ({countdown, period}) => {
  return (
    <div className='game-inform'>
    <div className='period-inform'>
      <span className='period-txt'>Period</span>
      <span className='period-number'>{period}</span>
    </div>

    <div className='count-down'>
       <span className='count-txt'>Count Down</span>
      
      <div className='count-down-box'>
        <span className="boxs">0</span><span className="boxs">0</span>:<span className="boxs">{countdown[0]}</span><span className="boxs">{countdown[1]}</span>
      </div>
    </div>
    
  </div>
  )
}

export default CountDown
