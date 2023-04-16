import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema(
	{
		name: { type: String },
		slug: { type: String },
		image: { type: String },
		featured: { type: Boolean },
		description: { type: String },
	},
	{ timestamps: true }
);

const Category =
	mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
