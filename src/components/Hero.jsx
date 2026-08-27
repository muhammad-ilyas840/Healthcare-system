const HealthCareImg = '/pexels-pavel-danilyuk-8442105.jpg'

export default function Hero() {
    return (
        <section className="bg-blue-50">

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-8 py-20">

                <div>

                    <h1 className="text-5xl font-bold mb-6">

                        Book Appointments
                        <span className="text-blue-600">
                            {" "}With Trusted Doctors
                        </span>

                    </h1>

                    <p className="text-gray-600 mb-8">

                        Find experienced doctors, book appointments online,
                        and manage your healthcare with ease.

                    </p>

                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg">

                        Get Started

                    </button>

                </div>

                <div>

                    <img
                        src={HealthCareImg}
                        alt="Healthcare"
                        className="w-full rounded-xl shadow-lg"
                    />

                </div>

            </div>

        </section>
    );
}