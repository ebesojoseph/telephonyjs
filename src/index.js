const app =  require('./app');
const {PORT} = require('./utils/constants');
const Client = require('./model/Client');
const Call = require('./model/Call');
const Payment = require('./model/Payment');
const db = require('./utils/database');

console.log(Client.associate?true:false);

(async ()=>{
    db.sync();
})();
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
});