import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
	{
		author: {
			type: String,
		},
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		sender: {
			type: String,
			required: true,
		},
	},

	{ timestamps: true }
);

export default mongoose.model('Post', PostSchema);
