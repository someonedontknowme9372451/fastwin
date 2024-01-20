import './component.css';
const BS = ({num,period}) => {
    return (
      <div className='ball-box rcd-pillar'>
      <div className='ball BS '><span>{num}</span></div>  
     <div className='ball-num'>{period}</div>
      </div>
    )
  }
  
  export default BS