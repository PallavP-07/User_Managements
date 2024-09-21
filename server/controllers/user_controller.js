import db from '../config/db.js';

// Models
const User = db.user;

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'role']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user details
export const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Assign a client to a user
export const assignClientToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientId } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming that the Client model exists and clients can be assigned to users
    const client = await db.client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Assign the client to the user (this can be modeled differently based on your database structure)
    await user.addClient(client);

    return res.status(200).json({ message: 'Client assigned to user successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
