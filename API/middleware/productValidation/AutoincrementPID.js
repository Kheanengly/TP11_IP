const table = require("../../db/blog/tableProduct");

const IncrementPID = async(req, res, next) => {
    try {
        let ascess;
        const name = await table.productProdouct.find({
            name: req.body.name,
        })
        if(name.length==0){
            const counter = await table.productProdouct.find({})
            ascess = true
            req.counter = {"productID" : counter[counter.length]+1 ,"ascess" : ascess}
        }else{
            ascess = false
            res.json({message : "Name's Product have already"})
        }
      
      
        console.log(req.counter)
        next()
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {IncrementPID};