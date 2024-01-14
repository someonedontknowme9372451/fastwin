
const {User} = require('../Model/user.model');

const createUser = async (mobile, password, inviteCode) => {
  try {
    const newData = new User({ mobile, password ,inviteCode});                   
    await newData.save();
    console.log('Data saved successfully');
    return newData;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

const findUser= async (mobile)=>{
  try{
   const  data = await User.findOne({mobile:mobile}).exec();
   return data;
  }catch(error){
    console.log("Error finding data",error)
    throw error;
  }
}

module.exports = { createUser,findUser };
