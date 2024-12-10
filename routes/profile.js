var express = require('express');
var router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error ('JPG eta PNG bakarrik onartzen da'), false);
    }
  };
  
  const upload = multer({ storage: storage , limits: { fileSize: 2000000 } })

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send(`Zure izena: ${req.body.username}. Fitxategia: <a href="http://localhost:3000/uploads/${req.file.filename}"> http://localhost:3000/uploads/${req.file.filename} </a>`);

})


module.exports = router;
