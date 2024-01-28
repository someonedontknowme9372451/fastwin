
const userController = require('../Controllers/user.controller');
const Authenticate = require('../Middlewares/auth')
const routes=(data)=>{
    data.post('/signup', userController.createUserController);
    data.post('/login',userController.findUserController)
    data.post('/',Authenticate)
}

module.exports = routes;
