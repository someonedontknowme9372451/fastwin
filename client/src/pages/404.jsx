import {useNavigate} from 'react-router-dom';
import errImage from '../assets/images/error_404.svg'

const PageNotFound = () => {

  const navigate = useNavigate();

  const handleClick=()=>{
      navigate('/')
   }
  return (
    <>
    <div id='errorNav'> <span onClick={handleClick }></span> </div>
    <img id='errorImg' src={errImage} alt=""  />
    </>

  )
}

export default PageNotFound