const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
router.get('/', (req, res)=>{
    mysqlConnection.query('SELECT * FROM EMPLOYEE', (err, rows, fields)=>{
        if(!err){
            console.log('Consulta realizada');
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
router.get('/:id',(req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM EMPLOYEE WHERE EMPLOYEE_ID =?',[id],(err, rows)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/', (req,res)=>{
    const {id, nombre, salario} = req.body;
    const query =` CALL saveEdit(?, ?, ?);`;
    console.log(id,nombre,salario);
   mysqlConnection.query(query,[id, nombre, salario], (err, rows) =>{
        if(!err){
            res.json({Status: 'Empleado guardado'});
        }else{
            console.log(err);
        }
   } );
});

router.put('/:id', (req, res)=>{
 const {nombre, salario}  =  req.body;
 const {id} = req.params;
 const query='CALL saveEdit(?,?,?)';
 mysqlConnection.query(query, [id, nombre, salario], (err, rows)=>{
        if(!err){
            res.json({Status:'empleado actualizado'});
        }
 });
});

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM EMPLOYEE WHERE EMPLOYEE_ID =?',[id], (err, rows)=>{
         if(!err){
                res.json({Status:'Empleado eliminado'});
         }else{
             console.log(err); 
         }
    });
});

module.exports = router;