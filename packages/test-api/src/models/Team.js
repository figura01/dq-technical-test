import { model, Schema } from "mongoose";

const TeamSchema = new Schema({
    name: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Team = model("Team", TeamSchema);
module.exports = Team;
