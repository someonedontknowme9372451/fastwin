const mongoose = require('mongoose');

const AnBRecordSchema= new mongoose.Schema({
    move:{type:String,require:true},
    period:{type:String,require:true},
    time:{type:String,require:true}
  })

const AnBModal = mongoose.model('AnBRecord',AnBRecordSchema)

module.exports = {  
  AnBModal,
};
