import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <div>
                <NavLink to="/dashboard">
                Dashboard
                </NavLink>


                <NavLink to="/orders">
                    Orders
                </NavLink>

                <NavLink to="/products">
                    Products
                </NavLink>
                <NavLink to="/other">
                    Other
                </NavLink>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout