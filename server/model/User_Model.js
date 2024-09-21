export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user', // 'user', 'admin'
      },
      clientId: {
        type: DataTypes.INTEGER, // Foreign key for assigned client
        allowNull: true,
      },
    });
  
    return User;
  };
  