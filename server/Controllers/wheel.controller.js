const wheelService= require('../Services/wheel.service')

const createRecordResponse= async (req,res)=>{
   const response = await wheelService.createRecord(req.body.color,req.body.period,req.body.time);
   if(!response){
    res.status(400).json({
        err:"Server error",
        data:'',
        success:false
    })
   }
   res.status(200).json({
    data:response,
    err:'',
    success:true
   })
}

const findRecordResponse= async(req,res)=>{
   const response = await wheelService.getRecord();
   if(!response){
    res.status(400).json({
        err:"Server error",
        data:'',
        success:false
    })
   }
   res.status(200).json({
    data:response,
    err:'',
    success:true
   })
}

module.exports={createRecordResponse,findRecordResponse}