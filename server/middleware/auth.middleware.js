const jwt=require("jsonwebtoken");
require("dotenv").config()


const auth=(req,res,next)=>{
try {
    const token=req.headers.authorization;

    if (token){
        const decoded=jwt.verify(token,process.env.SECREAT_KEY);

            if (decoded){
                req.user= decoded;
                next()
            }
            else{
                return res.status(404).json({msg:"token is invalid"})

            }

    }
    else{
        return res.status(404).json({msg:"token not found"})
    }
} catch (error) {
    res.status(500).json({error:error.message})

}
}


module.exports={auth}