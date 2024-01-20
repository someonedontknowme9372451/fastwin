import './component.css';
const QS = ({period}) => {
  return (
    <div className='ball-box rcd-pillar'>
     <div className='ball QS '><span>?</span></div>  
    <div className='ball-num'>{period}</div>
    </div>
  )
}

export default QS