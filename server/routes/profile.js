const express       = require('express');
const router        = express.Router();
const Profile         = require('../models/Profile');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

// get single article
router.get('/:id', (req, res, next) => {
  Profile.findOne({account:req.params.id}, (err, profile) => {
    if (err)    { return res.json(err).status(500); }
    if (!profile) { return res.json(err).status(404); }

    return res.json(profile);
  });
});
// create a profile esta en user

// update a profiles

router.post('/nofiles',(req,res,next)=>{
 // me hace un update pero quiero que haga patch no put -- preguntar a joss
 let updates;
 console.log("estoy en no files");
 console.log(req.body);

    updates = {
      // birthday   : req.body.birthday,
       sign  : req.body.values.sign,
       quote: req.body.values.quote,
       news:{category:req.body.values.category,
      language:req.body.values.language,
      country:req.body.values.country,
      sources:req.body.sources}
     };
 
  console.log(updates)
  console.log(req.body.userid);
  Profile.findOneAndUpdate({account:req.body.userid}, updates, {new:true})
  .then(item=>res.status(200).json(item))
  .catch(e=>res.status(500).send(e));


});

router.patch('/:id/addimg', upload.single('file'),  (req,res,next)=>{
  const update ={
   profilePic: `/uploads/${req.file.filename}` || req.user.profilePic, 
 }
 console.log("entrando a modificar usuario")
   Profile.findOneAndUpdate({account:req.params.id}, update, {new:true})
 .then(item=>res.status(200).json(item))
 .catch(e=>res.status(500).send(e));
});

// delete article
router.get('/:id/delete', (req,res,next)=>{
  Profile.findOneAndRemove({account:req.params.id})
  .then(items=>res.status(200).json(items))
  .catch(e=>res.status(500).send(e));
});

module.exports = router;
