import UserModel from '../models/User.js';

export const login = async (req, res) => {
	try {
		const { name } = req.body;

		const isUser = await UserModel.findOneAndUpdate(
			{ name },
			{ socketId: req.body.socketId }
		);

		if (isUser) {
			return res.json({ data: isUser, message: 'Login successful' });
		}

		const newUser = new UserModel({
			name: req.body.name,
			socketId: req.body.socketId,
		});
		const user = await newUser.save();
		return res.json({ data: user, message: 'Login successful' });
	} catch (error) {
		return res.json({ message: 'failed to login' });
	}
};
export const recipient = async (req, res) => {
	try {
		const { name } = req.body;
		const recipient = await UserModel.findOne({ name });

		res.json(recipient);
	} catch (error) {
		return res.json({ message: 'failed to get recipient' });
	}
};
