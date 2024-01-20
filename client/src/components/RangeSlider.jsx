import './component.css';
const RangeSlider = ({ min, max, value, onChange }) => {

  return (
    <form style={{ '--min': min, '--max': max, '--val': value }}>
      <input type="range" min={min} max={max} value={value} onChange={onChange} list="l" />
    </form>
  );
};

export default RangeSlider;
