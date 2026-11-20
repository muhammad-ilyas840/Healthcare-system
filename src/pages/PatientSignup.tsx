import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";
import { useNavigate } from "react-router-dom";

type PatientData = {
  FullName: string;
  Email: string;
  Password: string;
  Age: string;
  Gender: string;
  Bloodgroup: string;
  Address: string;
};

type PatientSignupResponse = {
  message?: string;
};

export default function PatientSignup() {
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState<PatientData>({
    FullName: "",
    Email: "",
    Password: "",
    Age: "",
    Gender: "",
    Bloodgroup: "",
    Address: "",
  });

  const patientRegister = async (e: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const {
      FullName,
      Email,
      Password,
      Age,
      Gender,
      Bloodgroup,
      Address,
    } = patientData;

    if (
      !FullName ||
      !Email ||
      !Password ||
      !Age ||
      !Gender ||
      !Bloodgroup ||
      !Address
    ) {
      handleError("Every field must be filled");
      return;
    }

    try {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/auth/patient`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...patientData,
            Age : Number(patientData.Age)
          }),
        }
      );

      const response: PatientSignupResponse = await data.json();

      if (data.ok) {
        handleSuccess(response.message || "Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(response.message || "Registration failed");
        console.log(response);
      }
    } catch (err: unknown) {
      handleError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred"
      );
    }
  };

  const handlechange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-100 to-cyan-100 flex justify-center items-center py-10 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-700">
          Patient Registration
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Create your patient account
        </p>

        <form className="space-y-5" onSubmit={patientRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            name="FullName"
            value={patientData.FullName}
            onChange={handlechange}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            name="Email"
            value={patientData.Email}
            onChange={handlechange}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            name="Password"
            value={patientData.Password}
            onChange={handlechange}
          />

          <input
            type="number"
            placeholder="Age"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            name="Age"
            value={patientData.Age}
            onChange={handlechange}
          />

          <select
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={patientData.Gender}
            onChange={handlechange}
            name="Gender"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="text"
            placeholder="Blood Group"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            name="Bloodgroup"
            value={patientData.Bloodgroup}
            onChange={handlechange}
          />

          <textarea
            rows={4}
            placeholder="Address"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            name="Address"
            value={patientData.Address}
            onChange={handlechange}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
