import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-3.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Usman Akthar
            </span>
          </a>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <NavLink to="/">
                <li className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">
                  Home
                </li>
              </NavLink>
              <NavLink to="/blog">
                <li className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">
                  Blog
                </li>
              </NavLink>
              <li className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">
                Feature Videos
              </li>
              <li className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">
                Awards
              </li>
              <li className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">
                Testimonials
              </li>
              <li className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">
                Contact Us
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
