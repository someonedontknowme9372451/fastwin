import './component.css';

const NS = ({num,period}) => {
  return (
    <div className='ball-box rcd-pillar'>
    <div className='ball NS '><span>{num}</span></div>  
   <div className='ball-num'>{period}</div>
   </div>
  )
}

export default NS
