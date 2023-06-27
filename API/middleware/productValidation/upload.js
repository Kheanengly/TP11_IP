
var multer = require('multer');
var path = require("path");


var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../Product Store/Product/uploads')  
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        console.log("here", ext)
        console.log("", file.originalname)
        req.image =  file.originalname
        cb(null,file.originalname+ ext)

      
    }
});


var upload = multer({ storage: storage 
    ,fileFilter: function(req,file,callback){
        console.log("", file.mimetype)      
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            callback(null, true)
            
        }else{
            console.log("only png & jpg file support")
            callback(null, false)
        }
        
    },limits : {
         fieldSize : 1024 * 1024 * 2   
    }
});
module.exports = {upload};