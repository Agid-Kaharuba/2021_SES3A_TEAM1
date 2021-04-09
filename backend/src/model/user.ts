import mongoose from "mongoose";
import bcrypt from "bcrypt";
const uniqueValidator = require("mongoose-unique-validator");

export interface IUser {
	_id: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    index: {unique: true, dropDups: true}
  },
  password: {
    type: String,
    required: true
  },
},
{collection: 'users'})

UserSchema.pre("save", function(next) {
  // @ts-ignore
  const user: IUser = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    user.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function (plainPass) {
  // @ts-ignore
  const user: IUser = this;
  
  return (bcrypt.compare(plainPass, user.password));
};

UserSchema.plugin(uniqueValidator);
export default mongoose.model('User', UserSchema);