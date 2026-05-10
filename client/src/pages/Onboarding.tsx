import { ArrowLeft, ArrowRight, PersonStanding, ScaleIcon, Target, User, Weight } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import { useAppContext } from "../context/AppContext";
import type { ProfileFormData, UserData } from "../types";
import Input from "../components/ui/Input";
import Button from "../assets/ui/Button";
import mockApi from "../assets/mockApi";
import { goalOptions } from "../assets/assets";

const Onboarding = () => {

    const [step, setStep] = useState(1);
    const {user, setOnboardingCompleted, fetchUser} = useAppContext();
    const [formData, setFormData] = useState<ProfileFormData>({
        age: 0,
        weight: 0,
        height: 0,
        goal: 'maintain',
        dailyCalorieIntake: 2000,
        dailyCalorieBurn: 400
    })

    const totalSteps = 3;

    const updateField = (field : keyof ProfileFormData, value : string | number) => {
        setFormData({...formData, [field]: value})
    }

    const handleNext = async () => {
          if(step === 1){
            if(!formData.age || Number(formData.age) < 13 || Number(formData.age) > 120){
              return toast("Age is required")
            }
          }
          if(step < totalSteps){
            setStep(step + 1)
          }else{
            const userData = {
              ...formData, 
              age: formData.age,
              Weight: formData.weight,
              height: formData.height ? formData.height : null,
              createdAt: new Date().toISOString()
            };
            localStorage.setItem('fitnessUser', JSON.stringify(userData))
            await mockApi.user.update(user?.id || "", userData as unknown as Partial<UserData>)
            toast.success("Profile updated successfully")
            setOnboardingCompleted(true)
            fetchUser(user?.token || "")
          }
    }

  return (
    <>
      <Toaster />

      <div className="onboarding-container ">
        {/* Header */}
       <div className="p-6 pt-12 onboarding-wrapper">
  <div className="flex items-center gap-3 mb-2">
    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
      <PersonStanding className="w-6 h-6 text-white" />
    </div>
    <h1 className="text-2xl font-bold"> FitTrack </h1>
  </div>

  <p className="text-slate-500 dark:text-slate-400 mt-4">
    Let's personalize your Experience
  </p>

  {/* progress Indicator */}
  <div className="mt-6">
    <div className="flex gap-2 max-w-2xl">
      {[1,2,3].map((s)=>(
        <div
          key={s}
          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
            s <= step ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
          }`}
        />
      ))}
    </div>
    <p className="text-sm text-slate-400 mt-3">Step {step} of {totalSteps}</p>
  </div>

  {/* Form content */}
  <div className="flex-1  mt-8">
    {step === 1 && (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="size-10 rounded-xl  border border-emerald-200
     flex items-center justify-center">
                <User className="size-6 text-emerald-600 dark:text-emerald-400"/></div>
                <div>
                    <h2 className="text-lg font-semibold ">How old are you?</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">This helps us to calculate your needs</p>
                </div>
            </div>
            <Input label="Age" type="number" className="max-w-xl" value={formData.age}
            onChange={(v)=>updateField('age', v)} placeholder="Enter your Age" min={13} max={120} required/>
        </div>
    )}
    
      {step === 2 && (
        <div className="space-y-6 mt-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="size-10 rounded-xl  border border-emerald-200
     flex items-center justify-center">
                <ScaleIcon className="size-6 text-emerald-600 dark:text-emerald-400"/></div>
                <div>
                    <h2 className="text-lg font-semibold ">Your measurement</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Help us track your progress</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 max-w-2xl">
              <Input label="Weight (kg)" type="number" value={formData.weight}
            onChange={(v)=>updateField('weight', v)} placeholder="Enter your Weight" min={20} max={300} required/>

             <Input label="Height (cm)" type="number" value={formData.height}
            onChange={(v)=>updateField('height', v)} placeholder="Enter your height" min={100} max={250}/>
            </div>
            
        </div>
    )} 

     {step === 3 && (
        <div className="space-y-6 mt-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="size-10 rounded-xl  border border-emerald-200
                       flex items-center justify-center">
                <Target className="size-6 text-emerald-600 dark:text-emerald-400"/></div>
                <div>
                    <h2 className="text-lg font-semibold ">What's your goal?</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">we'll tailor your experience</p>
                </div>
            </div>

            {/* Options */}
           <div className="space-y-4 max-w-lg">
  {goalOptions.map((option) => (
    <button
      key={option.value}
      onClick={() => setFormData({ ...formData, goal: option.value })}
      className={`w-full border border-slate-700 bg-slate-800 hover:border-slate-600 p-4 rounded-lg transition
        ${formData.goal === option.value ? "ring-2 ring-emerald-500" : ""}
      `}
    >
      <span className="text-base text-slate-200">
        {option.label}
      </span>
    </button>
  ))}
</div>

           
             
        </div>
    )} 
  </div>
    {/* Navigation buttons */}
<div className="p-6 pb-10">
  <div className="flex gap-3 lg:justify-end">

    {step > 1 && (
      <button
        onClick={() => setStep(step > 1 ? step - 1 : 1)}
        className="
          max-lg:flex-1 lg:px-10 px-6 py-3 rounded-xl
          border border-slate-700 bg-slate-800
          hover:border-slate-600 transition
          text-slate-200
        "
      >
        <span className="flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </span>
      </button>
    )}

    <button
      onClick={handleNext}
      className="
        max-lg:flex-1 lg:px-10 px-6 py-3 rounded-xl
        border border-emerald-500 bg-slate-800
        ring-2 ring-emerald-500
        hover:bg-slate-700 transition
        text-white font-semibold
      "
    >
      <span className="flex items-center justify-center gap-2">
        {step === totalSteps ? "Get Started" : "Continue"}
        <ArrowRight className="w-5 h-5" />
      </span>
    </button>

  </div>
</div>

</div>

</div>
    </>
  )
}

export default Onboarding
