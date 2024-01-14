const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: { type: String, unique: true, require:true},
  password:{ type: String, require:true},
  inviteCode:{ type: String, require:true}
});

const fastRecordSchema = new mongoose.Schema({
  color: { type: String, required: true },
  number: { type: String, required: true },
  period: { type: String, required: true },
  time: { type: String, required: true }
});

const parityRecordSchema= new mongoose.Schema({
  color: { type: String, required: true },
  number: { type: String, required: true },
  period: { type: String, required: true },
  time: { type: String, required: true }
})
const diceRecordSchema= new mongoose.Schema({
  number: { type: String, required: true },
  period: { type: String, required: true },
  time: { type: String, required: true }
})

const wheelRecordSchema= new mongoose.Schema({
  color:{type:String,require:true},
  period:{type:String,require:true},
  time:{type:String,require:true},
})

const AnBRecordSchema= new mongoose.Schema({
  move:{type:String,require:true},
  period:{type:String,require:true},
  time:{type:String,require:true}
})


const User = mongoose.model('User', userSchema);
const FastRecordModel = mongoose.model('FastRecord', fastRecordSchema);
const ParityRecordModel = mongoose.model('ParityRecord', parityRecordSchema);
const DiceRecordModel = mongoose.model('DiceRecord', diceRecordSchema);
const wheelModal=mongoose.model('WheelRecord',wheelRecordSchema)
const AnBModal = mongoose.model('AnBRecord',AnBRecordSchema)

module.exports = {
  User,
  FastRecordModel,
  wheelModal,
  AnBModal,
  ParityRecordModel,
  DiceRecordModel
};
