const fastParityController=require('../Controllers/fastparity.controller');

const routes= (data)=>{
    data.post('/api/v1/fastParity',fastParityController.updateColorRecord)
    data.get('/api/v1/fastParity',fastParityController.getColorRecord)
}

module.exports=routes