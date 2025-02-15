import { Link } from "react-router-dom"
import Logo from "../Logo"

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo width="100px" />
            <p className="text-sm">&copy; {new Date().getFullYear()} BlogApp. All Rights Reserved.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

