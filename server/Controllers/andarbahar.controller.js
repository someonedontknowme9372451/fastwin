const AnBService= require('../Services/anderbahar.service');

const createAnBResponse = async(req,res)=>{
    const response = await AnBService.CreateAnBRecord(req.body.move,req.body.period,req.body.time);
    if(!response){
      res.status(400).json({
        err:'server error',
        data:null,
        success:true
      })
    }
    res.status(200).json({
      err: false,
      data:response,
      success:true
    })
}

const getAnBRecordsResponse= async(req,res)=>{
  const response = await AnBService.getAnBRecords();
  if(!response){
    res.status(400).json({
      err:'server error',
      data:null,
      success:true
    })
  }
  res.status(200).json({
    err: false,
    data:response,
    success:true
  })
}



module.exports={createAnBResponse,getAnBRecordsResponse}