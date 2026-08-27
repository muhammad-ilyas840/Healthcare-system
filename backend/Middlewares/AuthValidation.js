const joi = require('joi')
const { model } = require('mongoose')

const UserValidation = (req , res , next)=>{
    const schema = joi.object({
        FullName: joi.string().required(),

    Email: joi.string()
        .email()
        .required(),

    Password: joi.string()
        .min(6)
        .required(),

    Role : joi.string().valid("Doctor" , "Patient").required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({message : "Bad request" , error})
    }
    next()

}

const DoctorValidation = (req , res , next)=>{
    const schema = joi.object({

    FullName: joi.string()
            .min(3)
            .max(50)
            .required(),

        Email: joi.string()
            .email()
            .required(),

        Password: joi.string()
            .min(6)
            .required(),

    Specialization: joi.string()
        .required(),

    Gender: joi.string()
        .valid("Male", "Female")
        .required(),

    Experience: joi.number()
        .required(),

    Hospital : joi.string().required(),
    
    ConsultationFee : joi.number().required() ,
    AvailableDays: joi.array()
    .items(
        joi.string().valid(
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        )
    )
    .min(1)
    .required(),
    
    AvailableFrom : joi.string().required() ,

    AvailableTo : joi.string().required()
    
    });

    const {error}= schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message
        });
    }

    next()

}

const PatientValidation = (req, res, next) => {
    const schema = joi.object({

        FullName: joi.string()
            .min(3)
            .max(50)
            .required(),

        Email: joi.string()
            .email()
            .required(),

        Password: joi.string()
            .min(6)
            .required(),

        Age: joi.number()
            .min(1)
            .max(120)
            .required(),

        Gender: joi.string()
            .valid("Male", "Female")
            .required(),

        Bloodgroup: joi.string()
            .required(),

        Address: joi.string()
            .required()

    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message
        });
    }

    next();
};


const AppointmentValidation = (req , res , next)=>{
    const schema = joi.object({

    Doctor: joi.string()
        .hex()
        .length(24)
        .required(),

    Patient: joi.string()
        .hex()
        .length(24)
        .required(),

    AppointmentDate: joi.date()
        .required(),

    Reason: joi.string()
        .min(5)
        .required(),

    Status: joi.string()
        .valid(
            "Pending",
            "Confirmed",
            "Completed",
            "Cancelled"
        )
        .optional()
    })
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message
        });
    }
    
    next()

}


const loginValidation = (req , res , next)=>{
    
    const schema =  joi.object({
    Email: joi.string()
        .email()
        .required(),

    Password: joi.string()
        .required()
})

 const {error}= schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message
        });
    }

    next()
}

module.exports = {
    UserValidation,
    PatientValidation,
    DoctorValidation,
    AppointmentValidation,
    loginValidation,
}