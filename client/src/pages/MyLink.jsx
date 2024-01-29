import { useCookies } from 'react-cookie';
import './page.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseApi from '../api/BaseApi';
import { useEffect, useState } from 'react';

const MyLink = () => {
  const navigate = useNavigate();
  const [inviteLink, setInviteLink] = useState('');
  const [cookie] = useCookies(['invite']); // Changed to useCookies(['invite'])
  const BASE_URL = BaseApi();

  useEffect(() => {
    const userLink = `${BASE_URL}/register?invite=${cookie.invite}`; // Corrected the URL structure
    setInviteLink(userLink);
  }, [BASE_URL, cookie.invite]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success('Link copied successfully', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-message',
      });
    } catch (err) {
      toast.error('Unable to copy link to clipboard', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-message',
      });
    }
  };

  return (
    <div>
      <section id="invitesNav" className="top-nav">
        <div className="back" onClick={() => navigate(-1)}>
          <span className="inviteBack"></span>
        </div>
        <div className="inviteHead">Invite Link</div>
      </section>
      <section id="invitesBody">
        <span className="inviteTxt">*The invitee will get 20 rewards</span>
        <span className="inviteTxt">My invite link</span>
        <div className="inviteLinkBorder">
          <span className="inviteLink">{inviteLink}</span>
        </div>
        <button className="inviteBtn" onClick={handleCopyClick}>
          Copy link and share
        </button>
        <div className="inviteRuleTxt">
          Fastwin's rules and regulations prohibit multiple accounts. You may be blocked if you use multiple accounts or conduct suspicious activities.
        </div>
        <img src="/bn2.jpg" alt="" width="100%" />
      </section>
    </div>
  );
};

export default MyLink;
