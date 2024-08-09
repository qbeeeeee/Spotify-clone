import React, { useState } from 'react'

const LoginSignUp = () => {

    const [isLogin,setIsLogin] = useState(true);
    const url = 'http://localhost:4000';
    const [formData,setFormData] = useState({
        name:"",
        password:"",
        email:""
      })

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const login = async () =>{
        console.log("Login function exc", formData);
        let responseData;
        await fetch(`${url}/api/user/login`,{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>{responseData=data})
    
        if(responseData.success){
          localStorage.setItem('auth-token',responseData.token);
          window.location.replace("/");
        }
        else{
          alert(responseData.errors);
        }
      }

    const signup = async () =>{
        if(formData.email ==="" || formData.username === "" || formData.password === "")
        {
          return alert("Please Fill All Fields");
        }
        else if(formData.password.length<6){
          return alert("Require Stronger Password");
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)){
          return alert("Invalid Email Adress");
        }
        console.log("sign up exc", formData);
        let responseData;
        await fetch(`${url}/api/user/signup`,{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>{responseData=data})
    
        if(responseData.success){
          localStorage.setItem('auth-token',responseData.token);
          window.location.replace("/");
        }
        else{
          alert(responseData.errors);
        }
    
      }

    const handleIsLogin = () => {
        if(isLogin){
            setIsLogin(false);
            setFormData({
                name: '',
                password: '',
                email: '',
              });
        }else{
            setIsLogin(true);
            setFormData({
                name: '',
                password: '',
                email: '',
              });
        }
    }

  return (
    <div className="flex items-center justify-center h-[100%] min-w-[100%]">
        <div className="bg-zinc-900 rounded-lg shadow-lg p-8 max-w-md min-w-[40%] min-h-[40%]">
            <div className="mb-4 flex justify-center">
                <div onClick={isLogin?null:handleIsLogin} className={isLogin?"opacity-80 hover:opacity-100 hover:scale-105 hidden sm:block text-gray-300 active px-4 py-2 rounded-l focus:outline-none cursor-pointer"
                    :"bg-white text-black text-[16px] px-6 py-3 rounded-3xl cursor-pointer hover:scale-105 hover:opacity-90"}>
                    Log In
                </div>
                <div onClick={isLogin?handleIsLogin:null} className={isLogin?'bg-white text-black text-[16px] px-6 py-3 rounded-3xl cursor-pointer hover:scale-105 hover:opacity-90'
                    :"opacity-80 hover:opacity-100 hover:scale-105 text-gray-300 active px-4 py-2 rounded-l hidden sm:block focus:outline-none cursor-pointer"}>
                    Sign Up
                </div>
            </div>


            <form className={isLogin?"form-content":"form-content hidden"}>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input name="email" value={formData.email} onChange={changeHandler} className="w-full py-3 px-4 pl-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" type="email" placeholder="Email" required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input name="password" value={formData.password} onChange={changeHandler} className="w-full py-3 px-4 pl-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" type="password" placeholder="Password" required/>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={login} className="bg-green-600 rounded-3xl hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Log In
                    </button>
                </div>
            </form>

            <form className={isLogin?"form-content hidden":"form-content"}>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input name="name" value={formData.name} onChange={changeHandler} className="w-full py-3 px-4 pl-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" placeholder="Username" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input name="email" value={formData.email} onChange={changeHandler} className="w-full py-3 px-4 pl-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" type="email" placeholder="Email" required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input name="password" value={formData.password} onChange={changeHandler} className="w-full py-3 px-4 pl-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" type="password" placeholder="Password" required/>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={signup} className="bg-green-600 rounded-3xl hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginSignUp