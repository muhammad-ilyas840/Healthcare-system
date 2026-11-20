import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../Utils'
import { ToastContainer } from 'react-toastify'

type DoctorInfo = {
    Specialization: string,
    Gender: "" | "Male" | "Female",
    Experience: number,
    Hospital: string,
    ConsultationFee: number,
    AvailableDays : string[],
    AvailableFrom: string,
    AvailableTo: string
}

type DoctorProfileResponse = {
Specialization: string;
Gender: "" | "Male" | "Female";
Experience: number;
Hospital: string;
ConsultationFee: number;
AvailableDays: string[];
AvailableFrom: string;
AvailableTo: string;
message?: string;
};

type ApiResponse = {
    message? : string
}

const EditDoctorProfile = () => { 

    const navigate = useNavigate()

    const [doctorData, setDoctorData] = useState<DoctorInfo>({
        Specialization: '',
        Gender: "",
        Experience: 0,
        Hospital: '',
        ConsultationFee: 0,
        AvailableDays: [],
        AvailableFrom: '',
        AvailableTo: ''
    })


    const fetchDoctorProfile = async () : Promise<void> => {

        try {
            const token = localStorage.getItem("token")
            if(!token){
                navigate('/login' , {replace : true})
                return ;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/doctorprofile`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            )

            const data : DoctorProfileResponse = await response.json()

            if (response.ok) {

                setDoctorData({

                    Specialization: data.Specialization,

                    Gender: data.Gender,

                    Experience: data.Experience,

                    Hospital: data.Hospital,

                    ConsultationFee: data.ConsultationFee,

                    AvailableDays: data.AvailableDays,

                    AvailableFrom: data.AvailableFrom,

                    AvailableTo: data.AvailableTo

                })

            } else {

                handleError(data.message || "Failed to fetch data")

            }

        } catch (err : unknown) {

            handleError(err instanceof Error ? err.message : "An unexpected error occured")

        }

    }


    useEffect(() => {

        fetchDoctorProfile()

    }, [])


    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setDoctorData({

            ...doctorData,

            [e.target.name]: e.target.value

        })

    }


    const updateProfile = async (e : SyntheticEvent<HTMLFormElement>) : Promise<void> => {

        e.preventDefault()

        try {
            const token = localStorage.getItem("token")
            if(!token){
                navigate('/login' , {replace : true})
                return ;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/updatedoctor`,
                {
                    method: "PATCH",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: token

                    },

                    body: JSON.stringify(doctorData)

                }
            )

            const data : ApiResponse = await response.json()

            if (response.ok) {

                handleSuccess(data.message || "Profile updated successfully")

                setTimeout(() => {

                    navigate('/doctorprofile')

                }, 1000)

            } else {

                handleError(data.message || "failed to update profile")

            }

        } catch (err : unknown) {

            handleError(err instanceof Error ? err.message : "An unexpected error occured")

        }

    }


    return (

        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

                <h1 className="text-3xl font-bold text-blue-600 mb-8">

                    Edit Doctor Profile

                </h1>


                <form
                    onSubmit={updateProfile}
                    className="space-y-5"
                >


                    <input
                        type="text"
                        name="Specialization"
                        value={doctorData.Specialization}
                        onChange={handleChange}
                        placeholder="Specialization"
                        className="w-full border p-3 rounded-xl"
                    />


                    <select
                        name="Gender"
                        value={doctorData.Gender}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                    </select>


                    <input
                        type="number"
                        name="Experience"
                        value={doctorData.Experience}
                        onChange={handleChange}
                        placeholder="Experience"
                        className="w-full border p-3 rounded-xl"
                    />


                    <input
                        type="text"
                        name="Hospital"
                        value={doctorData.Hospital}
                        onChange={handleChange}
                        placeholder="Hospital"
                        className="w-full border p-3 rounded-xl"
                    />


                    <input
                        type="number"
                        name="ConsultationFee"
                        value={doctorData.ConsultationFee}
                        onChange={handleChange}
                        placeholder="Consultation Fee"
                        className="w-full border p-3 rounded-xl"
                    />


                    <input
                        type="text"
                        name="AvailableFrom"
                        value={doctorData.AvailableFrom}
                        onChange={handleChange}
                        placeholder="Available From"
                        className="w-full border p-3 rounded-xl"
                    />


                    <input
                        type="text"
                        name="AvailableTo"
                        value={doctorData.AvailableTo}
                        onChange={handleChange}
                        placeholder="Available To"
                        className="w-full border p-3 rounded-xl"
                    />


                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >

                        Save Changes

                    </button>


                </form>

            </div>


            <ToastContainer />

        </div>

    )

}

export default EditDoctorProfile