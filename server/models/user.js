import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: 'String', required: true},
  username: { type: 'String', required: true},
  password: {type: 'String', required: true},
  offers: {type: '[offerSchema]', required: true},
})

export default mongoose.model('User', userSchema);
