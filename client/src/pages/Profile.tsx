import { useAppContext } from "../context/AppContext"
import { useEffect, useState} from "react";
import { useTheme } from "../context/ThemeContext";
import type { ProfileFormData } from "../types";
import Card from "../components/ui/Card";
import { Calendar, LogOut, MoonIcon, Scale, SunIcon, Target, User } from "lucide-react";
import Button from "../components/ui/Button";
import { goalLabels, goalOptions } from "../assets/assets";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import toast from "react-hot-toast";
import api from "../configs/api";




const Profile = () => {
    const {user, logout, fetchUser, allFoodLogs, allActivityLogs} = useAppContext();
    const {theme, toggleTheme} = useTheme();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>({age: 0, weight: 0, height: 0, goal: 'maintain', dailyCalorieIntake: 2000, dailyCalorieBurn: 400})

    const populateFormData = () => {
        if (user) {
            setFormData({
                age: user.age || 0,
                weight: user.weight || 0,
                height: user.height || 0,
                goal: user.goal || 'maintain',
                dailyCalorieIntake: user.dailyCalorieIntake || 2000,
                dailyCalorieBurn: user.dailyCalorieBurn || 400,
            })
        }
    }

    useEffect(() => {
        populateFormData()
    }, [user])

    const handleSave = async ()=>{
        try {
           await api.put(`/api/users/${user?.id}`, formData)
            await fetchUser(user?.token || '')
            toast.success("Profile Updated Successfully");

        } catch (error: any) {
            console.log(error);
            toast.error(error?.message || "Failed to update profile")
        }
        setIsEditing(false);
    }

    const getStarts = () => {
        const totalFoodEntries = allFoodLogs?.length || 0;
        const totalActivityEntries = allActivityLogs?.length || 0;
        return {totalFoodEntries, totalActivityEntries}
    }

    const stats = getStarts();

    if(!user || !formData) return null
    return (
        <div className="page-container">
            {/* header */}
            <div className="page-header">
                <h1 className={`text-2xl font-semibold capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Profile</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your settings</p>
            </div>

            <div className="profile-content">
                {/* left col */}
                <Card>
                    {/* card title */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="size-12 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                            <User className="size-6 text-white"/>
                        </div>
                        <div>
                            <h2 className={`font-semibold  capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Your Profile</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-xs">Member since {new Date(user.createdAt || '').toLocaleDateString()}</p>
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="space-y-4">
                            <Input label="Age" type="number" value={formData.age} onChange={(v)=>setFormData({...formData, age: Number(v)})} min={13} max={120}/>
                            <Input label="Weight (kg)" type="number" value={formData.weight} onChange={(v)=>setFormData({...formData, weight: Number(v)})} min={20} max={300}/>
                            <Input label="Height" type="number" value={formData.height} onChange={(v)=>setFormData({...formData, height: Number(v)})} min={100} max={250}/>

                            <Select label="Fitness Goal" value={formData.goal as string} onChange={(v) => setFormData({...formData, goal: v as 'loss' | 'maintain' | 'gain'})} options={goalOptions}/>

                                <div className="flex gap-3 pt-2">
                                    <Button variant="secondary" className="flex-1" onClick={()=>{
                                        setIsEditing(false);
                                        setFormData({
                                            age: Number(user.age),
                                            weight: Number(user.weight),
                                            height: Number(user.height),
                                            goal: user.goal || '',
                                            dailyCalorieIntake: user.dailyCalorieIntake || 2000,
                                            dailyCalorieBurn: user.dailyCalorieBurn || 400
                                        })
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} variant="secondary" className="flex-1">
                                        Save Changes
                                    </Button>
                                </div>
                        </div>
                    ): (
                        <>
                        <div className="space-y-4">
                            {/* age */}
                            <div className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                    <Calendar className="size-4.5 text-blue-600 dark:text-blue-400"/>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Age</p>
                                    <p className={`font-semibold  capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.age} years</p>
                                </div>
                            </div>
                                  {/* weight */}
                             <div className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                                    <Scale className="size-4.5 text-purple-600 dark:text-purple-400"/>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Weight</p>
                                    <p className={`font-semibold  capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.weight} kg</p>
                                </div>
                            </div>

                            {/* Height */}

                            {user.height !== 0 && (
                                <div className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                    <User className="size-4.5 text-green-600 dark:text-green-400"/>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Height</p>
                                    <p className={`font-semibold  capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.height} cm</p>
                                </div>
                            </div>
                            )}

                            {/* Goal */}
                               <div className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                <div className="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                                    <Target className="size-4.5 text-orange-600 dark:text-orange-400"/>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Goal</p>
                                    <p className={`font-semibold  capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{goalLabels[user?.goal || 'gain']}</p>
                                </div>
                            </div>

                        </div>
                        <Button variant="secondary" onClick={()=>setIsEditing(true)} className="w-full mt-4">Edit Profile</Button> 
                        </>
                    )}
                </Card>
                {/* right col */}
                <div className="space-y-4">
                    {/* Starts card */}
                    <Card>
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Your Stats</h3>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className={`text-center p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-emerald-50'}`}>
                                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'}`}>{stats.totalFoodEntries}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Food Entries</p>
                            </div>
                            <div className={`text-center p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'}`}>
                                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>{stats.totalActivityEntries}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Activities</p>
                            </div>
                        </div>
                    </Card>
                    {/* toggle theme button for phone*/}
                    <div className="lg:hidden">
                     <button 
                      onClick={toggleTheme} 
                      className={`flex items-center gap-3 px-4 py-2.5 w-full rounded-lg transition-colors duration-200 cursor-pointer ${
                      theme === 'light' ? 'text-slate-500 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
                     {theme === 'light' ? (
                     <>
                      <MoonIcon className="size-5" />
                      <span className="text-base">Dark Mode</span>
                     </>
                    ) : (
                    <>
                    <SunIcon className="size-5" />
                    <span className="text-base">Light Mode</span>
                    </>
                    )}
                   </button>
                 </div>

                 {/* logout button */}

                 <Button variant="danger" onClick={logout} className="w-full ring ring-red-300 hover:ring-2">
                    <LogOut className="size-4"/>
                    Logout
                 </Button>
                </div>
            </div> 
        </div>
    )
}

export default Profile