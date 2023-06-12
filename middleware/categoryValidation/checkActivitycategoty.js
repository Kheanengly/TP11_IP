
const {create_categoryValidation,update_categoryValidation,delete_categoryValidation} = require("../validation/categoryValidation.js");

function check_createCategory(req,res,next){
    const data=req.body;
    const {error}=create_categoryValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

function check_updateCategory(req,res,next){
    console.log(req.body);
    const data=req.body;
    const {error}=update_categoryValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

function check_deleteCategory(req,res,next){
    console.log(req.body);
    const data=req.body;
    const {error}=delete_categoryValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}
module.exports = {check_createCategory,check_updateCategory,check_deleteCategory}