import db from '../config/db.js';

// Models
const Client = db.client;

// Get client by ID
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'assignedUserId']
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update client details
export const updateClientDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, assignedUserId } = req.body;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Update client details
    client.name = name || client.name;
    client.email = email || client.email;
    client.assignedUserId = assignedUserId || client.assignedUserId;

    await client.save();

    return res.status(200).json({ message: 'Client updated successfully', client });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Assign a user to a client
export const assignUserToClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Assuming that the User model exists and users can be assigned to clients
    const user = await db.user.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assign the user to the client (this can be modeled differently based on your database structure)
    client.assignedUserId = user.id;

    await client.save();

    return res.status(200).json({ message: 'User assigned to client successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
