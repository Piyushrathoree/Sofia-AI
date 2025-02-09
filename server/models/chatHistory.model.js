import mongoose, { Schema } from "mongoose";

const historySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    messages: [
        {
            userPrompt: { type: String, required: true },
            aiResponse: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const History = mongoose.model("History", historySchema);
