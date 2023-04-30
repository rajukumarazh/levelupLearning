import { ObjectId } from "mongodb";
import mongoose from "mongoose";
// import { ObjectId } from 'mongodb';

const TheorySchema = mongoose.Schema(
	{
		course_id: { type: mongoose.Schema.Types.ObjectId },
		chapter: {
			type: string,
		},
		chapter_theory: {
			type: Array,
		},
	},
	{ timestamps: true },
);

const Theory = mongoose.models.Theory || mongoose.model("Theory", TheorySchema);

export default Theory;
