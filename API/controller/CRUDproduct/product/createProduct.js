const table = require("../../../db/blog/tableProduct");

const Create = async (req, res) => {
    // console.log(req.user);
    if(req.user.ascess == true){
        console.log(req.body);
        try {
            const {name,subcategoryID,store} = req.body;
            console.log(req.body);
            let result = new table.productProdouct({
                name: name,
                subcategoryID: subcategoryID,
                productID : req.user.productID,
                image : req.user.image,
                store : store,
                
            })
            console.log(result)
            if(req.file){
                result.image = req.file.path
            }
            // console.log(req.file.path)
          
            await result.save()
            // console.log(result)
           
            return res.json({"message" : "Create new Product already"}) 
        } catch (error) {
            res.status(500).send(error)
            console.log(error)  
        }
       
    }else{
        res.json({"message" : req.user.message,"error":true}) 
    }
}

module.exports = {Create}



