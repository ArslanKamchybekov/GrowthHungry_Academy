import mongoose, { Schema, Document, Model } from 'mongoose';
import * as  bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const ACCESS_TOKEN_EXPIRE = '5m'; 
const REFRESH_TOKEN_EXPIRE = '59m'; 
const SECRET_KEY = 'your_secret_key';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword(candidatePassword: string): Promise<boolean>;
  signAccessToken(): Promise<string>;
  signRefreshToken(): Promise<string>;
  
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return emailRegex.test(v);
        },
        message: 'Please enter a valid email address.',
      },
    },
    password: { type: String, required: true, minlength: 6, select: false },
    avatar: {
      public_id: { type: String, required: false },
      url: { type: String, required: false },
    },
    role: { type: String, default: 'user' },
    isVerified: { type: Boolean, default: false },
    courses: [{ courseId: { type: Schema.Types.ObjectId, ref: 'Course' } }],
  },
  { timestamps: true },
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default userModel;

userSchema.methods.signAccessToken = function(): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = { id: this._id, role: this.role };
    const options = { expiresIn: ACCESS_TOKEN_EXPIRE };
    jwt.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

userSchema.methods.signRefreshToken = function(): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = { id: this._id, role: this.role };
    const options = { expiresIn: REFRESH_TOKEN_EXPIRE };
    jwt.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
