const table = require("../../../db/blog/tableProduct");

const Read = (req,res) => {
    try {
        const filter = {}
        let result = table.subcategoryProdouct.find(filter).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error)
        });
        console.log(result.then(result[0]));
    } catch (error) {
        res.status(0).send(error);  
    }
}

const Read_ID = (req,res) => {
    try {
        console.log(req.params.id)
        let result = table.subcategoryProdouct.find({subcategoryID:req.params.id}).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error)
        });
        res.send(result)
    } catch (error) {
        console.log("error")
        res.status(0).send(error);  
    }  
}

module.exports = {Read, Read_ID} 