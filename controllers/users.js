import UserModel from '../models/User.js';

export const getAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		return res.json(users);
	} catch (error) {
		res.json({ message: 'users not received' });
	}
};
