import './component.css';
const RS = ({num,period}) => {
  return (
    <div className='ball-box rcd-pillar'>
     <div className='ball VS '><span>{num}</span></div>  
    <div className='ball-num'>{period}</div>
    </div>
  )
}

export default RS