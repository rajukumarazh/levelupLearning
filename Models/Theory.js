import { ObjectId } from "mongodb";
import mongoose from "mongoose";
// import { ObjectId } from 'mongodb';

const ReportSchema = mongoose.Schema(
	{
		course_id: { type: mongoose.Schema.Types.ObjectId },
		chapter: { type: String },
		details: { type: String },
	},
	{ timestamps: true },
);

const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

export default ReportSchema;
