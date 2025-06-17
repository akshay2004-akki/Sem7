import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    fullName:{
        type: String,
        required : true,
        trim: true
    },
    email:{
        type: String,
        required : true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required : true,
        trim: true
    },
    role:{
        type: String,
        enum: ['student', 'instuctor'],
        default: 'student'
    },
    avatar:{
        type: String,
        default: ''
    },
    enrolledCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    refreshToken:{
        type: String
    }
}, {timestamps: true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getAccessToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  return token;
};

userSchema.methods.getRefreshToken = function () {
  const token = jwt.sign(
      {
          _id: this._id,
          role : this.role
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  );
  return token;
}

export const User = model("User", userSchema);