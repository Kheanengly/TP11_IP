const table  = require("../../db/blog/tableProduct");

const checkSIDAvalibale_forDelete = async(req,res,next) => {
    const result = await table.subcategoryProdouct.find({subcategoryID: req.body.subcategoryID})
    let ascess;
    let message;
    console.log(result.length)
    if(result.length==1){
        ascess = true;
        message = "";
    }else{
        ascess = false;
        message = "ID's Subcategory incorrect"
    }
    req.user = {"ascess":ascess ,"message":message};
    next()
  
}
module.exports = {checkSIDAvalibale_forDelete}