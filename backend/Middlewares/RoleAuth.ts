import type { NextFunction, Request, Response } from "express"
import type { JwtPayload } from "jsonwebtoken"

interface AuthRequest extends Request {
    user? : string | JwtPayload
}

const isPatient = (req : AuthRequest , res : Response , next : NextFunction)=>{
    const validUser = req.user
    if(!validUser){
        return res.status(401).json({message : "User not authorized"})
    }

    if(typeof validUser === 'string' ||  validUser.Role !== 'Patient'){
        return res.status(403).json({message : "Unauthorized || Only patients can book appointments and can see the doctor's list"})
    }
    next()
}

const isDoctor = (req : AuthRequest , res : Response , next : NextFunction)=>{
    const validUser = req.user

    if(!validUser){
        return res.status(401).json({message : "User not authorized"})
    }

    if(typeof validUser === 'string' || validUser.Role !== 'Doctor'){
        return res.status(403).json({message : "Only doctors can see their appointments"})
    }
    next()
}

export {
    isPatient,
    isDoctor
}

