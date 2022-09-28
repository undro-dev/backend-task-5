import PostModel from '../models/Post.js';
import UserModel from '../models/User.js';

export const createPost = async (req, res) => {
	try {
		const { author, title, text, sender } = req.body;
		const mess = new PostModel({ author, title, text, sender });

		await mess.save();

		await UserModel.findOneAndUpdate(
			{ name: sender },
			{ $push: { postsReceive: mess } }
		);
		await UserModel.findOneAndUpdate(
			{ name: author },
			{ $push: { postsSend: mess } }
		);

		res.json({ mess, message: 'Message sent' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'failed to send message' });
	}
};

export const getAllMessageByUserId = async (req, res) => {
	try {
		const { name } = req.body;
		const incomingMessages = await PostModel.find({ sender: name }).sort({
			createdAt: -1,
		});

		return res.json(incomingMessages);
	} catch (error) {
		res.json({ message: 'fail' });
	}
};
export const getSentMessagesToUser = async (req, res) => {
	try {
		const { author, sender } = req.body;
		const messages = await PostModel.find({ sender, author }).sort({
			createdAt: -1,
		});

		return res.json(messages);
	} catch (error) {
		res.json({ message: 'fail' });
	}
};
