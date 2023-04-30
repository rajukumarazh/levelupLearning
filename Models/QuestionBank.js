import { ObjectId } from "mongodb";
import mongoose from "mongoose";
// import { ObjectId } from 'mongodb';

const QuestionBankSchema = mongoose.Schema(
	{
		course_id: { type: mongoose.Schema.Types.ObjectId },
		theory_id: { type: mongoose.Schema.Types.ObjectId },
		questions: { type: String },
		details: { type: String },
		tags: { type: String },
		answers: [
			{
				currect_answer: String,
				options: [String],
			},
		],
	},
	{ timestamps: true },
);

const Report =
	mongoose.models.Report || mongoose.model("Report", QuestionBankSchema);

export default Report;
