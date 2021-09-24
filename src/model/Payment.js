const { Model, Sequelize, DataTypes, } = require("sequelize");
const db = require('../utils/database');

class Payment extends Model { }
Payment.init({
   amount: {
      type: DataTypes.INTEGER
   },
   method: {
      type: DataTypes.STRING
   },
   Client_phone_number: {
      type: DataTypes.INTEGER
   }
}, {
   timestamps: true,
   paranoid: true,
   freezeTableName: true,
   sequelize: db,
   modelName: 'Payment'
}
);
Payment.associate = (model) => {
   Payment.belongsTo(model.Client, {
      foreignKey: 'Client_phone_number',
      target: 'phone_number'
   });
};


db.sync();

module.exports = Payment;