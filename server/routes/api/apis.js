const express       = require('express');
const router        = express.Router();
const quote = require("stoic-api");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3b4af330ce004204bc4122457cb415a6');
const User           = require("../../models/user");
const Profile           = require("../../models/Profile");


// randomo joke 
router.get("/",(req,res,next) =>{
  
    quote.random(  (err, quote)=> {
        if (err)    { return res.json(err).status(500); }
        if (!quote) { return res.json(err).status(404); }
        return res.json(quote);
      });

});

router.get("/news", (req,res,next) => {
  Profile.findOne({account:req.user._id}, (err, profile) => {
    if (err)    { return res.json(err).status(500); }
    if (!profile) { return res.json(err).status(404); }
    return res.json(profile);
    const features={
      sources: '',
      q: 'football',
      category: 'sports',
      language: '',
      country: ''
    };
    newsapi.v2.topHeadlines(features).then(response => {
      return res.json(response)
    });
    
  });

});

module.exports = router;