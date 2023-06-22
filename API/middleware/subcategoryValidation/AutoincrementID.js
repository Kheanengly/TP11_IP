const table = require("../../db/blog/tableProduct");
const  getNextSequenceValue =  async(req,res,next) => {
    try {
        const sequenceDocument = await table.subcategoryProdouct.find({
            name: req.body.name 
        });
        console.log(sequenceDocument.length);
        if(sequenceDocument.length==0){
            const conter = await table.subcategoryProdouct.find({
            });
            console.log(conter[conter.length-1].subcategoryID);
            req.user = {"subcategoryID":conter[conter.length-1].subcategoryID+1}
        }else{
            res.json({message : "Name's Subcategory have already"})
        }
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
    }
   
}
module.exports = {getNextSequenceValue}