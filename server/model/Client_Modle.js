export default (sequelize, DataTypes) => {
    const Client = sequelize.define('client', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      industry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Client;
  };
  