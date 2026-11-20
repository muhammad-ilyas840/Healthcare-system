import { Request, Response, NextFunction } from 'express'
const Jwt_secret = process.env.Jwt_secret as string
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthRequest extends Request {
    user?: string | JwtPayload
}


const ensureAuthenticated = (req : AuthRequest , res : Response , next : NextFunction)=>{
    const auth = req.headers['authorization']
    if(!auth){
        return res.status(403).json({message : "Unauthorized || Wrong token or token is expired"})
    }
    try{
        const decoded = jwt.verify(auth , Jwt_secret )
        req.user = decoded
        next()
    } catch(err : unknown){
        console.log(err instanceof Error ? err.message : "An unexpected error occured")
        res.status(403).json({message : "Authentication failed"})
    }
}

export default ensureAuthenticated
