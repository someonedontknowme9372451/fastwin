const fastParityController=require('../Controllers/fastparity.controller');

const routes= (data)=>{
    data.post('/api/v1/fastParity',fastParityController.createRecordResponse)
    data.get('/api/v1/fastParity',fastParityController.getRecordResponse)
}

module.exports=routes