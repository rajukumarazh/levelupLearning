import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
// import { ObjectId } from 'mongodb';

const BankSchema = mongoose.Schema(
	{
		// course_id: { type: mongoose.Schema.Types.ObjectId },
		chaper: {
			type: String,
		},
		chapter_theory: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Bank = mongoose.models.Bank || mongoose.model('Bank', BankSchema);

export default Bank;
