
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const MyLink = () => {
  const navigate=useNavigate()
  const userLink="https://fastwin.app/LR?RG&C=2326422753"

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(userLink);
      toast.success("copy successfully",{
        position: toast.POSITION.BOTTOM_CENTER,
        className:"toast-message"
        })
    } catch (err) {
      toast.error("Unable to copy text to clipboard",{
        position: toast.POSITION.BOTTOM_CENTER,
        className:"toast-message"
        })
    }
  };
  return (
    <div>
      <section id='invitesNav' className='top-nav'>
      <div className='back' onClick={()=>{navigate(-1)}}> <span className='inviteBack'></span> </div> <div className='inviteHead'>Invite Link</div>
      </section>
      <section id='invitesBody'>
         <span className='inviteTxt'>*The invitee will get 20 reward </span>
         <span className='inviteTxt'> My invite link</span>
         <div className='inviteLinkBorder'> <span  className='inviteLink'>{userLink}</span></div>
         <button className='inviteBtn' onClick={handleCopyClick}>Copy link and share</button>
         <div className='inviteRuleTxt'>Fastwin's rules and regulations prohibit multiple accounts. You may be blocked if you use multiple accounts or conduct suspicious activities.</div>
         <img src="/bn2.jpg" alt="" width='100%'/>
      </section>
    </div>
  )
}

export default MyLink