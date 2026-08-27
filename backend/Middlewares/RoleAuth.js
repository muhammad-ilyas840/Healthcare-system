const isPatient = (req , res , next)=>{
    const validUser = req.user
    if(!validUser){
        return res.status(401).json({message : "User not authorized"})
    }

    if(validUser.Role !== 'Patient'){
        return res.status(403).json({message : "Unauthorized || Only patients can book appointments and can see the doctor's list"})
    }
    next()
}

const isDoctor = (req , res , next)=>{
    const validUser = req.user

    if(!validUser){
        return res.status(401).json({message : "User not authorized"})
    }

    if(validUser.Role !== 'Doctor'){
        return res.status(403).json({message : "Only doctors can see their appointments"})
    }
    next()
}

module.exports = {
    isPatient,
    isDoctor
}