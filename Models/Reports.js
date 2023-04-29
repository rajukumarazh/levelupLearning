import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
// import { ObjectId } from 'mongodb';

const ReportSchema = mongoose.Schema(
	{
		user_id: { type: mongoose.Schema.Types.ObjectId },
		buyedCourse: { type: Object },
	},
	{ timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema);

export default ReportSchema;
