const mongoose = require('mongoose');
const bcrypt= require('bcrypt') 

const userSchema = new mongoose.Schema({
  id:{type:String, unique:true , require:true},
  mobile: { type: String, unique: true, require:true},
  password:{ type: String, require:true},
  inviteCode:{ type: String, require:true},
  balance:{type:String , require:true},
  name:{type:String, require:true}
});


userSchema.pre("save", async function(){
   this.password = await bcrypt.hash(this.password,12)
})

const User = mongoose.model('User', userSchema);


module.exports = User
