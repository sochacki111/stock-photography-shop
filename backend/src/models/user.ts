import { Schema, Document, HookNextFunction, model } from 'mongoose';
import bcrypt from 'bcrypt';

// TODO Extract interfaces to /interfaces
export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // created_at / updated_at
  }
);

// mongoose requires it
// eslint-disable-next-line func-names
UserSchema.pre<IUser>('save', async function (
  next: HookNextFunction
): Promise<HookNextFunction> {
  // mongoose requires it
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  return next();
});

// mongoose requires it
// eslint-disable-next-line func-names
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', UserSchema);

export default User;
