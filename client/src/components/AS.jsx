import './component.css';
const AS = ({num,period}) => {
    return (
      <div className='ball-box rcd-pillar'>
      <div className='ball AS '><span>{num}</span></div>  
     <div className='ball-num'>{period}</div>
      </div>
    )
  }
  
  export default AS