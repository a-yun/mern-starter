import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  username: { type: 'String', require: true },
  companyName: { type: 'String', required: true },
  salaryFormat: { type: 'String', required: true },
  salary: { type: 'Number', required: true },
  duration: { type: 'Number', required: true },
  cuid: { type: 'String', required: true },
  location: { type: 'String', required: true },
  corporateHousing: { type: 'Boolean', required: true },
  housingStipend: { type: 'Number', required: true },
  meals: { type: 'Number', required: true },
});

export default mongoose.model('Offer', offerSchema);
