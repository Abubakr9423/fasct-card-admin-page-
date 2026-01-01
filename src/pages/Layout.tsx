import { NavLink, Outlet } from 'react-router-dom'
import img from '../assets/Group 1116606595.png'
import { Folder, Home, Menu, Moon, Search, Send, ShoppingCart, Sun } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

const Layout = () => {


    const { setTheme } = useTheme()

    const linkStyle = "flex w-full items-center rounded-sm font-bold gap-1 px-3 py-2 transition-colors";

    const activeStyle = "bg-[#FFFFFF] text-[#1C2536]";

    const nonActiveStyle = "text-white hover:bg-[#ffffff1a]";
    return (
        <main>
            <nav className='bg-[#1C2536]'>
                <section className=' max-w-350 m-auto p-3 flex justify-between items-center'>

                    <div className='flex items-center gap-10'>
                        <img className='w-50' src={img} alt="" />
                        <div className='flex items-center gap-2'>
                            <Search className='text-white relative left-9 z-10' />
                            <input placeholder='Search' className='placeholder:text-white text-white pl-10 py-2 w-80' type="search" />
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
            <main className='flex'>
                <aside className='bg-[#1C2536] h-screen max-w-75 gap-1 w-full flex flex-col items-center pr-5 pl-10 py-4'>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${linkStyle} ${isActive ? activeStyle : nonActiveStyle}`
                        }
                    >
                        <Home size={20} />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            `${linkStyle} ${isActive ? activeStyle : nonActiveStyle}`
                        }
                    >
                        <Menu size={20} />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `${linkStyle} ${isActive ? activeStyle : nonActiveStyle}`
                        }
                    >
                        <ShoppingCart size={20} />
                        <span>Products</span>
                    </NavLink>
                    <NavLink
                        to="/other"
                        className={({ isActive }) =>
                            `${linkStyle} ${isActive ? activeStyle : nonActiveStyle}`
                        }
                    >
                        <Folder size={20} />
                        <span>Other</span>
                    </NavLink>

                </aside>
                <aside>
                    <Outlet />
                </aside>
            </main>
        </main>
    )
}

export default Layout