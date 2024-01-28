import './page.css';
import Navbar from '../components/Navbar'
const My = () => {
  return (
    <>
     <div className='myAccount'>
     <Navbar/>
  <section className='nav-invwx stick'> 
    <div className="comifo myma  pb-3 pt-2">
      <div className="my-col-2 xtl-col">
        <span className="avatar"></span>
      </div>
      <div className="my-col-10 xtl-col">
        <div className="my-tf-18">
          <span id="u_nam">1</span>
        </div>
        <div className="my-tf-12">
          Mob:
          <span id="u_mob">7905321205</span>,
          ID:
          <span id="u_id">264227</span>
        </div>
        <div className="infob"></div>
      </div>
      <div className="my-col-12">
          <div className="srm67b cnn">Change Nick Name</div>
          <div className="srm67b cnn">Change Password</div>
      </div>
    </div>
  </section>

   <section className='myList gap'>
     <div className='list'>
     <span className='icon orderIcon'></span>
     <span className='txt'>Order Record</span>
     <span className='arrow'></span>
     </div>
     <div className='list'>
     <span className='icon financialDetails'></span>
     <span className='txt'>Financial Details</span>
     <span className='arrow'></span>
     </div>
   </section>

   <div className='breakLine2'></div>

   <section className='myList'>
     <div className='list'>
     <span className='icon download'></span>
     <span className='txt'>Download</span>
     <span className='arrow'></span>
     </div>
     <div className='list'>
     <span className='icon followUs'></span>
     <span className='txt'>Follow us</span>
     <span className='arrow'></span>
     </div>
     <div className='list'>
     <span className='icon support'></span>
     <span className='txt'>Support</span>
     <span className='arrow'></span>
     </div>
     <div className='list'>
     <span className='icon complaint'></span>
     <span className='txt'>Complaint</span>
     <span className='arrow'></span>
     </div>
   </section>

   <div className='breakLine2'></div>

   <span id='signOut'>Sign Out</span>
     </div>
    </>
  )
}

export default My