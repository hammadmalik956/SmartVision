const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a User using; POST "/api/auth/". Doesnot require authentication
router.post('/',[
    body('name','Enter a Valid Name').isLength({min:3}),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Enter Valid Password').isLength({min:8}),
],(req,res)=>{
  
   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => res.json(user))
  .catch(err=>console.log(err))
   

})

module.exports = router;