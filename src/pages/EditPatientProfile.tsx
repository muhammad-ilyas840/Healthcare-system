import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../Utils'
import { ToastContainer } from 'react-toastify'

type PatientInfo = {
    Age : string,
    Gender : "" | "Male" | "Female",
    Bloodgroup : string,
    Address : string
}

type PatientResponse = {
    Age : number,
    Gender : "" | "Male" | "Female",
    Bloodgroup : string,
    Address : string,
    message? : string
}

type ApiResponse = {
    message? : string
}


const EditPatientProfile = () => {
    const navigate = useNavigate()
    const [patient, setPatient] = useState<PatientInfo>({
        Age : '',
        Gender : '',
        Bloodgroup : '',
        Address : ''
    })

    const fetchPatientData = async () : Promise<void> =>{
        try{
            let response = await fetch(`${import.meta.env.VITE_API_URL}/auth/patientprofile` ,
                {
                    headers : {
                        Authorization : localStorage.getItem("token") || ""
                    }
                }
            )
            let data : PatientResponse = await response.json()
            if(response.ok){
                setPatient({
                    Age : String(data.Age),
                    Gender : data.Gender,
                    Bloodgroup : data.Bloodgroup,
                    Address : data.Address
                })
            }
            else{
                handleError(data.message || "An erorr occured while fetching you profile")
            }
        }
        catch(err : unknown){
            handleError(err instanceof Error ? err.message : "An erorr occured")
        }
    }

    useEffect(() => {
        fetchPatientData()
    }, [])

    const updatePatientData = async (e : SyntheticEvent<HTMLFormElement>) : Promise<void> =>{
        e.preventDefault()
        try {
            let response = await fetch(`${import.meta.env.VITE_API_URL}/auth/updatepatient` ,{
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : localStorage.getItem("token") || ""
                },
                body : JSON.stringify({
                    ...patient ,
                    Age : Number(patient.Age)
                })
            })

            let data : ApiResponse = await response.json()
            if(response.ok){
                handleSuccess(data.message || "Profile updated successfully")
                setTimeout(() => {
                    navigate('/patientprofile')
                }, 1000);
            }
            else{
                handleError(data.message || "An error occured while updating you profile")
            }
        } catch (err : unknown) {
            handleError( err instanceof Error ? err.message : "An unexpected error occured")
        }
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setPatient({
            ...patient, [e.target.name] : e.target.value
        })
    }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

                <h1 className="text-3xl font-bold text-blue-600 mb-8">

                    Edit Patient Profile

                </h1>


                <form
                    onSubmit={updatePatientData}
                    className="space-y-5"
                >


                    <input
                        type="text"
                        name="Age"
                        value={patient.Age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="w-full border p-3 rounded-xl"
                    />


                    <select
                        name="Gender"
                        value={patient.Gender}
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
                        type="text"
                        name="Bloodgroup"
                        value={patient.Bloodgroup}
                        onChange={handleChange}
                        placeholder="Bloodgroup"
                        className="w-full border p-3 rounded-xl"
                    />


                    <input
                        type="text"
                        name="Address"
                        value={patient.Address}
                        onChange={handleChange}
                        placeholder="Hospital"
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

export default EditPatientProfile
