import { NavLink, Outlet } from 'react-router-dom'
import img from '../assets/Group 1116606595.png'
import { BellDot, ChevronDown, Folder, Home, Menu, Moon, Search, Send, ShoppingCart, Sun, Tag } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

const Layout = () => {
    const linkStyle = "flex w-full items-center rounded-sm font-bold gap-1 px-3 py-2 transition-colors";
    const { setTheme } = useTheme()
    const activeStyle = "bg-[#FFFFFF] text-[#1C2536]";

    const nonActiveStyle = "text-white hover:bg-[#ffffff1a]";
    return (
        <div className="min-h-screen flex flex-col">
            <nav className='bg-[#1C2536] border-b border-gray-700 sticky top-0 z-50'>
                <section className='max-w-[1440px] m-auto p-4 flex justify-between items-center'>
                    <div className='flex items-center gap-12'>
                        <img className='w-40 object-contain' src={img} alt="Logo" />

                        <div className='relative hidden md:block'>
                            <Search className='text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' size={20} />
                            <input
                                placeholder='Search everything...'
                                className='bg-[#2d394e] border-none rounded-lg text-white pl-11 pr-4 py-2 w-80 outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500'
                                type="search"
                            />
                        </div>
                    </div>

                    <div className='flex gap-5 items-center text-white'>
                        <button className="hover:bg-gray-700 p-2 rounded-full transition-colors">
                            <BellDot size={20} />
                        </button>
                        <div className="flex items-center gap-3 border-l border-gray-700 pl-5">
                            <img className='w-10 h-10 rounded-full border-2 border-blue-500' src="https://th.bing.com/th/id/OIP.jixXH_Els1MXBRmKFdMQPAHaHa?w=219&h=219&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Avatar" />
                            <div className="hidden lg:block">
                                <p className="text-sm font-semibold text-white">_nazarov._011</p>
                                <p className="text-xs text-gray-400">Admin</p>
                            </div>
                            <ChevronDown size={16} className="text-gray-400 cursor-pointer" />
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </section>
            </nav>

            <div className='flex flex-1'>
                <aside className='bg-[#1C2536] w-72 min-h-[calc(100vh-72px)] flex flex-col gap-2 p-5 border-r border-gray-700'>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : nonActiveStyle}`}
                    >
                        <Home size={20} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : nonActiveStyle}`}
                    >
                        <Menu size={20} />
                        <span>Orders</span>
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : nonActiveStyle}`}
                    >
                        <Tag size={20} />
                        <span>Products</span>
                    </NavLink>

                    <NavLink
                        to="/other"
                        className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : nonActiveStyle}`}
                    >
                        <Folder size={20} />
                        <span>Other</span>
                    </NavLink>
                </aside>

                <main className='flex-1 bg-gray-50 p-6 overflow-y-auto'>
                    <div className="max-w-[1200px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout