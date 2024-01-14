const wheelController =require('../Controllers/wheel.controller');

const routes= (data)=>{
    data.post('/wheel?action=post',wheelController.createRecordResponse);
    data.get('/wheel',wheelController.findRecordResponse)
}


module.exports=routes