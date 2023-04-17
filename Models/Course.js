import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema(
	{
		name: { type: String },
		price: { type: Number },
		image: { type: String },
		category: { type: String },
		description: { type: String },
	},
	{ timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

export default Course;
