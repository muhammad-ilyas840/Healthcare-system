import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate()

    const [loginInfo, setLoginInfo] = useState({
        Email : '',
        Password : ''
    })

    const LoginUser = async (e)=>{
        e.preventDefault()
        const {Email , Password} = loginInfo
        if(!Email || !Password){
            return handleError("Email and Password are required")
        }
        try{
            let response = await fetch('http://localhost:4000/auth/login' , {
                method : "POST",
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(loginInfo)
            })
            let data = await response.json()
            const {success , err , token , FullName , message , Role} = data
            if(success){
                handleSuccess(message)
                localStorage.setItem("token" , token),
                localStorage.setItem("loggedInUser" , FullName)
                localStorage.setItem("Role" , Role)
                if(Role === "Patient"){
                navigate('/patientdashboard')
                }
                else{
                    navigate('/doctordashboard')
                }
            }
            else{
                handleError(data.message)
            }
        } catch(err){
            handleError(err.message)
        }

    }

    const handlechange = (e)=>{
        setLoginInfo({
            ...loginInfo ,  [e.target.name] : e.target.value
        })
    }
    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form className="bg-white p-8 rounded-lg shadow-lg w-96" onSubmit={LoginUser}>

                <h2 className="text-3xl font-bold text-center mb-8">

                    Login

                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-5"
                    name="Email"
                    onChange={handlechange}
                    value={loginInfo.Email}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-5"
                    name="Password"
                    onChange={handlechange}
                    value={loginInfo.Password}
                />

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded">

                    Login

                </button>

            </form>
            <ToastContainer/>

        </div>

    );
}