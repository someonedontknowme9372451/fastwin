
const userController = require('../Controllers/user.controller');

const routes=(data)=>{
    data.post('/user', userController.createUserController);
    data.post('/login',userController.findUserController)
}

module.exports = routes;
