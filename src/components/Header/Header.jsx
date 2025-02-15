import { Container, Logo, LogoutBtn } from "../index"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className="py-3 shadow bg-gray-800 text-white">
      <Container>
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo width="50px" />
            <span className="text-2xl font-bold">BlogApp</span>
          </Link>
          <ul className="flex items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 rounded-full transition-colors duration-300 hover:bg-gray-700"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header

