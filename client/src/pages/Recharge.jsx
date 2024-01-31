import './page.css';
import  { useState } from 'react'
import Navbar from '../components/Navbar'
import {useCookies} from 'react-cookie'
const Recharge = () => {
  const [cookie] = useCookies(['balance'])
  const [totalValue, setTotalValue] = useState("");

  function change(value) {
    setTotalValue(value);
  }
  function recharge(){
   // alert(totalValue)
  }
  return (
    <>
    <div>
    <Navbar/>
    <section id='rechargeNav' className='top-nav' >
      <div className='head-1'><span className='txt-1'>Records</span></div>
      <div className='head-2'><span className='txt-2'>Recharge</span></div>
      <div className='head-3'><span className='txt-1'>Help</span></div>
    </section>
    <section id="rechargeBal">
      <span>Balance</span>
      <h2>₹{cookie.balance}</h2>
    </section>
    <section id='rechargeInput'>
      <h4>Amount</h4>
      <span>₹</span><input id='totalValue' value={totalValue} type='text' placeholder='200 ~ 100000' maxLength={6} onChange={(e) => change(e.target.value)}/>
       <hr></hr>
    </section>
    <section id='rechargeAmount'>
      <button className='value' onClick={() => change(200)}>₹200</button>
      <button className='value' onClick={() => change(2400)}>₹2400</button>
      <button className='value' onClick={() => change(4500)}>₹4500</button>
      <button className='value' onClick={() => change(20000)}>₹20000</button>
      <button className='value' onClick={() => change(30000)}>₹30000</button>
      <button className='value' onClick={() => change(45000)}>₹45000</button>

      <div id='rechargeBtn'><button className='btn' onClick={recharge}>Recharge</button></div>
    </section>

    </div>
    </>
  
  )
}

export default Recharge