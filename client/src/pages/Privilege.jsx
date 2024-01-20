import './page.css';
import {useNavigate} from 'react-router-dom'
import Level from '../assets/images/3levelinv.jpg'
import RFI from '../assets/images/newRFI.png'

const Privilege = () => {
    const navigate =useNavigate();
  return (
   <div>
      <section id='privilegeNav' className='top-nav'>
        <div className='back' onClick={()=>{navigate(-1)}}> <span className='privilegeBack'></span> </div> <div className='privilegeHead'>Agency Privilege</div>
      </section>
      <section id='privilegeBody'>
        <span className='priTxt'>3 level invites, each user will generate commission </span>
         <div className='priBackground'> <img src={Level}  alt='' width='100%'></img></div>
          <button className='priButton'>Refer to Get</button>
          <span className='priTxt'>Reward ₹250 for each registered user</span>
         <div className='priBackground'> <img src={RFI} alt='' width='100%'></img></div>
      </section>

   </div>
  )
}

export default Privilege