import { getMotivationalMessage } from "../assets/assets";
import { useAppContext } from "../context/AppContext"
import { useTheme } from "../context/ThemeContext"
import type { ActivityEntry, FoodEntry } from "../types";
import { useEffect, useState} from "react"
import Card  from "../components/ui/Card"
import ProgressBar from "../components/ui/ProgressBar"
import { FlameIcon, HamburgerIcon, Activity, ZapIcon, TrendingUpIcon, ScaleIcon, Ruler } from "lucide-react";
import CaloriesChart from "../components/CaloriesChart";


const Dashboard = () => {

    const { user, allActivityLogs, allFoodLogs } = useAppContext();
const { theme } = useTheme();

const [todayFood, setTodayFood] = useState<FoodEntry[]>([]);
const [todayActivities, setTodayActivities] = useState<ActivityEntry[]>([]);

const DAILY_CALORIE_LIMIT: number = user?.dailyCalorieIntake || 2000;

// Load user data
const loadUserData = () => {
    const today = new Date().toISOString().split("T")[0];

    const foodData = allFoodLogs.filter(
        (f: FoodEntry) => f.createdAt?.split("T")[0] === today
    );
    setTodayFood(foodData);

    const activityData = allActivityLogs.filter(
        (a: ActivityEntry) => a.createdAt?.split("T")[0] === today
    );
    setTodayActivities(activityData);
};

useEffect(() => {
    loadUserData();
}, [allActivityLogs, allFoodLogs]);

const totalCalories: number = todayFood.reduce(
    (sum: number, item: FoodEntry) => sum + item.calories,
    0
);

const remainingCalories: number = DAILY_CALORIE_LIMIT - totalCalories;

const totalActiveMinutes: number = todayActivities.reduce(
    (sum: number, item: ActivityEntry) => sum + item.duration,
    0
);

const totalBurned: number = todayActivities.reduce(
    (sum: number, item: ActivityEntry) => sum + (item.calories || 0),
    0
);

    const motivation = getMotivationalMessage(totalCalories, totalActiveMinutes, DAILY_CALORIE_LIMIT);
    return (
        <div className="page-container dark:bg-slate-950">
           {/* header */}
           <div className="dashboard-header">
            <p className="text-emerald-100 text-sm font-medium">welcome back</p>
            <h1 className="text-2xl font-bold mt-1">{`Hi there! ${user?.username}`}</h1>

            {/* motivation card */}
            <div className="mt-6 bg-white/10 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-4 border border-white/10 dark:border-slate-700 transition-colors duration-200">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{motivation.emoji}</span>
                    <p className="text-slate-50 font-medium">{motivation.text}</p>
                </div>
            </div>
           </div>

           {/* Main content */}

           <div className="dashboard-grid">
            {/* calories card */}
            <Card className="shadow-lg col-span-2 dark:!bg-slate-950/95 dark:!border-slate-800 dark:shadow-black/30">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                            <HamburgerIcon className="w-6 h-6 text-orange-400"/>
                        </div>
                        <div>
                            <p className="text-slate-400 dark:text-slate-400 text-sm">Calories Consumed</p>
                            <p className="text-2xl font-bold text-slate-500 dark:text-white">{totalCalories}</p>
                        </div>

                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 dark:text-slate-400 text-sm">Limit</p>
                        <p className="text-2xl font-bold text-slate-500 dark:text-white">{DAILY_CALORIE_LIMIT}</p>

                    </div>

                </div>
                <ProgressBar value={totalCalories} max={DAILY_CALORIE_LIMIT}/>

                <div className="mt-4 flex justify-between items-center">
                    <div className={`text-sm font-medium ${remainingCalories >= 0 ? 'text-emerald-500 dark:text-emerald-300' : 'text-red-500 dark:text-red-300'}`}>
                        {remainingCalories >= 0 ? `${remainingCalories} kcal remaining` : `${Math.abs(remainingCalories)} kcal over`}
                    </div>
                    <span className="text-sm text-slate-400">{Math.round((totalCalories / DAILY_CALORIE_LIMIT) * 100)}%</span>

                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 my-4"></div>

                <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                            <FlameIcon className="w-6 h-6 text-orange-400"/>
                        </div>
                        <div>
                            <p className="text-slate-400 dark:text-slate-400 text-sm">Calories Burned</p>
                            <p className="text-2xl font-bold text-slate-500 dark:text-white">{totalBurned}</p>
                        </div>

                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 dark:text-slate-400 text-sm">Goal</p>
                        <p className="text-2xl font-bold text-slate-500 dark:text-white">{user?.dailyCalorieBurn || 400}</p>

                    </div>
                </div>

                <ProgressBar value={totalBurned} max={user?.dailyCalorieBurn || 400}/>
            </Card>

            {/* Stats Row */}

            <div className="dashboard-card-grid">
                {/* active minute */}
                <Card>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-blue-500"/>
                        </div>
                        <p className="text-sm text-slate-400">Active</p>

                    </div>
                    <p className="text-2xl font-bold text-slate-500 dark:text-white">{totalActiveMinutes}</p>
                    <p className="text-sm text-slate-400">minutes today</p>
                </Card>

                 {/* activity counts */}
                <Card>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <ZapIcon className="w-5 h-5 text-purple-500"/>
                        </div>
                        <p className="text-sm text-slate-400">Workouts</p>

                    </div>
                    <p className="text-2xl font-bold text-slate-500 dark:text-white">{todayActivities.length}</p>
                    <p className="text-sm text-slate-400">activities logged</p>
                </Card>
            </div>

            {/* goal card */}
            {user && (
                <Card className={`bg-gradient-to-r ${theme === 'dark' ? 'from-slate-800 to-slate-700' : 'from-slate-100 to-slate-50'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}>
                            <TrendingUpIcon className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Your Goal</p>
                            <p className={`font-semibold capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {user.goal === 'lose' && 'Loss Weight'}
                                {user.goal === 'maintain' && 'Maintain Weight'}
                                {user.goal === 'gain' && 'Gain Weight'}
                            </p>
                        </div>
                    </div>

                </Card>
            )}

            {/* Body matrics card */}

            {user && user.weight && (
                <Card>
                    <div className="flex items-center gap-4 mb-6">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}>
                            <ScaleIcon className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div>
                            <h3 className={`font-semibold capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Body Metrics</h3>
                            <p className="text-slate-500 text-sm">Your Starts</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                                    <ScaleIcon className="w-4 h-4 text-slate-500"/>
                                </div>
                                <span className="text-sm text-slate-500 dark:text-slate-500">Weight</span>
                            </div>
                            <span className="font-semibold text-slate-500 dark:text-slate-400">{user.weight} kg</span>

                        </div>
                        {user.height && (
                             <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                                    <Ruler className="w-4 h-4 text-slate-500"/>
                                </div>
                                <span className="text-sm text-slate-500 dark:text-slate-500">Height</span>
                            </div>
                            <span className="font-semibold text-slate-500 dark:text-slate-400">{user.height} cm</span>

                        </div>
                        )}

                        {user.height && (
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-300">BMI</span>
                                    {(() =>{
                                        const bmi = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);
                                        const getStatus = (b: number) => {
                                            if (b < 18.5) {
                                                return {
                                                    color: 'text-blue-500',
                                                    bg: 'bg-blue-100'
                                                };
                                            }
                                            if (b < 25) {
                                                return {
                                                    color: 'text-emerald-500',
                                                    bg: 'bg-emerald-100'
                                                };
                                            }
                                            if (b < 30) {
                                                return {
                                                    color: 'text-orange-500',
                                                    bg: 'bg-orange-100'
                                                };
                                            }
                                            return {
                                                color: 'text-red-500',
                                                bg: 'bg-red-100'
                                            };
                                        }
                                        const status = getStatus(Number(bmi));
                                        return <span className={`text-lg font-bold ${status.color}`}>{bmi}</span>
                                    })()}
                                </div>
                                {/* BMI scale visual */}
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                    <div className="flex-1 bg-blue-400 opacity-70"></div>
                                    <div className="flex-1 bg-emerald-400 opacity-70"></div>
                                    <div className="flex-1 bg-orange-400 opacity-70"></div>
                                    <div className="flex-1 bg-red-400 opacity-70"></div> 
                                </div>
                                <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                                    <span>18.5</span>
                                    <span>25</span>
                                    <span>30</span>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* Quick summary */}
            <Card>
                <h3 className={`font-semibold capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Today's Summary</h3>
                <div className="space-y-1">
                    <div className="flex justify-between items-center py-2 border-b borser-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400">Meals logged</span>
                        <span className="font-medium text-slate-500 dark:text-slate-200">{todayFood.length}</span>
                    </div>
                       <div className="flex justify-between items-center py-2 border-b borser-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400">Total Calories</span>
                        <span className="font-medium text-slate-500 dark:text-slate-200">{totalCalories} kcal</span>
                    </div>
                       <div className="flex justify-between items-center py-2">
                        <span className="text-slate-500 dark:text-slate-400">Active Time</span>
                        <span className="font-medium text-slate-500 dark:text-slate-200">{totalActiveMinutes} min</span>
                    </div>
                </div>
            </Card>

            {/* Activity and Inteke graph */}
            <Card className="col-span-2">
                <h3 className={`font-semibold capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>This week's progress</h3>
                <CaloriesChart/>
            </Card>

           </div>
        </div>
    )
}

export default Dashboard