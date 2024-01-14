const fastParityController=require('../Controllers/fastparity.controller');

const routes= (data)=>{
    data.post('/color-records/fast-parity',fastParityController.updateColorRecord)
    data.get('/get-color-records/fast-parity',fastParityController.getColorRecord)
}

module.exports=routes