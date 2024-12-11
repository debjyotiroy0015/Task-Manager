import { useRef, useState ,useEffect} from "react";
const SigninSignupPage = () =>{
    const [checked,setChecked] = useState(false)
    const [showSignUp,setShowSignUp] = useState(false)
    const taskFormRef = useRef(null);
    const handleLogIn = () => {
    if (taskFormRef.current) {
      const formData = new FormData(taskFormRef.current);
      const data = {
        emailId: formData.get("emailId"),
        password: formData.get("password")
      };

      // Validate mandatory fields
      for (const [key, value] of Object.entries(data)) {
        if (!value) {
          alert(`Please fill out the ${key} field.`);
          return;
        }
      }
    }
  };
  useEffect(() => {
    if (taskFormRef.current) {
      const form = taskFormRef.current;
      form.reset();
      setChecked(false); // Reset the checkbox for showing password
    }
  }, [showSignUp]);
    return(
        <div className="flex justify-center items-center w-full mt-[10%] mb-[10%]">
            {showSignUp?
            (<form
                ref={taskFormRef}
                className="w-[40%] p-4 rounded-md border-2 flex gap-4 flex-col"
            >
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-900 mb-2"
                >
                    Email Id : 
                </label>
                <input
                    type="text"
                    id="email"
                    name="emailId"
                    placeholder="Email Id"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
                <label
                    htmlFor="pass"
                    className="block text-sm font-medium text-slate-900 mb-2"
                >
                    Password :
                </label>
                <input
                    type={!checked?"password":"text"}
                    id="pass"
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
                <span className="flex items-center gap-2"><input type="checkbox"  name="checkbox" className="accent-slate-900" onChange={(e)=>{setChecked(e.target.checked)}}/>Click on the check box to show Password</span>
                <button
                    type="button"
                    onClick={handleLogIn}
                    className="px-6 py-2 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                    Log in
                </button>
                <div className="text-center text-slate-900"> Do not have an account ? Sign up <span className="underline cursor-pointer" onClick={()=>{setShowSignUp(!showSignUp)}}>here</span> </div>
            </form>):
            (<form
                ref={taskFormRef}
                className="w-[40%] p-4 rounded-md border-2 flex gap-4 flex-col"
            >   
                <label
                    htmlFor="fname"
                    className="block text-sm font-medium text-slate-900 mb-2"
                >
                    Full Name : 
                </label>
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
                <label
                    htmlFor="phNumber"
                    className="block text-sm font-medium text-slate-900 mb-2"
                >
                    Phone Number : 
                </label>
                <input
                    type="text"
                    id="phNumber"
                    name="phNumber"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />               
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-900 mb-2"
                >
                    Email Id : 
                </label>
                <input
                    type="text"
                    id="email"
                    name="emailId"
                    placeholder="Email Id"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
                <label
                    htmlFor="pass"
                    className="block text-sm font-medium text-slate-900 mb-2"
                >
                    Password :
                </label>
                <input
                    type={!checked?"password":"text"}
                    id="pass"
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
                <span className="flex items-center gap-2"><input type="checkbox"  name="checkbox" className="accent-slate-900" onChange={(e)=>{setChecked(e.target.checked)}}/>Click on the check box to show Password</span>
                <button
                    type="button"
                    onClick={handleLogIn}
                    className="px-6 py-2 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                    Log in
                </button>
                <div className="text-center text-slate-900"> Already have an account ? Log in <span className="underline cursor-pointer" onClick={()=>{setShowSignUp(!showSignUp)}}>here</span> </div>
            </form>)
            }
        </div>
    )
}
export default SigninSignupPage