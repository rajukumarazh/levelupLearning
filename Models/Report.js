import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
// import { ObjectId } from 'mongodb';

const ReportSchema = mongoose.Schema(
	{
		course_id: { type: mongoose.Schema.Types.ObjectId },
		user_id: { type: mongoose.Schema.Types.ObjectId },
	},
	{ timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema);

export default Report;
