const express = require('express');
const app = express();
//Configuración
app.set('port', process.env.PORT || 3000);
//Middlewares-> Se ejecutan antes de que se realiza antes de una función
app.use(express.json());
//Routes
app.use(require('./routes/employes'));
//Servidro en el puero 300
app.listen(app.get('port'),()=>{
    console.log('Server on port ', app.get('port'));
});