import db from '../config/db.js';

const User = db.user;
const Client = db.client;

// Assign client to user
export const assignClientToUser = async (req, res) => {
  const { clientId } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const client = await Client.findByPk(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    user.clientId = clientId;
    await user.save();
    req.io.emit('receiveUpdate', { type: 'userUpdate', user });

    return res.status(200).json({ message: 'Client assigned successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error assigning client', error: error.message });
  }
};

// Update user details
export const updateUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(req.body);
    req.io.emit('receiveUpdate', { type: 'userUpdate', user });

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Update client details
export const updateClientDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    await client.update(req.body);
    req.io.emit('receiveUpdate', { type: 'clientUpdate', client });

    return res.status(200).json({ message: 'Client updated successfully', client });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating client', error: error.message });
  }
};
