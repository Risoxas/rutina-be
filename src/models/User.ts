import {Document, model, Schema} from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin' | 'user';
  clientId: Schema.Types.ObjectId;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true, enum: ['admin', 'user']},
  clientId: {type: Schema.Types.ObjectId, required: false, ref: 'Client'},
  resetPasswordToken: {type: String, required: false},
  resetPasswordExpires: {type: Date, required: false},
})

export const User = model<IUser>('User', UserSchema);