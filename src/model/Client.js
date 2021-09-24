const { DataType, sequelize, Model, DataTypes } = require('sequelize');
const db = require('../utils/database');

export default class Client extends Model { }

Client.init({
   full_name: {
      type: DataTypes.STRING
   },
   phone_number: {
      type: DataTypes.INTEGER,
      primaryKey:true,
   },
   address: {
      type: DataTypes.STRING
   },
}, {
   timestamps: true,
   paranoid: true,
   freezeTableName: true,
   sequelize: db,
   modelName: 'Client'
}
);

Client.associate = (model) => {
   Client.hasMany(model.Call, {
      foreignKey: 'Client_phone_number',
      target: 'phone_number',
      constraints:true
   });


   Client.hasMany(model.Payment, {
      foreignKey: 'Client_phone_number',
      target: 'phone_number',
      constraints:true
   });
};


db.sync();

module.exports = Client;