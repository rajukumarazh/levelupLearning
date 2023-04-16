import mongoose from "mongoose";

// connecting to database
const connectDB = async () => {
	const connectionUrl =
		"mongodb+srv://raju:Ra%409058837496@cluster0.kjkyk5j.mongodb.net/cluster0?retryWrites=true&w=majority";
	mongoose
		.connect(connectionUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log(`Database connected successfully`))
		.catch((err) =>
			console.log("Getting Error from DB connection" + err.message),
		);
	mongoose.set("strictQuery", false);
};

export default connectDB;
