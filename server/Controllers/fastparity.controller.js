const fastParityService=require('../Services/fastparity.service')

const updateColorRecord= async(req,res)=>{
    const response= await fastParityService.updateColorRecord(req.body.color,req.body.number,req.body.period)
    if(!response){
        res.status(400).json({
            data:'',
            err:'server error',
            success:false
        });
    }
    res.status(200).json({
        data:response,
        err:'',
        success:true
    })
}

const getColorRecord= async(req,res)=>{
    const response = await fastParityService.getColorRecords();
    if(!response){
        res.status(400).json({
            data:'',
            err:'server error',
            success:false
        });  
    }
    res.status(200).json({
        data:response,
        err:'',
        success:true
    })
}

module.exports={updateColorRecord,getColorRecord}

