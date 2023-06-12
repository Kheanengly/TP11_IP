const table = require("../../../db/blog/tableProduct");

const checkPID = (req,res,next) => {
    const result = table.productProdouct.findOne({productID: req.body.productID});
    if(result.length!=0) {
        message = "";
        ascess = true
    }else{
        ascess = false
        message = "ID's Product incorrect";
    }
    req.user = {"ascess":ascess ,"message":message};
    next()
}
module.exports = {checkPID}