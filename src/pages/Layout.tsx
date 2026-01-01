import { Outlet } from 'react-router-dom'
import img from '../assets/Group 1116606595.png'
import { Home, Search, Send } from 'lucide-react'

const Layout = () => {
    return (
        <main>
            <nav className='bg-[#1C2536]'>
                <section className=' max-w-350 m-auto p-3 flex justify-between items-center'>

                    <div className='flex items-center gap-5'>
                        <img className='w-50' src={img} alt="" />
                        <div className='flex items-center gap-2'>
                            <Search className='text-white' />
                            <input placeholder='Search' className='placeholder:text-white' type="text" />
                        </div>
                    </div>
                    <div className='flex gap-3 items-center text-white'>
                        <Send />
                            <img className='w-10 rounded-full' src="https://th.bing.com/th/id/OIP.jixXH_Els1MXBRmKFdMQPAHaHa?w=219&h=219&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="" />
                        <select>
                            <option value="">
                                <p>_nazarov._011</p>
                            </option>
                        </select>
                    </div>
                    {/* <NavLink to="/dashboard">
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
                </NavLink> */}
                </section>
            </nav>
            <main className='flex'>
                <aside className='bg-[#1C2536] h-screen max-w-85 w-full flex flex-col items-center px-5'>
                    <button className='flex w-full items-center  rounded-sm  font-bold gap-1 bg-[#FFFFFF] px-3 py-2 '>
                        <Home />
                        <span>Dashboard</span>
                    </button>
                </aside>
                <aside>
                    <Outlet />
                </aside>
            </main>
        </main>
    )
}

export default Layout