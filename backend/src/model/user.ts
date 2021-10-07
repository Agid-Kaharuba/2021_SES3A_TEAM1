import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../helpers/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const uniqueValidator = require('mongoose-unique-validator');

export interface IUser {
  _id: string;
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  staffid: {
    type: String,
    required: false,
  },
  isSupervisor: {
    type: Boolean,
    required: true,
  },
  archive: {
    type: Boolean,
    required: false,
  },
},
{ collection: 'users' });

UserSchema.methods.checkPassword = async function (plainPass) {
  // @ts-ignore
  const user: IUser = this;
  return bcrypt.compare(plainPass, user.password);
};

UserSchema.pre('save', function (next) {
  // @ts-ignore
  const user: IUser = this;
  bcrypt.hash(user.password, config.SALT, (err, hash) => {
    user.password = hash;
    next();
  });
});

UserSchema.plugin(uniqueValidator);
export default mongoose.model('User', UserSchema);
