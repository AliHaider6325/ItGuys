import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    age: {
      type: Number,
      // required: true,
      min: 10,
      max: 100,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    skills: {
      type: [String],
      // validate: {
      //   validator: (arr) => arr.length > 0,
      //   message: "At least one skill is required",
      // },
    },

    about: {
      type: String,
      default: "Hi! I am using ITGuys",
      trim: true,
      maxlength: 500,
    },

    photoURL: {
      type: String,
      trim: true,
      default:
        "https://img.freepik.com/premium-photo/cybersecurity-expert-icon-data-protection-specialist-illustration_762678-122325.jpg?semt=ais_incoming&w=740&q=80",
      match: [/^(http|https):\/\/[^ "]+$/, "Invalid URL"],
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);
export default User;
