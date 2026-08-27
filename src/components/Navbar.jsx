import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">

                <h1 className="text-2xl font-bold text-blue-600">
                    HealthCare
                </h1>

                <div className="space-x-6">

                    <Link to="/" className="hover:text-blue-600">
                        Home
                    </Link>

                    <Link to="/login" className="hover:text-blue-600">
                        Login
                    </Link>

                    <Link
                        to="/patient-signup"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Patient Signup
                    </Link>

                    <Link
                        to="/doctor-signup"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        Doctor Signup
                    </Link>

                </div>

            </div>
        </nav>
    );
}