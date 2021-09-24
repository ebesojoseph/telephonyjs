const { DataTypes, sequelize, Model } = require('sequelize');
const db = require('../utils/database');
class Call extends Model { }

Call.init({
   duration: {
      type: DataTypes.DOUBLE
   },
   unit_price: {
      type: DataTypes.DOUBLE
   },
   recipient_number: {
      type: DataTypes.INTEGER
   },
   Client_phone_number: {
      type: DataTypes.INTEGER
   }
}, {
   timestamps: true,
   paranoid: true,
   freezeTableName: false,
   sequelize: db,
   modelName: 'Call'
}
);
Call.associate = (model) => {
   Call.belongsTo(model.Client, {
      foreignKey: 'Client_phone_number',
      target: 'phone_number',
      constraints:true
   });
};

db.sync();


module.exports = Call;