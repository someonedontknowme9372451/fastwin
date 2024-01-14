
const userService = require('../Services/user.service');

const createUserController = async (req, res) => {
  try {
    if (!req.body.mobile || !req.body.password || !req.body.inviteCode) {
      return res.status(400).json({ error: 'Bad Request - Missing required fields' });
    }
    const data = await userService.createUser(req.body.mobile, req.body.password,req.body.inviteCode);
    if(!data){
      res.status(400).json({err:"server error", data:"",success:false})
    }
    return res.status(201).json({err:"", data:data,success:true});
  } catch (error) {
    //  console.error('Error in createUserController:', error.message);
     return res.status(500).json({ error:  error });
  }
};


const findUserController=async(req,res)=>{
   try{
    const response = await userService.findUser(req.body.mobile);
   if(!response){
    return res.status(500).json({error: 'User not exist'})
   }
   if(response.password!=req.body.password){
     return res.status(501).json({error: 'Wrong Password'})
   }
     return res.status(201).json({data:response})


   }catch(err){
    return res.status(400).json({error: `Error fetching user:${err}`})
   }
}

module.exports = { createUserController,findUserController };
