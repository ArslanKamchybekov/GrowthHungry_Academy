import mongoose, { Schema, Document, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  points: number;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  completedCourses: Array<{ courseId: string }>;
  submissions: Array<{ submissionId: string }>;
  comparePassword(candidatePassword: string): Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
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
    password: { type: String, minlength: 6, select: false },
    avatar: {
      public_id: { type: String, required: false },
      url: { type: String, required: false },
    },
    role: { type: String, default: 'user' },
    points: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    courses: [{ courseId: { type: Schema.Types.ObjectId, ref: 'Course' } }],
    completedCourses: [{ courseId: { type: Schema.Types.ObjectId, ref: 'Course' } }],
    submissions: [{ submissionId: { type: Schema.Types.ObjectId, ref: 'Submission' } }],
  },
  { timestamps: true },
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.SignAccessToken = function(){
  return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN as string)

};

userSchema.methods.SignRefreshToken = function() {
  return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN as string)
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default UserModel;
