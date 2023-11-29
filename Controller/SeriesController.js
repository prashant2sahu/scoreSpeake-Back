const Series=require("../Models/SeriesModel");
// require("dotenv").config();
const User=require("../Models/AuthModel");
exports.series=async(req,res)=>{
        try{
           const{series,totalOver,teamA,teamB}= req.body;
            const userId=req.params.userId;


           const user = await User.findById(userId);

           if (!user) {
             return res.status(404).json({ error: 'User not found' });
           }

          //  const seriesdata =await Series.create({

          //   series,
          //   teamA,
          //   teamB,
          //   // teamB:{
          //   //   name:{teamB}
          //   // },
          //   totalOver,
          //   user:userId
          //  });
          const newSeries = new Series({
            user:userId, // Provide a valid user ID here
            series: series,
            teamA: { name: teamA, score: 0, over: 0 },
            teamB: { name: teamB , score: 0, over: 0 },
            totalOver: totalOver,
          });
          
          newSeries.save()
            .then((result) => {
              console.log('Series created successfully:', result);
            })
            .catch((error) => {
              console.error('Error creating series:', error);
            });
          //  console.log("yaha tak to aaya tah");

           return res.status(200).json({
            success:true,
            message:"series Info created successfully",
            data:newSeries
           })

        }catch(error){
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Error in gettin series",
            })
        }
}


exports.updateGameA=async(req,res)=>{
  try{

    const {tempScore,tempOver,userId}=req.body;
    // const admin=await Series.findOne({user: userId});
    
    // if (!admin) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    // console.log("ADMIN",admin);

    const update=await Series.findOneAndUpdate({user: userId},
                              {"teamA.score":tempScore,"teamA.over":tempOver},
                              { new: true }
                              );

    if(update){
      // console.log("Game Updated",update);
      res.status(200).json({
        success :true,
        message:"Game update ho gya h ",
        data:update
      })
    }
    else{
      console.log("error aaa rah h kuch to update karne me")  
    }
  } catch(error){
    console.log("error CATCH  aaa rah h kuch to update karne me")  

      console.log(error);
      res.status(500).json({
        success:false,
        message:"Error game score update karne me",

      })
  } 

}

exports.updateGameB=async(req,res)=>{
  try{

    const {tempScore,tempOver,userId}=req.body;
    // const admin=await Series.findOne({user: userId});
    
    // if (!admin) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    // console.log("ADMIN",admin);

    const update=await Series.findOneAndUpdate({user: userId},
                              {"teamB.score":tempScore,"teamB.over":tempOver},
                              { new: true }
                              );

    if(update){
      // console.log("Game Updated",update);
      res.status(200).json({
        success :true,
        message:"Game update ho gya h ",
        data:update
      })
    }
    else{
      console.log("error aaa rah h kuch to update karne me")  
    }
  } catch(error){
    console.log("error CATCH  aaa rah h kuch to update karne me")  

      console.log(error);
      res.status(500).json({
        success:false,
        message:"Error game score update karne me",

      })
  } 

}