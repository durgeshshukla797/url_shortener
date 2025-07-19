const express =require('express')
const {handleGetAnalytics,handlegenerateNewShortUrl} = require('../Controller/url.controller')

const router = express.Router();


router.post('/',handlegenerateNewShortUrl);

router.get('/analytics/:shortid',handleGetAnalytics);
module.exports=router;