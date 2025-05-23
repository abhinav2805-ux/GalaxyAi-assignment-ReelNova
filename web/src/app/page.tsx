'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Video, 
  Zap, 
  Star, 
  Cpu, 
  Cloud, 
  Download,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  Sparkles,
  Globe,
  Users,
  Trophy
} from 'lucide-react'
import VideoTransformationHero from '@/components/video-transformation-hero'
export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      content: "ReelNova transformed my workflow completely. The AI results are mind-blowing!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Video Producer",
      content: "Never seen anything like this. It's like having a Hollywood studio in your browser.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Social Media Manager",
      content: "Our engagement rates doubled after using ReelNova. Incredible tool!",
      rating: 5
    }
  ]

  const features = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Neural Processing",
      description: "Advanced neural networks analyze and enhance every frame with precision"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Rendering",
      description: "Powerful cloud infrastructure handles processing so your device doesn't have to"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get professional-quality transformations in minutes, not hours"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Universal Formats",
      description: "Works with any video format - MP4, MOV, AVI, and more"
    }
  ]

  const stats = [
    { number: "50K+", label: "Videos Transformed" },
    { number: "12K+", label: "Happy Creators" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9/5", label: "User Rating" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
    

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200 text-sm font-medium">AI-Powered Video Magic</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Reshape Reality
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                  Frame by Frame
                </span>
              </h1>
              
              <p className="text-xl text-purple-100 leading-relaxed max-w-xl">
                Revolutionary AI technology that transforms ordinary videos into extraordinary visual experiences. 
                No complex software, no learning curve - just pure creative magic.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/transform">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-2xl">
                    Start Creating
                    <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </button>
                </Link>
                <button className="flex items-center justify-center space-x-2 text-white border-2 border-purple-400 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-purple-400/10 transition-all">
                  <PlayCircle className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-purple-200 text-sm">12k+ creators</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-purple-200 text-sm ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>
            
            <VideoTransformationHero/>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-purple-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Next-Gen Video
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Powered by cutting-edge Hunyuan-Video AI model, delivering results that seemed impossible just years ago.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <div className="text-purple-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-purple-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Testimonial Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12">
            <div className="flex justify-center mb-6">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 mx-1" />
              ))}
            </div>
            <blockquote className="text-2xl lg:text-3xl font-bold text-white mb-8 leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            <div className="text-purple-300">
              <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
              <div className="text-purple-400">{testimonials[currentTestimonial].role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Start free, upgrade when you need more power
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
                <div className="text-4xl font-bold text-white mb-2">Free</div>
                <p className="text-purple-300 mb-8">Perfect for trying out</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  3 video transformations
                </li>
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Standard quality
                </li>
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Basic styles
                </li>
              </ul>
              <button className="w-full border-2 border-purple-500 text-purple-300 py-3 rounded-xl font-semibold hover:bg-purple-500/10 transition-all">
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-2 border-purple-400 rounded-2xl p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
                <div className="text-4xl font-bold text-white mb-2">$19</div>
                <p className="text-purple-300 mb-8">per month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Unlimited transformations
                </li>
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  HD quality
                </li>
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  All style packs
                </li>
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Priority processing
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
                <div className="text-4xl font-bold text-white mb-2">Custom</div>
                <p className="text-purple-300 mb-8">For teams & agencies</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Everything in Pro
                </li>
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  4K quality
                </li>
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  API access
                </li>
                <li className="flex items-center text-purple-200">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Dedicated support
                </li>
              </ul>
              <button className="w-full border-2 border-purple-500 text-purple-300 py-3 rounded-xl font-semibold hover:bg-purple-500/10 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
            Ready to Transform
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Vision?
            </span>
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Join thousands of creators who are already reshaping reality with ReelNova AI. 
            Your next viral video is just one transformation away.
          </p>
          <Link href="/transform">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-2xl">
              Launch ReelNova Now
              <Sparkles className="w-6 h-6 ml-3 inline" />
            </button>
          </Link>
        </div>
      </section>

      
    </div>
  )
}