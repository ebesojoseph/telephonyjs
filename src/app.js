const express =  require('express');
const PaymentRoutes = require('./routes/payment_routes')
const ClientRoutes =  require('./routes/client_routes');
const BillRoutes = require('./routes/bill_routes');
const CallRoutes = require('./routes/call_routes');
const app = express();

app.use(PaymentRoutes);
app.use(ClientRoutes);
app.use(BillRoutes);
app.use(CallRoutes);

module.exports = app;
