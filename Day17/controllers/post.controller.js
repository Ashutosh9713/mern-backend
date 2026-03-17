const postmodel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs/index.js")
const { toFile } = require("@imagekit/nodejs/index.js")
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
// const cookie = require("cookie-parser")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
    // console.log(req.body, req.file)
    // we have receave file in buffer formate 

    // post create kr liye caption , imageUrl , userId chaiye 
    // caption or imgurl to req.body se mil jayega but userID hme token se nikalna hoga

    // const token =  req.cookies.token;
    // // console.log(token)
    // if(!token){
    //     res.status(401).json({
    //         message:"Token not provided , UnAuthorized access"
    //     })
    // }
    // // token ko verify kr rhe hai ki token hamare hi server ne create kiya hai ya nhi 
    // // token galat ho to 401 unauthorized acces ka code jana chaiye

    // let decoded = null ; 
    // try{
    //      decoded = jwt.verify(token , process.env.JWT_SECRET);

    // }catch(err){
    //     return res.status(401).json({
    //         message:" User not Unouthorized "
    //     })
    // }


    // console.log(decoded)
    // res.send(decoded)
    // ==========================================================
    // niche ka code file ko cloude pe upload krega or res pe url dega
    // =====================================================
    // we want to add this file to imageKit for cloude storage
    // server se file ko cloude tak pahucha rha hai ye code badle me url de rha hai
    // ====================================

    // const file = await imageKit.files.upload({
    //     file: await toFile(Buffer.from('my bytes'), 'file'),
    //     fileName: 'fileName',
    // });

    const file = await imageKit.files.upload({
        file: req.file.buffer.toString('base64'),
        fileName: req.file.originalname,
    });

    // // ====================================================
    // res.send(file)
    console.log(req.file)
    console.log(req.file.size)


    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message: "Post created successfully",
        post
    })





}

async function getPostController(req, res) {
    // user jo req krra hai uske cookie me token hoga to token me save ho jayega 
 // identify the user
    // =======================================   
    //     const token = req.cookies.token;

    //    //jo token user se aaya hai wo valid hai ya nhi or uske under ka data kya kya hai 

    //     let decoded;
    //     try{
    //          decoded = jwt.verify(token , process.env.JWT_SECRET);
    //     }catch(err){
    //           return res.status(401).json({
    //             message:"Token invalid"
    //           })
    //     }

 // ======================================
    // in above code data is stored in the decoded variable is now in req.user 
    // in middleware identifyUser can identify who is user is and all the user details send in req.user
    // now we can user req.user to access user data          
    // 

    const userId = req.user.id;

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Post Fetched successfully",
        posts
    })


}
async function getPostDetailsController(req, res) {
    //  req.user equal hai decoded ke 

    const userId = req.user.id;

    // api me jo post ki id aata hai 
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }


    return res.status(200).json({
        message: "Posts fetched successfully",
        post
    })


}

module.exports = { createPostController, getPostController, getPostDetailsController };
// controller function ko object me export krna hota ha