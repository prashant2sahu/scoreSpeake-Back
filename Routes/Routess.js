
const express=require("express");
const router=express.Router();
// ======================================================================

//=====================================================================
// import
const {Signup,login,getData}=require("../Controller/AuthController")
const {series,updateGameA,updateGameB}=require("../Controller/SeriesController");
//function call
router.post("/user",Signup);
router.post("/Login",login);
router.post("/game/:userId",series);
router.post('/game', series);
router.post('/updateGameA',updateGameA)
router.post('/updateGameB',updateGameB);
router.get("/Dashboard",getData);


// router.get("/getData",getData);


module.exports=router;