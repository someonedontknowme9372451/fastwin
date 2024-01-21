import FastPartyComponent from '../components/FastPartyComponent'
import WiningHeaderComponent from '../components/WiningHeaderComponent'
import './page.css'


const ManageWining = () => {
  return (
    <div style={{background:'#ECF0F5', height:'150vh' ,paddingLeft:'15px',paddingRight:'15px',width:'100%',}}>
        <WiningHeaderComponent/>
        <FastPartyComponent/>
    </div>
  )
}

export default ManageWining
