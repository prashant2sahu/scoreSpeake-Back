const mongoose=require("mongoose");
// const User=require
const teamSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: String,
      default: 0,
    },
    over: {
      type: String,
      default: 0,
    },
  });
  


const seriesSchema= new mongoose.Schema({
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },

        series:{
            type:String,
            required:true,
            trim:true,
        },
        teamA: {
            type: teamSchema,
            required: true,
          },
          teamB: {
            type: teamSchema,
            required: true,
          },
        // teamA:{
        //     type:String,
        //     required:true,
        //     trim:true,
        // },
        // teamB:{
        //     type:String,
        //     required:true,
        //     trim:true,
        // },
        totalOver:{
            type:String,
            required:true,
            trim:true,
        }
        

});
module.exports=mongoose.model("Series",seriesSchema);
