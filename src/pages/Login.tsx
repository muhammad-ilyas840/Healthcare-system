import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";
import { useNavigate } from "react-router-dom";

type LoginInfo = {
    Email : string,
    Password : string
}

type LoginResponse = {
    success : boolean,
    token? : string,
    FullName? : string,
    message? : string,
    Role? : string
}


export default function Login() {
    const navigate = useNavigate()

    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        Email : '',
        Password : ''
    })

    const LoginUser = async (e : SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const {Email , Password} = loginInfo
        if(!Email || !Password){
            return handleError("Email and Password are required")
        }
        try{
            let response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login` , {
                method : "POST",
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(loginInfo)
            })
            let data : LoginResponse = await response.json()
            const {success , token , FullName , message , Role} = data
            if(success && token && FullName &&(Role === "Patient" || Role === "Doctor"))
            {
                handleSuccess(message || "Login successfull")
                localStorage.setItem("token" , token);
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
                handleError(message || "Login failed")
            }
        } catch(err : unknown){
            handleError(err instanceof Error ? err.message : "An unexpected error occurred")
        }

    }

    const handlechange = (e : ChangeEvent<HTMLInputElement>)=>{
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