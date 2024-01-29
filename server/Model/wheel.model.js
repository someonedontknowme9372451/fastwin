const mongoose = require('mongoose');

const wheelRecordSchema= new mongoose.Schema({
    color:{type:String,require:true},
    period:{type:String,require:true},
    time:{type:String,require:true},
  })

  const wheelModal=mongoose.model('WheelRecord',wheelRecordSchema)


  module.exports = wheelModal