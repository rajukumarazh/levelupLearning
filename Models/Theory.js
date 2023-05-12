import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
// import { ObjectId } from 'mongodb';

const TheorySchema = mongoose.Schema(
	{
		course_id: { type: mongoose.Schema.Types.ObjectId },
		chapter: {
			type: String,
		},
		chapter_theory: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Theory = mongoose.models.Theory || mongoose.model('Theory', TheorySchema);

export default Theory;
