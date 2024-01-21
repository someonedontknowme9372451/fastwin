import './components.css';

const ToggleButton = () => {
  return (
    <div>
      <input type="checkbox" name='checkbox' className='toggle' id='toggle'/>
      <label htmlFor="toggle" className='switch'></label>
    </div>
  )
}

export default ToggleButton
