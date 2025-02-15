import { Signup as SignupComponent } from "../components"

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">Create your account</h2>
        <SignupComponent />
      </div>
    </div>
  )
}

export default Signup

