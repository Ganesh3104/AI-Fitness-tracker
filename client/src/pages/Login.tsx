
import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Toaster } from "react-hot-toast";
 

const Login = () => {
    
    const [state, setState] = useState('login');
    const [Username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const {login, signup, user} = useAppContext();

   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    if (state === "login") {
      await login({ email, password });
    } else {
      await signup({ username: Username, email, password });
    }
  } finally {
    setIsSubmitting(false);
  }
};


    useEffect(() => {
        if(user){
            navigate('/')
        }
    },[user, navigate])


    return (
        <>
            <Toaster />
            <main className="login-page-container">
                <form onSubmit={handleSubmit} className="login-form" >
                    <h2 className="text-3xl font-medium">
                        {state === 'login' ? "Sign In" : "Sign Up"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500/90">
                        {state === 'login' ? 'Please enter email and password to assess.' : 'Please enter your details to create an account.'}
                    </p>

                    {state !== 'login' && (
                        // Username
                        <div className="mt-4">
                            <label className="font-medium text-sm">Username</label>
                            <div className="relative mt-2">
                                <AtSignIcon className="absolute left-3 top-1/2 translate-y-2/3 text-gray-400 size-4.5"/>
                            </div>
                            <input onChange={(e)=>setUsername(e.target.value)} value={Username} 
                            type="text" placeholder="Enter a Username" className="login-input" required />
                        </div>
                    )}
                       
                      {/* Email */}
                    <div className="mt-4">
                            <label className="font-medium text-sm">Email</label>
                            <div className="relative mt-2">
                                <MailIcon className="absolute left-3 top-1/2 translate-y-2/3 text-gray-400 size-4.5"/>
                            </div>
                            <input onChange={(e)=>setEmail(e.target.value)} value={email} 
                            type="email" placeholder="Enter a Email" className="login-input" required />
                        </div>

                         
                        {/* Password */}
             <div className="mt-4">
              <label className="font-medium text-sm">Password</label>

                <div className="relative mt-2">
                {/* Lock icon */}
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>

               {/* Input */}
               <input onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? "text" : "password"} placeholder="Enter a Password" required className="login-input pr-10"/>

               {/* Eye button */}
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword((p) => !p)}>
               {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
             </button>
           </div>
         </div>

         <button type="submit" disabled={isSubmitting} className="login-button mt-5 p-2 color-white bg-green-600 hover:bg-green-700 w-full border-none rounded-md ">

            {isSubmitting ? "Signing In..." : state === "login" ? 'Login' : 'sign Up'}

         </button>

         {state === 'login'
          ? (<p className="pt-2">Don't have an account? 
          <button onClick={()=> setState('sign-up')} className="ml-1 cursor-pointer text-blue-600 hover:underline ">Sign up</button></p>
          )
        :
        (
            <p className="pt-2">Already have an account? <button onClick={()=> setState('login')} className="ml-1 cursor-pointer text-blue-600 hover:underline ">Login</button></p>
        )}

      </form>

    </main>
</>
    )
}

export default Login