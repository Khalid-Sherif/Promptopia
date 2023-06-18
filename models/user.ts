import mongoose, { Schema, model, Model, models } from "mongoose";

interface UserDocument extends mongoose.Document {
  email: string;
  username: string;
  image?: string;
}

const UserSchema: Schema<UserDocument> = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    validate: {
      validator: async function (email: string): Promise<boolean> {
        const user = await User.findOne({ email });
        return !user;
      },
      message: "Email already exists!",
    },
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User: Model<UserDocument> =
  models.User || model<UserDocument>("User", UserSchema);

export default User;
