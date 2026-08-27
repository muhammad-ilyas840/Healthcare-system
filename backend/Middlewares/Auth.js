const jwt = require('jsonwebtoken')
const Jwt_secret = process.env.Jwt_secret

const ensureAuthenticated = (req , res , next)=>{
    const auth = req.headers['authorization']
    if(!auth){
        return res.status(403).json({message : "Unauthorized || Wrong token or token is expired"})
    }
    try{
        const decoded = jwt.verify(auth , Jwt_secret )
        req.user = decoded
        next()
    } catch(err){
        console.log(err)
        res.status(403).json({message : "Authentication failed"})
    }
}

module.exports = ensureAuthenticated
