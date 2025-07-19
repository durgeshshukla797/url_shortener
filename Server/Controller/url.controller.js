const shortid =require('shortid')
const URL =require('../Models/url.model')


async function handlegenerateNewShortUrl(req,res){
  const body =req.body;//basically body se url lenge
   const shortID = shortid();

  await URL.create({// this url is our model that we have created
       shortId:shortID,
       // redirectUrl original url hai jo user dega
       redirectUrl:body.url,
       visitHistory:[]
  });

  // last me short id return kar denge jo humne generate kiya 
  return res.json({id: shortID})
}

async function handleGetAnalytics(req,res){
   const shortId =req.params.shortId;

   const result =await URL.findOne({shortId});
   return res.json({
    totalClicks: result.visitHistory.length, analytics: result.visitHistory
   })
}


module.exports={
  handlegenerateNewShortUrl,
  handleGetAnalytics
}