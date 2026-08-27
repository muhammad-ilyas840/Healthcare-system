import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PatientSignup from "./pages/PatientSignup";
import DoctorSignup from "./pages/DoctorSignup";
import PatientDashboard from "./pages/PatientDashboard";
import { useState } from "react";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientHandler from "./PatientHandler";
import DoctorHandler from "./DoctorHandler";
import Appointment from "./pages/Appointment";
import PatientAppointments from "./pages/PatientAppointments";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorPublicProfile from "./pages/DoctorPublicProfile";
import PatientProfile from "./pages/PatientProfile";
import EditDoctorProfile from "./pages/EditDoctorProfile";
import EditPatientProfile from "./pages/EditPatientProfile";
import Review from "./pages/Review";
import DoctorReviews from "./pages/DoctorReviews"
import DoctorPublicReviews from "./pages/DoctorPublicReviews"
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";


function App() {
  const [isPatient, setIsPatient] = useState(false)
  const [isDoctor, setIsDoctor] = useState(false)
  const navigate = useNavigate()
  const PatientRoute = ({element})=>{
    return isPatient ? element : navigate('/login')
  }

  const DoctorRoute = ({element})=>{
    return isDoctor ? element : navigate('/login')
  }

  return (
    <>
    
    <PatientHandler setIsPatient={setIsPatient}/>
    <DoctorHandler setIsDoctor={setIsDoctor}/>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/patient-signup"
          element={<PatientSignup />}
        />

        <Route
          path="/doctor-signup"
          element={<DoctorSignup />}
        />

        <Route
        path="/patientdashboard"
        element={<PatientRoute element={<PatientDashboard/>}/>}
        />
        <Route
        path="/doctordashboard"
        element={<DoctorRoute element={<DoctorDashboard/>}/>}
        />

        <Route
        path="/bookappointment/:doctorId"
        element={<Appointment/>}
        />

        <Route
          path="/patientappointments"
          element={<PatientAppointments />}
        />

        <Route
          path="/doctorappointments"
          element={<DoctorAppointments/>}
        />

        <Route
          path="/doctorprofile"
          element={<DoctorProfile />}
        />

        <Route
          path="/doctorpublicprofile/:doctorId"
          element={<DoctorPublicProfile />}
        />

        <Route
          path="/patientprofile"
          element={<PatientProfile />}
        />

        <Route
          path="/editdoctor"
          element={<EditDoctorProfile />}
        />

        <Route
          path="/editpatient"
          element={<EditPatientProfile />}
        />

        <Route
          path="/reviews/:doctorId"
          element={<Review />}
        />

        <Route
          path="/doctorreview"
          element={<DoctorReviews />}
        />
        
        <Route
        path="/doctorreview/:doctorId"
        element={<DoctorPublicReviews />}
        />

        <Route
        path="/payment-success"
        element={<PaymentSuccess/>}
        />

        <Route
        path="/payment-cancel"
        element={<PaymentCancel/>}
        />

      </Routes>
    </>
  );
}

export default App;