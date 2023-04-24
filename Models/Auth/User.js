import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
	{
		First_Name: { type: String },
		Last_Name: { type: String },
		Email: { type: String },
		// Phone_Number: { type: String },
		Password: { type: String },
		Confirm_Password: { type: String },
	},
	{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
