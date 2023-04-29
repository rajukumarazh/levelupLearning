import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
// import { ObjectId } from 'mongodb';

const EnrollmentSchema = mongoose.Schema(
	{
		user: { type: String },
		user_id: { type: mongoose.Schema.Types.ObjectId },
		course_id: { type: mongoose.Schema.Types.ObjectId },
	},
	{ timestamps: true }
);

const Enrollment =
	mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;
