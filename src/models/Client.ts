import {Document, Schema, model, Types} from 'mongoose';

export interface IClient extends Document {
  name: string;
  lastName: string;
  middleName?: string;
  secondLastName?: string;
  age: number;
  objective?: string;
  lastUpdate: Date;
  creationDate: Date;
  weight: number;
  height: number;
  active: boolean;
  routines: [{
    weekDay: number;
    exercises: {
      [key:string]: Types.ObjectId[]
    };
    notes?: string;
  }]
  weightsHistory: [{
    exerciseId: Types.ObjectId;
    weight: number;
    date: Date;
  }]
}

const ClientSchema = new Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  middleName: {type: String, required: false},
  secondLastName: {type: String, required: false},
  age: {type: Number, required: true},
  objective: {type: String, required: false},
  lastUpdate: {type: Date, default: Date.now()},
  creationDate: {type: Date, default: Date.now()},
  weight: {type: Number, required: true},
  height: {type: Number, required: false},
  active: {type: Boolean, default: true},
  routines: [{
    weekDay: {type: Number, required: true},
    exercises: {type: Schema.Types.Mixed, required: true},
    notes: {type: String, required: false},
  }],
  weightsHistory: [{
    exerciseId: {type: Schema.Types.ObjectId, required: true},
    weight: {type: Number, required: true},
    date: {type: Date, required: true},
  }]
});

export const Client = model<IClient>("Client", ClientSchema);