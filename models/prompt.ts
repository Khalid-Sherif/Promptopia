import { Schema, model, Model, models } from "mongoose";

interface UserPrompt {
  creator: Schema.Types.ObjectId;
  prompt: string;
  tag: string;
}

const PromptSchema: Schema<UserPrompt> = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt: Model<UserPrompt> =
  models.Prompt || model<UserPrompt>("Prompt", PromptSchema);

export default Prompt;
