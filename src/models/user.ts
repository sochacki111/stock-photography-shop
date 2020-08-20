import mongoose, { Schema, Document } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface PhotoInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  {
    timestamps: true // created_at / updated_at
  }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model<PhotoInterface>('User', UserSchema);

export default User;
