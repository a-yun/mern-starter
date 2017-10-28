import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  companyName: { type: 'String', required: true },
  salaryFormat: { type: 'String', required: true },
  salary: { type: 'Double', required: true },
  duration: { type: 'Integer', required: true },
  cuid: { type: 'String', required: true },
  location: { type: 'String', required: true},
  corporateHousing : { type: 'Boolean', required: true},
  housingStipend: { type: 'Double', required: true},
  meals: { type: 'Integer', required: true},
  //dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Offer', offerSchema);
