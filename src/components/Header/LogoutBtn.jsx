import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <button
      className="px-4 py-2 rounded-full bg-red-600 text-white transition-colors duration-300 hover:bg-red-700"
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn

