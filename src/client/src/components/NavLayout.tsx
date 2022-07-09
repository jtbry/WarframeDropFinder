import { Link, Outlet } from 'react-router-dom';
import ItemSearch from './ItemSearch';

function NavLayout() {
  return (
    <div>
      <div className="flex flex-row pt-2 md:pt-4 max-h-14 bg-primary">
        <Link to="/" className="self-center pl-2 md:pl-4 relative md:absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>

        <div className="flex flex-1 justify-center mx-2 md:mx-0">
          <div className="w-full md:w-1/2">
            <ItemSearch provideExample />
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default NavLayout;
