import { useEffect, useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import BaseApi from '../api/BaseApi';
import ToastMessage from '../components/ToastMessage';
import './page.css';
import bannerImage from '../assets/images/bn2.jpg'

const MyLinkPage = () => {
  const navigate = useNavigate();
  const [inviteLink, setInviteLink] = useState('');
  const [cookie] = useCookies(['invite']);
  const BASE_URL = BaseApi();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSuccessToast, setIsSuccessToast] = useState(true);

  useEffect(() => {
    const userLink = `${BASE_URL}/register?invite=${encodeURIComponent(cookie.invite || '0')}`;
    setInviteLink(userLink);
  }, [BASE_URL, cookie.invite]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      showToastMessage('copy successfully!', true);
    } catch (err) {
      console.error('Error copying link:', err);
      showToastMessage('Failed to copy link. Please try again.', false);
    }
  };

  const showToastMessage = useCallback((message, isSuccess) => {
    setToastMessage(message);
    setIsSuccessToast(isSuccess);
    setShowToast(true);
  }, []);

  const handleCloseToast = () => {
    setShowToast(false);
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
        <img src={bannerImage} alt="" width="100%" />
      </section>
      {showToast && <ToastMessage isSuccess={isSuccessToast} message={toastMessage} onClose={handleCloseToast} autoCloseTimeout={1000} />}
    </div>
  );
};

export default MyLinkPage;
