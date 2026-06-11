
import { ActivityIcon, HomeIcon, MoonIcon, PersonStandingIcon, SunIcon, UserIcon, UtensilsIcon } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"


const Sidebar = () => {

    const navItems = [
        {path: '/', lable : 'Home', icon: HomeIcon},
        {path: '/food', lable : 'Food', icon: UtensilsIcon},
        {path: '/activity', lable : 'Activity', icon: ActivityIcon},
        {path: '/profile', lable : 'Profile', icon: UserIcon},
    ]

    const {theme, toggleTheme} = useTheme();
    
    const navBg = theme === 'dark' ? 'bg-slate-950' : 'bg-white';
    const navBorder = theme === 'dark' ? 'border-slate-800' : 'border-slate-200';
    const navTitle = theme === 'dark' ? 'text-slate-50' : 'text-slate-900';
    const navItemText = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';
    const navItemHover = theme === 'dark' ? 'hover:bg-slate-800 hover:text-slate-100' : 'hover:bg-slate-100 hover:text-slate-900';
    const navItemActive = theme === 'dark' ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-50 text-emerald-600';
    
    return (
        <nav className={`hidden lg:flex flex-col w-64 ${navBg} border-r ${navBorder} p-6 transition-colors duration-200`}>
            <div className="flex items-center gap-3 mb-8">
                <div className="size-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <PersonStandingIcon className="size-7 text-white"/>
                </div>
                <h1 className={`text-2xl font-bold ${navTitle}`}>FitTrack</h1>
            </div>

            <div className="flex flex-col gap-2">
                 {navItems.map((item) => (
                    <NavLink key={item.path} to={item.path} className={({isActive}) => `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ? `${navItemActive} font-medium` : `${navItemText} ${navItemHover}`}`}>
                        <item.icon className="size-5"/>
                        <span className="text-base">{item.lable}</span>
                    </NavLink>
                 ) )}
            </div>

            <div className={`mt-auto pt-6 border-t ${navBorder}`}>
                <button 
                onClick={toggleTheme}
                className={`flex items-center gap-3 px-4 py-2.5 w-full rounded-lg ${navItemText} ${navItemHover} transition-colors duration-200 cursor-pointer`}>
                    {theme === 'light' ? <MoonIcon className="size-5"/> : <SunIcon className="size-5"/>}
                    <span className="text-base">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
            </div>
            
        </nav>
    )
}

export default Sidebar