import './component.css';
import { useState } from "react";

const BottomDialog = ({value,isDialog}) => {
 const [isContractValue, setIsContractValue] = useState('10')

  const toggleDialog = () => {
    isDialog(false);
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleDialog();     
    }
  };

  const handleContractMoney=(value)=>{
   setIsContractValue(value);
  }

  return (
    <>
    {isDialog &&
   <div className="backdrop" onClick={handleBackdropClick}>
   <div className="bottom-dialog">
     <div className={`dialog ${value}`}>
     Join {value}
    </div>
    <div className="bfard">
       <div className="col-6 bfard-txt">
         ₹<span className="tf-28" id="u_bal">2.70</span>
       </div>
       <div className="col-6 bfard-btn">
         <div className="rc-wal">Recharge</div>
       </div>
     </div>
     <div className="contract-row">
       <div className="col-12">Contract Money</div>
       <div className="col-12">
         <div className={`cont-amt ${isContractValue ==='10' ? value :''}`} onClick={() => handleContractMoney('10')}>
           10
         </div>
         <div className={`cont-amt ${isContractValue ==='100' ? value :''}`} onClick={() => handleContractMoney('100')}>
           100
         </div>
         <div className={`cont-amt ${isContractValue ==='1000' ? value :''}`} onClick={() => handleContractMoney('1000')}>
           1000
         </div>
         <div className={`cont-amt ${isContractValue ==='10000' ? value :''}`} onClick={() => handleContractMoney('10000')}>
           10000
         </div>
       </div>
     </div>
     <div className="num-row">
       <div className="col-12">
         <div className="silb">Number</div>
         <div className="num-row-box">
           <div className="col-5 xtl ">
             <span className="xpan">
               -5
             </span>
             <span className="xpan">
               -1
             </span>
           </div>
           <div className="col-2 xtc">
             <span className="xnum">
               1
             </span>
           </div>
           <div className="col-5 xtr">
             <span className="xpan">
               +1
             </span>
             <span className="xpan">
               +5
             </span>
           </div>
         </div>
       </div>
       <div className="col-12 mt-2 tf-16">
         Total contract money is <span id="tca">10</span>
       </div>
     </div>
     <div className="btn-row">
       <div className="col-12">
         <div className={`btn-con newod ${value}`} id="nod">
           Confirm
         </div>
       </div>
     </div>
   </div>
   </div>
    }
    </>

 
  );
  
};

export default BottomDialog;
