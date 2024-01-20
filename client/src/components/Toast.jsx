import './component.css';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
       autoClose={3000}
       position="bottom-center"
       hideProgressBar
       newestOnTop={false}
       closeButton={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable={false}
       pauseOnHover/>
  )
}

export default Toast