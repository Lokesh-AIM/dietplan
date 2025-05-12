import React, { useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { ChevronDown, CheckCircle, Star, Clock, Settings, DownloadCloud, Utensils, Shield, Heart } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 via-emerald-400 to-blue-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-30">
            {/* Background Pattern */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <radialGradient id="grain" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grain)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Personal
                <span className="block text-white">AI Diet Planner</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-xl mx-auto lg:mx-0">
                Personalized nutrition plans tailored to your health goals, preferences, and lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-100"
                  href="/signup"
                >
                  Start Your Diet Plan
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/20"
                  onClick={scrollToFeatures}
                >
                  Learn More
                </Button>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="flex items-center">
                  <Star className="text-yellow-300 mr-2" size={20} />
                  <span className="text-white/90">4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-white/90 mr-2" size={20} />
                  <span className="text-white/90">10k+ Users</span>
                </div>
                <div className="flex items-center">
                  <Shield className="text-white/90 mr-2" size={20} />
                  <span className="text-white/90">Nutritionist Approved</span>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-1">
                <img
                  src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Personalized Diet Plan"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 animate-float">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Heart size={16} className="text-white" />
                  </div>
                  <div className="ml-2">
                    <div className="text-sm font-semibold text-gray-800">Health Score</div>
                    <div className="text-emerald-500 font-bold">92%</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 animate-float-delay">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Utensils size={16} className="text-white" />
                  </div>
                  <div className="ml-2">
                    <div className="text-sm font-semibold text-gray-800">Daily Calories</div>
                    <div className="text-blue-500 font-bold">2,100 kcal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
            <button
              onClick={scrollToFeatures}
              className="text-white/80 hover:text-white flex flex-col items-center transition-colors duration-300"
              aria-label="Scroll down"
            >
              <span className="mb-2 text-sm">Explore More</span>
              <ChevronDown size={24} className="animate-bounce" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
              Why Choose Our Diet Planner?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-10">
              Our AI-powered platform provides personalized nutrition plans designed specifically for your body and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md animate-on-scroll opacity-0 translate-y-10">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4">
                <Settings size={24} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tailored nutrition plans based on your body, preferences, and health goals.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md animate-on-scroll opacity-0 translate-y-10">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Clock size={24} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get your complete weekly meal plan in minutes, not hours.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md animate-on-scroll opacity-0 translate-y-10">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <DownloadCloud size={24} className="text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Access</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your meal plans anywhere, anytime, and share them with family.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md animate-on-scroll opacity-0 translate-y-10">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                <Heart size={24} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Focused</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Nutritionally balanced meals designed for optimal health and wellness.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md animate-on-scroll opacity-0 translate-y-10">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Allergy Aware</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automatically excludes foods you're allergic to or don't prefer.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md animate-on-scroll opacity-0 translate-y-10">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <Utensils size={24} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Budget Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Options for any budget without compromising on nutrition or taste.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section ref={howItWorksRef} id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-10">
              Generate your personalized diet plan in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative animate-on-scroll opacity-0 translate-y-10">
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md relative z-10">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                  1
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-3">Tell Us About Yourself</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Share your health goals, dietary preferences, allergies, and lifestyle details.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-12 h-2 bg-emerald-200 dark:bg-emerald-700 z-0"></div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 translate-y-10" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md relative z-10">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                  2
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-3">Receive Your Plan</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI generates a personalized 7-day meal plan tailored to your needs.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-12 h-2 bg-emerald-200 dark:bg-emerald-700 z-0"></div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 translate-y-10" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md relative z-10">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                  3
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-3">Start Your Journey</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Follow your plan, track progress, and adjust as needed to reach your goals.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center animate-on-scroll opacity-0 translate-y-10">
            <Button
              variant="primary"
              size="lg"
              href="/signup"
            >
              Create My Diet Plan
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section ref={testimonialsRef} id="testimonials" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-10">
              Thousands of people have transformed their health with our diet planner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md animate-on-scroll opacity-0 translate-y-10">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">5.0</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "This app completely changed my relationship with food. The personalized meal plans are easy to follow and actually delicious!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lost 15kg in 6 months</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md animate-on-scroll opacity-0 translate-y-10">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">5.0</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "As someone with multiple food allergies, finding the right diet was always a challenge. This app makes it so simple!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">Michael Chen</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Using for 1 year</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md animate-on-scroll opacity-0 translate-y-10">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">4.9</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The meal variety keeps me engaged and I never get bored. I've gained 8kg of muscle following their plans!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">Emily Rodriguez</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fitness enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll opacity-0 translate-y-10">
            Ready to Transform Your Diet?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-10">
            Join thousands of satisfied users and start your personalized nutrition journey today.
          </p>
          <div className="animate-on-scroll opacity-0 translate-y-10">
            <Button
              variant="primary"
              size="xl"
              className="bg-white text-emerald-600 hover:bg-gray-100"
              href="/signup"
            >
              Start Free Trial
            </Button>
          </div>
          <p className="mt-4 text-white/80 text-sm animate-on-scroll opacity-0 translate-y-10">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </section>
    </div>
  );
};