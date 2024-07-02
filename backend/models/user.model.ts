
import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';



//Created IUser interface
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
}


//Create Mongoose Schema using the IUser interface
const userSchema = new Schema<IUser>({
//Set timestamps to true:

    //In Mongoose, the timestamps option is used in schema definitions to automatically manage createdAt and updatedAt 
    //properties on your documents. When you set timestamps to true, 
    //Mongoose will add these two date fields to your documents, 
    //and they will be automatically updated whenever you create or modify a document.


  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] //regex 
  },

 

  password: { type: String, required: true },
  avatar: {
    public_id: { type: String, required: true },
    url: { type: String, required: true }
  },
  role: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  courses: [{ courseId: { type: Schema.Types.ObjectId, ref: 'Course' } }]
}, { timestamps: true });

userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Create comparePassword function which return boolean if hashed and original passwords are the same

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


// Compile schema into model
const User = model<IUser>('User', userSchema);
export default User;

//Creating the Model: const User = model<IUser>('User', userSchema); creates a Mongoose model called User, 
//which will be associated with a MongoDB collection named users by default.
//Exporting the Model: export default User; 
//exports the model so it can be imported and used in other parts of your application, 
//such as your service layer or controllers.


