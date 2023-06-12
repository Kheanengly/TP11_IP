const table = require("../../../../db/blog/tableProduct");

const pushshop_price = async (req,res) => {
    if(req.user.ascess==true){
            const add = await table.productProdouct.updateOne(
                {productID:req.body.productID},
                {$push:{store:{shop:req.body.shop,price:req.body.price}}}
              
            )
            res.json({message:"Update Already"})
    }else{
        res.json({message:"ProductID Incorrect"})
    }
    
}

const pullshop_price = async (req,res) => {
    if(req.user.ascess==true){
            const add = await table.productProdouct.updateOne(
                {productID:req.body.productID},
                {$pull:{store:{shop:req.body.shop}}}
              
            )
            res.json({message:"Update Already"})
    }else{
        res.json({message:"ProductID Incorrect"})
    }
    
}
module.exports = {pushshop_price,pullshop_price}