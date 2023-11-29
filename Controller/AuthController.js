const User=require("../Models/AuthModel");
const bcrypt=require("bcrypt");
require("dotenv").config()
const jwt=require("jsonwebtoken")
const Series=require("../Models/SeriesModel")

exports.Signup=async(req,res)=>{
    try{
       const {name,email,password} =req.body;
    //    const {name,email,role,password} =req.body;


       const emailExisting=await User.findOne({email})
       if(emailExisting){
       return  res.status(400).json({
            success:false,
            message:"Email already exist",
        })
    }

        // secured Password;
        let hashPassword
        try{
            const saltRounds = 10;
            hashPassword=await bcrypt.hash(password,saltRounds);
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                success:false,
                message:"Error in hashing"
            });
        }
 
        const user=await User.create({
            name,email,password:hashPassword
            // name,email,role,password


        })
        //password:hashPassword 
        // getting an error while using this instide of password
        
        return res.status(200).json({
            succses:true,
            message:"user created successfully",
        })

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"error in creating user, Try again later",
        })
    }
}

exports.login= async(req,res)=>{

    try {
		// Get email and password from request body
		const { email, password } = req.body;
        
		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email });

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id },
				"Prashant",
				{
					expiresIn: "24h",
				}
			);
            console.log("logged in guys i am from backend");

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
                    res.status(200).json({
                        success:true,
                        token,
                        user,
                        message:"user login success"
                    });
			// res.cookie("token", token, options).status(200).json({
			// 	success: true,
			// 	token,
			// 	user,
			// 	message: `User Login Success`,
			// });
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};
    // try{

    //     const {email,password}=req.body;
    //     console.log("email",email);
    //     console.log("passs",password);

    //     // if(   !email || !password ){
    //     //     return res.status(500).json({
    //     //         success:false,
    //     //         message:"please fill all the details",
    //     //     })
    //     // }
        
    //     const user=await User.findOne({email});
        
    //     if(!user){
    //         res.status(500).json({
    //             success:false,
    //             message:"user is not registered",
    //         })
    //     }
    //     if (!user.password) {
    //         return res.status(500).json({
    //           success: false,
    //           message: "User data is corrupted. Please contact support.",
    //         });
    //       }
        
    //     const isPasswordMatched = await bcrypt.compare(password, user.password);

    //     if (isPasswordMatched) {
    //     //    Password matched, generate JWT token
    //       const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
    //         expiresIn: '1h', // You can set the expiration time for the token
    //       });
    
    //       res.status(200).json({
    //         success: true,
    //         message: "Login successful",
    //         token,
    //       });
    //     } else {
    //       res.status(401).json({
    //         success: false,
    //         message: "Invalid password",
    //       });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({
    //       success: false,
    //       message: "Internal Server Error",
    //     });
    //   }
    // };

exports.getData=async (req,res)=>{
    try{
         const data=await Series.find()   
        
        // return data
        res.status(200).json({
            data:data,
            success: true,
            message:"fetching successfull "
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"getting error in fetching the data"
        })
    }
}
