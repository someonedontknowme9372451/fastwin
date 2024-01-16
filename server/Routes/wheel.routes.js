const wheelController =require('../Controllers/wheel.controller');

const routes= (data)=>{
    data.post('/wheel',wheelController.createRecordResponse);
    data.get('/wheel',wheelController.findRecordResponse)
}


module.exports=routes