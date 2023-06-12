
var multer = require('multer');
var path = require("path");


var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')  
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
});


var upload = multer({ storage: storage 
    ,fileFilter: function(req,file,callback){
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg"){
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