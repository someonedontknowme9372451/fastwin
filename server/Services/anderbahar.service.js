const {AnBModal}= require('../Model/andarbahar.model');

const CreateAnBRecord= async (move,period,time)=>{
    try{
       const create= await AnBModal.create({move,period,time})
       return create
    }catch(err){
        console.log(err);
        throw err
    }
}

const getAnBRecords= async ()=>{
    try{
      const findAll = AnBModal.find().sort({_id:-1}).exec()
      return findAll
    }catch(err){
        console.log(err);
        throw err
    }
}


module.exports={CreateAnBRecord,getAnBRecords}