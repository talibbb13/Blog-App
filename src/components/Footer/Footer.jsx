import { Link } from "react-router-dom";
import Logo from "../Logo";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Container from "../Container/Container";

function Footer() {
  return (
    <Container>
      <section className="Footer bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden py-7 text-white border-t-2 border-t-[#333]">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="-m-6 flex flex-wrap justify-between">
            <div className="w-full p-6 md:w-1/3 lg:w-1/4">
              <div className="flex h-full flex-col justify-between">
                <div className="mb-6 inline-flex items-center">
                  <Logo width="50px" />
                </div>
                <p className="text-sm text-gray-400">
                  &copy; 2023 DevUI. All Rights Reserved.
                </p>
                <div className="mt-4 flex space-x-4">
                  <a
                    href="https://facebook.com"
                    className="text-gray-400 hover:text-white"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://twitter.com"
                    className="text-gray-400 hover:text-white"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="text-gray-400 hover:text-white"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="https://instagram.com"
                    className="text-gray-400 hover:text-white"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/4 lg:w-1/6">
              <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-gray-400">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full p-6 md:w-1/4 lg:w-1/6">
              <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-gray-400">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full p-6 md:w-1/4 lg:w-1/6">
              <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-gray-400">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-[#C1E8FE]"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full p-6 md:w-1/3 lg:w-1/4">
              <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-gray-400">
                Subscribe to our newsletter
              </h3>
              <form>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full mb-4 p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1E8FE]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default Footer;
