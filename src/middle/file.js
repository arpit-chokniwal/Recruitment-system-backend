const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../uplods'))
    },
    filename: function (req , file, callback) {
        const uniquePrefix = Date.now() + Math.random().toString();
        callback(null, `${uniquePrefix}-${file.originalname}`);
      },
})
  
const upload = multer({storage});
module.exports = upload