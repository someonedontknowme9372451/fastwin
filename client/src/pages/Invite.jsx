import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'


const Invite = () => {
  const navigate=useNavigate();
  return (
    <>
     <div id='invite'>
     <Navbar/>
    <section id='inviteNav' > 
    <div id='blue'></div>
    <div id='white'></div>
    </section>
   <section id='inviteWithdraw'>
   <div id='withdraw'>
    <div className='container'>
      <span>Agent amount</span>
      <h2>₹ 231</h2>
    </div>
    <div className='container'>
      <button>Withdraw</button>
    </div>  
   </div>
   </section>

   <section id='inviteContainer'>
     <span onClick={()=>{navigate('/invite/privilege')}}>Privilege</span>
     <span id='line'></span>
     <span onClick={()=>{navigate('/invite/my-link')}}>My Link</span>
   </section>
   <div className='breakLine2'></div>

   <section id='inviteDetails'>
    <div className='details'>
      <span>Invited today</span>
      <h1>0</h1>
      <div className='box'><span>Total:</span> <span>1</span><span></span></div>
    </div>
    <div className='details'>
      <span>Today's income</span>
      <h1>₹0.00</h1>
      <div className='box'><span>Total:</span> <span>₹0.5</span><span></span> </div>
    </div>
   </section>
   <div className='breakLine2'></div>
   <section id='inviteRecord'>
       <div id='recordTxt'><h3>Recent Record(s)</h3> <span>more&gt;</span></div>
       <div id='recordData'>
        <div id='data'>No records</div>
       </div>
   </section>
     </div>
    </>
  )
}

export default Invite