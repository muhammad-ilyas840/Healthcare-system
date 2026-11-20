const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your purchase.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;