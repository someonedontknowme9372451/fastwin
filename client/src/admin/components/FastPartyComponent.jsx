import { useState } from 'react';
import './components.css';
import CountDown from './CountDown';

const FastPartyComponent = () => {
  const [checkedIndex, setCheckedIndex] = useState(null);
  const colors = [
    { name: 'Red+Violet',code:'#6655d3'},
    { name: 'Green', code: '#090' },
    { name: 'Red', code: '#f00' },
    { name: 'Green', code: '#090' },
    { name: 'Red', code: '#f00' },
    { name: 'Green+Violet', code: '#6655d3' },
    { name: 'Red', code: '#f00' },
    { name: 'Green', code: '#090' },
    { name: 'Red', code: '#f00' },
    { name: 'Green', code: '#090' },
  ];
  const handleCheckboxChange = (index) => {
    // setIndex(index)
    if (checkedIndex !== null) {
      return;
    }
    setCheckedIndex(index);
  };

  return (
    <div className='fast-box'>
        <div className='table-timer'>
           <CountDown key={1} countdown={'67'} period={'89077889000'}/>
        </div>
        <div className='table-box'>
            <table className="table">
                <thead>
                <tr role="row">
                    <th className="sorting_disabled" style={{ width: '100px' }}>Result</th>
                    <th className="sorting_disabled" style={{ width: '100px' }}>No. of Users</th>
                    <th className="sorting_disabled" style={{ width: '100px' }}>Amount</th>
                    <th className="sorting_disabled" style={{ width: '100px' }}>Number</th>
                    <th className="sorting_disabled" style={{ width: '100px' }}>Amount</th>
                    <th className="sorting_disabled" style={{ width: '39px' }}>Action</th>
                </tr>
                </thead>
                <tbody id="betdetail" className='tbody'>
                {colors.map((color, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                    <td style={{background:color.code}}>
                        <span style={{ color:'#fff',fontWeight:'500', fontFamily:'sans-serif'}}>{color.name}</span>
                    </td>

                    <td className="text-orange">wait..</td>

                    <td className="text-orange">wait..</td>
                    <td className='text-black'>{index}</td>
                    <td className="text-orange">wait..</td>
                    <td>
                        <label>
                        <input
                            type="checkbox"
                            name={`checkbox-${index}`}
                            checked={index === checkedIndex}
                            onChange={() => handleCheckboxChange(index)}
                            disabled={checkedIndex !== null}
                        />
                        {/* Check */}
                        </label>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
      </div>
    </div>
  );
};

export default FastPartyComponent;
