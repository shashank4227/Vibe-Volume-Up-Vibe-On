import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFacebookF, FaApple, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Background images array (Netflix style - denser grid)
  const bgImages = [
    '/monica.jpg', '/mirai.jpg', '/shankar.jpg', '/telusu_kadha.jpg',
    '/kingdom.jpg', '/andhra_king.jpg', '/og.jpeg', '/singari.jpg',
    '/s1.jpg', '/s2.jpg', '/s3.jpg', '/s4.jpg',
    '/dude.jpg', '/pushpa.jpg', '/monica.jpg', '/mirai.jpg',
    '/shankar.jpg', '/telusu_kadha.jpg', '/kingdom.jpg', '/andhra_king.jpg',
    '/og.jpeg', '/singari.jpg', '/s1.jpg', '/s2.jpg',
    '/dude.jpg', '/pushpa.jpg', '/monica.jpg', '/mirai.jpg' 
  ]

  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const validateForm = () => {
    // Name validation (only for sign up)
    if (!isLogin && (!formData.name || formData.name.trim().length < 3)) {
      setError('Username must be at least 3 characters long')
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    // Password validation
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }

    // Confirm password validation (only for sign up)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return

    if (isLogin) {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.message || 'Login failed')
      }
    } else {
      const result = await register(formData.name, formData.email, formData.password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.message || 'Registration failed')
      }
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative overflow-hidden font-sans perspective-1000">
      
      {/* Background Image Collage - 3D Plane (Netflix Style) */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none">
         {/* Dark Overlay over the whole background to push it back */}
         <div className="absolute inset-0 bg-black/40 z-10"></div>
         
         <div 
            className="grid grid-cols-6 gap-3 w-[150vw] h-[150vh]"
            style={{
                transform: 'rotateX(8deg) rotateY(0deg) rotateZ(-3deg) scale(1.1)',
                transformOrigin: 'center center'
            }}
         >
           {bgImages.map((img, index) => (
             <div key={index} className="relative w-full h-full overflow-hidden rounded-md">
                <img 
                  src={img} 
                  alt="Background" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 blur-[0.5px]"
                />
             </div>
           ))}
        </div>
        {/* Gradient overlays to fade edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
      </div>

      {/* Main Single Card Form */}
      <div className="bg-[#050505]/80 backdrop-blur-2xl rounded-[30px] shadow-2xl w-full max-w-lg flex overflow-hidden relative z-20 border border-white/5 mx-4">
        
        {/* Form Container */}
        <div className="w-full p-8 lg:p-10 flex flex-col justify-center relative bg-[#050505]/50">
          
          <div className="mb-6 text-center">
            <img src="/logo.png" alt="Vibe Logo" className="h-12 w-auto mb-4 mx-auto drop-shadow-[0_0_15px_rgba(233,69,96,0.5)]" />
            <h1 className="text-3xl font-bold text-white font-sans mb-1 tracking-tight">
              {isLogin ? 'Welcome Back!' : 'Start Vibing'}
            </h1>
            <p className="text-sm font-medium text-gray-400">
              {isLogin ? 'Login to continue your musical journey.' : 'Sign up to vibe with your favorite songs.'}
            </p>
          </div>

          <form className="space-y-4 max-w-sm w-full mx-auto" onSubmit={handleSubmit}>
            
            
            
            {/* Username */}
            {!isLogin && (
            <div className="group">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#E94560] transition-colors">
                Username
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border-b border-gray-800 py-2 text-base font-bold text-white focus:outline-none focus:border-[#E94560] transition-colors bg-transparent placeholder-gray-700"
                placeholder="Enter your name" 
              />
            </div>
            )}

             {/* Email */}
             <div className="group">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#E94560] transition-colors">
                Mail
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-b border-gray-800 py-2 text-base font-bold text-white focus:outline-none focus:border-[#E94560] transition-colors bg-transparent placeholder-gray-700"
                placeholder="Enter your email" 
              />
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#E94560] transition-colors">
                Password
              </label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border-b border-gray-800 py-2 text-base font-bold text-white focus:outline-none focus:border-[#E94560] transition-colors bg-transparent placeholder-gray-700"
                placeholder="••••••••••••" 
              />
            </div>

            {!isLogin && (
            <div className="group">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#E94560] transition-colors">
                Confirm Password
                </label>
                <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full border-b border-gray-800 py-2 text-base font-bold text-white focus:outline-none focus:border-[#E94560] transition-colors bg-transparent placeholder-gray-700"
                placeholder="••••••••••••" 
                />
            </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold px-3 py-2 rounded-md mb-4 text-center">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#E94560] to-[#0F3460] text-white font-bold text-sm py-3 rounded-full shadow-lg shadow-[#E94560]/20 hover:shadow-[#E94560]/40 transition-all transform hover:-translate-y-0.5 mt-4"
            >
              {isLogin ? 'Continue' : 'Create Account'}
            </button>


          </form>

            <div className="mt-8 flex flex-col items-center max-w-sm w-full mx-auto">
                <div className="flex items-center justify-between w-full mb-4">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Or connect with</span>
                  <div className="flex gap-3">
                      <button className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors hover:border-white">
                          <FaFacebookF className="w-3 h-3" />
                      </button>
                      <button className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors hover:border-white">
                          <FaApple className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors hover:border-white">
                          <FaGoogle className="w-3 h-3" />
                      </button>
                  </div>
                </div>
            
                 <button onClick={() => setIsLogin(!isLogin)} className="text-xs font-bold text-gray-500 hover:text-white transition-colors w-full text-center">
                     {isLogin ? "New here? Create account" : "Already have an account? Login"}
                 </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
