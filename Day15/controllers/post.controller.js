const postmodel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
// const cookie = require("cookie-parser")

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function createPostController(req, res) {
    // console.log(req.body, req.file)
    // we have receave file in buffer formate 

    // post create kr liye caption , imageUrl , userId chaiye 
    // caption or imgurl to req.body se mil jayega but userID hme token se nikalna hoga

    const token =  req.cookies.token;
    // console.log(token)
    if(!token){
        res.status(401).json({
            message:"Token not provided , UnAuthorized access"
        })
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    console.log(decoded)

    const post = await postModel.create({
          caption:req.body.caption,
          imgUrl:file.url,
          user:decoded.id
    })
    res.status(201).json({
        message:"Post created successfully",
        post
    })

    // res.send(decoded)


    
    //==========================================================
    // niche ka code file ko cloude pe upload krega or res pe url dega
    // =====================================================
    // we want to add this file to imageKit for cloude storage
    // server se file ko cloude tak pahucha rha hai ye code badle me url de rha hai
    // ====================================
    // const file = await client.files.upload({
    //     file: await toFile(Buffer.from('my bytes'), 'file'),
    //     fileName: 'fileName',
    // });
    // // ====================================================
    // res.send(file)
}

module.exports = { createPostController };
// controller function ko object me export krna hota ha