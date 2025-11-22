import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hero from '../assets/hero.png'
import { APP_FEATURES } from "../utils/data"
import Modal from '../components/Modal'
import Login from './Auth/Login'
import Signup from './Auth/SignUp'

const LandingPage = () => {
  const navigate = useNavigate()
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  
  const handleGetStarted = () => {
    setOpenAuthModel(true)
  }

  return (
    <>
    <div className='min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob'></div>
        <div className='absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000'></div>
      </div>

      {/* Header */}
      <header className='relative z-10 flex items-center justify-between px-8 lg:px-16 py-6 backdrop-blur-sm'>
        <div className='text-2xl font-bold text-gray-900 hover:scale-105 transition-transform duration-300 cursor-pointer'>
          Interview Prep AI
        </div>
        <button 
          onClick={handleGetStarted}
          className='group relative bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 overflow-hidden'>
          <span className='relative z-10'>Login / Sign Up</span>
          <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
        </button>
      </header>

      {/* Hero Section */}
      <section className='relative z-10 px-8 lg:px-16 py-12 lg:py-20'>
        <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <div className='space-y-6 animate-fadeInUp'>
            <div className='inline-flex items-center gap-2 bg-linear-to-r from-orange-100 to-amber-100 border border-orange-300 rounded-full px-5 py-2.5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105'>
              <svg className='w-5 h-5 text-orange-500 animate-pulse' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
              </svg>
              <span className='text-orange-700 font-semibold'>AI Powered</span>
            </div>
            
            <h1 className='text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight'>
              Ace Interviews with <br />
              <span className='bg-linear-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent animate-gradient'>
                AI-Powered
              </span> Learning
            </h1>
            
            <p className='text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl'>
              Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery — your ultimate interview toolkit is here.
            </p>
            
            <div className='flex gap-4 pt-4'>
              <button 
                onClick={handleGetStarted}
                className='group relative bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg hover:scale-105 overflow-hidden'>
                <span className='relative z-10 flex items-center gap-2'>
                  Get Started
                  <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </span>
                <div className='absolute inset-0 bg-linear-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>
              
              <button 
                className='group bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg border-2 border-gray-200 hover:border-orange-300 hover:scale-105'>
                <span className='flex items-center gap-2'>
                  Watch Demo
                  <svg className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z' />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Right Content - Browser Mockup */}
          <div className='relative animate-fadeInUp animation-delay-300'>
            {/* Glow effect */}
            <div className='absolute -inset-4 bg-linear-to-r from-orange-400 to-amber-400 rounded-3xl blur-2xl opacity-20 animate-pulse'></div>
            
            <div className='relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-shadow duration-500'>
              {/* Browser Header */}
              <div className='bg-linear-to-r from-gray-100 to-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-200'>
                <div className='flex gap-2'>
                  <div className='w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors'></div>
                  <div className='w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors'></div>
                  <div className='w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors'></div>
                </div>
                <div className='flex-1 bg-white rounded-md px-3 py-1.5 mx-4 text-xs text-gray-500 flex items-center shadow-inner'>
                  <svg className='w-3.5 h-3.5 mr-2 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                  </svg>
                  <span className='text-gray-700 font-medium'>https://interviewprogram.com/interview-prep</span>
                </div>
                <div className='flex gap-2'>
                  <svg className='w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                  </svg>
                </div>
              </div>
              
              {/* Browser Content */}
              <div className='p-6 bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-bold text-gray-900'>Interview Prep AI</h2>
                  <div className='flex items-center gap-3 bg-white px-3 py-2 rounded-full shadow-md'>
                    <img src={hero} alt='User' className='w-9 h-9 rounded-full object-cover ring-2 ring-orange-400' />
                    <div>
                      <div className='text-sm font-bold text-gray-900'>Mike William</div>
                      <div className='text-xs text-orange-500 font-medium hover:text-orange-600 cursor-pointer'>Logout</div>
                    </div>
                  </div>
                </div>

                <div className='bg-white rounded-2xl p-6 shadow-xl mb-4 hover:shadow-2xl transition-all duration-300 border border-gray-100'>
                  <div className='flex items-start justify-between mb-4'>
                    <div>
                      <h3 className='text-lg font-bold text-gray-900 mb-2'>Frontend Developer</h3>
                      <p className='text-sm text-gray-600 mb-3'>React.js, DOM manipulation, CSS Flexbox</p>
                    </div>
                    <div className='bg-linear-to-r from-orange-500 to-orange-600 p-2 rounded-lg'>
                      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2 mb-5'>
                    <span className='bg-linear-to-r from-gray-900 to-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm'>Experience: 2 Years</span>
                    <span className='bg-linear-to-r from-gray-900 to-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm'>ID:GBK4</span>
                    <span className='bg-linear-to-r from-gray-900 to-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm'>Last Updated: 10th Apr 2025</span>
                  </div>
                  
                  <div className='space-y-3'>
                    <div className='bg-linear-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 pl-4 py-3 rounded-r-lg hover:shadow-md transition-shadow duration-300'>
                      <p className='text-sm font-semibold text-gray-800'>What is JSX? Explain its role in React.</p>
                    </div>
                    <div className='bg-gray-50 border-l-4 border-gray-300 pl-4 py-3 rounded-r-lg hover:border-orange-400 hover:bg-orange-50 transition-all duration-300'>
                      <p className='text-sm text-gray-700'>Explain the concept of event handling in React</p>
                    </div>
                  </div>
                </div>

                <div className='bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100'>
                  <div className='flex items-center justify-between mb-3'>
                    <h4 className='text-sm font-bold text-gray-900 flex items-center gap-2'>
                      <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                      CSS Flexbox: A Beginner's Guide
                    </h4>
                    <button className='text-gray-400 hover:text-gray-600 hover:rotate-90 transition-transform duration-300'>✕</button>
                  </div>
                  <p className='text-xs text-gray-600 leading-relaxed mb-3'>
                    CSS Flexbox is a powerful layout model in CSS. It's designed to make it easier to design flexible and responsive web page layouts without having to rely on floats or positioning.
                  </p>
                  <div className='bg-linear-to-br from-gray-50 to-orange-50 rounded-xl p-3 border border-orange-200 shadow-inner'>
                    <div className='flex items-start gap-2 mb-2'>
                      <div className='w-5 h-5 rounded-full bg-linear-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 shadow-md'>1</div>
                      <div className='text-xs'>
                        <strong className='text-gray-900'>Flex Container:</strong> This is the parent element. You make an element a flex container by setting...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='relative z-10 px-8 lg:px-16 py-20 bg-white'>
        <div className='text-center mb-16'>
          <h2 className='text-5xl font-extrabold text-gray-900 mb-4 tracking-tight'>
            Features That Make You <span className='bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent'>Shine</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Everything you need to master your interview preparation journey
          </p>
        </div>
        
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Feature 1 */}
          <div className='group relative bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
            <div className='relative'>
              <div className='w-14 h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Tailored Just for You</h3>
              <p className='text-gray-700 leading-relaxed'>
                Get interview questions and model answers based on your role, experience, and specific focus areas — no generic practice here.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className='group relative bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
            <div className='relative'>
              <div className='w-14 h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Learn at Your Own Pace</h3>
              <p className='text-gray-700 leading-relaxed'>
                Expand answers only when you're ready. Dive deeper into any concept instantly with AI-powered detailed explanations.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className='group relative bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
            <div className='relative'>
              <div className='w-14 h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Capture Your Insights</h3>
              <p className='text-gray-700 leading-relaxed'>
                Add personal notes to any question and pin important ones to the top — making your learning more organized and impactful.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className='group relative bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
            <div className='relative'>
              <div className='w-14 h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Understand the "Why" Behind Answers</h3>
              <p className='text-gray-700 leading-relaxed'>
                Beyond just answers — unlock detailed concept explanations generated by AI, helping you truly master each topic.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className='group relative bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
            <div className='relative'>
              <div className='w-14 h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Save, Organize, and Revisit</h3>
              <p className='text-gray-700 leading-relaxed'>
                Easily save your interview sets, organize them neatly in your dashboard, and pick up your preparation right where you left off.
              </p>
            </div>
          </div>

          {/* Feature 6 - CTA Card */}
          <div className='group relative bg-linear-to-br from-orange-500 via-orange-600 to-amber-600 rounded-3xl p-8 border border-orange-600 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center text-center overflow-hidden'>
            <div className='absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-opacity duration-500'></div>
            <div className='relative'>
              <div className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5 shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>Ready to Get Started?</h3>
              <p className='text-white/90 mb-6 leading-relaxed'>
                Join thousands preparing smarter with AI
              </p>
              <button 
                onClick={handleGetStarted}
                className='bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105'>
                Start Preparing Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='relative z-10 px-8 lg:px-16 py-12 bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 border-t border-orange-100'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Interview Prep AI</h3>
              <p className='text-gray-600 text-sm'>
                Your ultimate AI-powered companion for mastering technical interviews.
              </p>
            </div>
            <div>
              <h4 className='font-bold text-gray-900 mb-4'>Quick Links</h4>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li><a href='#' className='hover:text-orange-600 transition-colors duration-300'>About Us</a></li>
                <li><a href='#' className='hover:text-orange-600 transition-colors duration-300'>Features</a></li>
                <li><a href='#' className='hover:text-orange-600 transition-colors duration-300'>Pricing</a></li>
                <li><a href='#' className='hover:text-orange-600 transition-colors duration-300'>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className='font-bold text-gray-900 mb-4'>Connect With Us</h4>
              <div className='flex gap-4'>
                <a href='#' className='w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'/></svg>
                </a>
                <a href='#' className='w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/></svg>
                </a>
                <a href='#' className='w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className='border-t border-orange-200 pt-6 text-center'>
            <p className='text-gray-600 flex items-center justify-center gap-2 text-sm'>
              Made with <span className='text-red-500 animate-pulse text-lg'>❤️</span> Happy Coding
            </p>
            <p className='text-gray-500 text-xs mt-2'>© 2025 Interview Prep AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    <Modal 
      isOpen={openAuthModel}
      onClose={() => setOpenAuthModel(false)}
      setOpenAuthModel={setOpenAuthModel}
      setCurrentPage={setCurrentPage} hideHeader>
        <div>
          {currentPage === 'login' ? <Login setCurrentPage={setCurrentPage} /> : <Signup setCurrentPage={setCurrentPage} />}
        </div>
    </Modal>
    </>
  )
}

export default LandingPage