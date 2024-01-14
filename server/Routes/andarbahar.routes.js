const AnBController = require('../Controllers/andarbahar.controller');

const routes=(data)=>{
    data.post('/AnB', AnBController.createAnBResponse)
    data.get('/AnB',AnBController.getAnBRecordsResponse)
}

module.exports=routes