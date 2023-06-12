const table  = require("../../db/blog/tableProduct");

const checkCategoryAvalibaleID = async(req,res,next) => {
    const result = await table.categoryProdouct.find({categoryID: req.body.categoryID})
    let ascess;
    let message;
    console.log("cID",result.length)
    if(result.length==1){
        ascess = true;
        message = "";
    }else{
        ascess = false;
        message = "ID's Category incorrect"
    }
    req.user = {"ascess":ascess ,"message":message};
    next()
}
module.exports = {checkCategoryAvalibaleID}