const table = require("../../../db/blog/tableProduct");

const Read = async (req,res) => {
    try {
        const result = await table.productProdouct.find({});
        let message;
        let ascess;
        if(result.length == 0) {
            message="There are not Product in this Subcategory";
            ascess=false;
        }else{
            message="There are Product in this Subcategory";
            ascess=true;
        }
        res.json({
            message:message,
            ascess:ascess,
            data : result
        })
    } catch (error) {
        res.status(0).json({
            message:error,
        })
    }    

}

module.exports = {Read}