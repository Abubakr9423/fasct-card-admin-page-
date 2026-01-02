import { NavLink, Outlet } from "react-router-dom";

const Other = () => {
  const baseClasses =
    "rounded-sm px-4 py-2 cursor-pointer transition-colors duration-300";
  const activeClasses = "bg-[#1D4ED8] text-white"; // active look
  const inactiveClasses = "text-[#1D4ED8] hover:bg-[#DBEAFE]";

  return (
    <div className="p-6">
      <div className="flex gap-5">
        <NavLink
          end
          to=""
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Categories
        </NavLink>

        <NavLink
          to="brands"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Brands
        </NavLink>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Other;