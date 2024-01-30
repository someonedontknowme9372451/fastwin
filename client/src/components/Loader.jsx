import './component.css'
import loadingImage from '../assets/images/download.png'

const Loader = () => {
  return (
    <div className='loader-btn'>
       <img src={loadingImage} alt=""className='loader-img'/>
    </div>
  )
}

export default Loader
