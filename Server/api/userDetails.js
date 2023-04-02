import express from "express"
import MentorShalaDAO from './dao/MentorShalaDAO.js'
import fetchDetailsCtrl from './controller/fetchDetailsCtrl.js'
import updateDetailsCtrl from "./controller/updateDetailsCtrl.js"
import postFeedCtrl from "./controller/postDetailCtrl.js"
import multer from 'multer'

const upload = multer({ dest: './imgUpload/' })
const router=express.Router()

router.route(`/get/:role/details`).get(async(req,res)=>{
    const role=req.params.role
    // console.log(role);
    const data=await fetchDetailsCtrl.getapiUsers(role)
    // console.log(data);
    res.send(data)
})
router.route("/getFeeds").get(async(req,res)=>{
    const data=await fetchDetailsCtrl.getapiFeeds()
    // console.log(data);
    res.send(data)
})
router.post('/createUser',upload.single('media'),async(req,res)=>{
    console.log(req.body);
    const obj={
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "profilePic":"https://i.pinimg.com/originals/36/fa/7b/36fa7b46c58c94ab0e5251ccd768d669.jpg",
        "banner":"https://images.unsplash.com/photo-1581882897974-fca44f329313?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
        "from":req.body.from,
        "country":req.body.country,
        "college":req.body.college,
        "specialization":req.body.specialization,
        "description":req.body.description,
        "experience": req.body.experience.split(","),
          "Linkedin":req.body.Linkedin,
          "Email":req.body.Email,
          "Password":"123",
          "report":0,
          "match_list":[],
          "profile_match_list":[],
          "dont_show_again":[],
          "username":req.body.username,
          "role":req.body.role,

    }
    // const {email,firstname,lastname,specialization,country,from,college,description}=req.body;
    // if(!email||!firstname||!lastname||!specialization||!country||!from||!college||!description){
    //     return res.status(422).json({error:'pls fill field properly'});
    // }
    // try{
    //     const userExist=await User.findOne({email:email});
    //     if(userExist){
    //         return res.status(422).json({error:'Email already Exist'});
    //     }
    //     else{
    //         const user=new User({email,firstname,lastname,specialization,country,from,college,description});
        
    //     await newData.save();
    //     res.status(201).json(newData);
    //     }
    // }
    // catch(error){
    //     req.status(409).json({message:error.message});
    // }
    try{
        await postFeedCtrl.postapiUsers(obj)
    }
    catch{
        console.log("can't register");
    }
    res.redirect('https://mentorshala.netlify.app/main')
})
router.post("/postFeeds",upload.single('media'),async(req,res)=>{

    // console.log(req.body);
    // console.log(req.file);
    if(req.file!=undefined){

        const obj={
            "username":req.body.username,
            "profile_image":req.body.profile_image,
            "work":req.body.work,
            "media":req.file.path,
            "caption":req.body.caption,
            "like":0
        }
        await postFeedCtrl.postapiFeeds(obj)
    }
    else{
        const obj={
            "username":req.body.username,
            "profile_image":req.body.profile_image,
            "work":req.body.work,
            "caption":req.body.caption,
            "like":0
        }
        await postFeedCtrl.postapiFeeds(obj)
    }
    
})
router.route("/postReport").post(async(req,res)=>{
    // console.log(req.body);
    await postFeedCtrl.postReportedUser(req.body)
})

router.route('/getReports').get(async(req,res)=>{
    const data=await fetchDetailsCtrl.getapiReports()
    res.send(data)
})

router.route("/deleteReport").post(async(req,res)=>{
    console.log(req.body);
    await MentorShalaDAO.deleteReport(req.body)

})

router.route("/deleteUser").post(async(req,res)=>{
    console.log(req.body);
    await MentorShalaDAO.deleteUser(req.body)

})

router.route("/updatePassword").post(async(req,res)=>{
    console.log(req.body);
    await MentorShalaDAO.updatePassword(req.body)

})

router.route("/updateProfilePhoto").post(async(req,res)=>{
    console.log(req.body);
    await MentorShalaDAO.updateProfilePhoto(req.body)

})

router.route("/updateProfileBanner").post(async(req,res)=>{
    console.log(req.body);
    await MentorShalaDAO.updateProfileBanner(req.body)

})

router.route("/getFeeds").get(async(req,res)=>{
    const data=await usersDetailsCtrl.getapiFeeds()
    console.log(data);
    res.send(data)
})

router.route('/post/liked-profile/:username').post(async(req,res)=>{
    const username=req.params.username
    const profilelike=req.body;
    await updateDetailsCtrl.updateprofile_liked(username,profilelike)
})
router.route('/post/dont_show/:username').post(async(req,res)=>{
    const username=req.params.username
    const data=req.body;
    await updateDetailsCtrl.update_Dont_show_again(username,data)
})
router.route('/post/matchListUpdate/:username').post(async(req,res)=>{
    const username=req.params.username
    const data=req.body;
    // console.log(data);
    await updateDetailsCtrl.matchListUpdate(username,data)
})

router.route('/adminAuth').post(async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const adminUserName = "adminMentorshala";
    const adminPassword = "admin@123";
    if(username===adminUserName && password===adminPassword){
        res.sendStatus(200)
    }
    else{
        res.sendStatus(201)
    }
})

export default router