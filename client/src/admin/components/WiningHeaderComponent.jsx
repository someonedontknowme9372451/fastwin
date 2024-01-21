import './components.css';
import ToggleButton from './ToggleButton';

const WiningHeaderComponent = () => {
  return (
    <div className='wining-header'>
      <div className='wining-row'>
        <div className="wining-col">
          <label className="category-label">
            Fast Parity
            <br/>
            <input type="radio" className="tabbtn" name="tab" value="fast_parity" defaultChecked/>
          </label>      
        </div>
        
        <div className="wining-col">
          <label className="category-label">
            Parity
            <br/>
            <input type="radio" className="tabbtn" name="tab" value="parity" />
          </label>    
        </div>

        <div className="wining-col">
          <label className="category-label">
            Dice
            <br/>
            <input type="radio" className="tabbtn" name="tab" value="dice" />
          </label>      
        </div>
        
        <div className="wining-col">
          <label className="category-label">
            Andar Bahar
            <br/>
            <input type="radio" className="tabbtn" name="tab" value="andar_bahar" />
          </label>    
        </div>
        
        <div className="wining-col">
          <label className="category-label">
            Ludo
            <br/>
            <input type="radio" className="tabbtn" name="tab" value="ludo" />
          </label>      
        </div>
        
        <div className="wining-col">
          <label className="category-label">
            Jet
            <br/>
            <input type="radio" className="tabbtn" name="tab" value="jet" />
          </label>    
        </div>

        <div className="wining-col">
          <label className="category-label">
            Mine Sweeper
            <br/>
            <input type="radio" className="tabbtn" name="tab" value="mine_sweeper" />
          </label>      
        </div>
        
        <div className="wining-col">
          <label className="category-label">
            Spare
            <br/>
            <input type="radio" className="tabbtn" name="tab" value="spare" />
          </label>    
        </div>
      </div>
      <div className='wining-condition'>
        <span className='toggle-tf'>Do you want manual result ?</span>
          <div className='toggle-box'>
          <ToggleButton/>
          </div>
      </div>
    </div>
  );
}

export default WiningHeaderComponent;
