
const table = require("../../../../db/blog/tableProduct");
const update = async (req,res) => {
    try {
        console.log(JSON.stringify(req.body));
        if(req.user.ascess == true) {
            
            const result = await table.productProdouct.updateMany(
                {productID: req.body.productID},
                {$set:req.body}
            )
           
            console.log(result);
            if(result.modifiedCount != 0 && result.acknowledged == true){
                res.json({update: true,message: "Update Success"})
            }else{
                res.json({update: false,message: "Update not Success"})
            }
            
        }else{
            res.json({update: false,message: req.user.message})
        }
    } catch (error) {
        console.log(error);
        // res.json({update: false,message: "Update not Success",error})
    }
}

module.exports = {update}