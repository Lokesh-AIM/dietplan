import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const { login, signup, loginWithGoogle, loginWithApple, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      
      // Redirect will be handled by Auth context
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ form: 'Authentication failed. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="w-full" glass={true}>
          <CardBody className="p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl mx-auto flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">DP</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {mode === 'login' 
                  ? 'Log in to access your personalized diet plan' 
                  : 'Sign up to start your nutrition journey'}
              </p>
            </div>
            
            {errors.form && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {errors.form}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <Input
                  name="name"
                  label="Full Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  leftIcon={<User size={18} className="text-gray-500" />}
                  fullWidth
                />
              )}
              
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                leftIcon={<Mail size={18} className="text-gray-500" />}
                fullWidth
              />
              
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder={mode === 'login' ? 'Enter your password' : 'Create a password'}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                leftIcon={<Lock size={18} className="text-gray-500" />}
                fullWidth
              />
              
              {mode === 'login' && (
                <div className="text-right">
                  <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
                    Forgot password?
                  </a>
                </div>
              )}
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="mt-6"
                isLoading={isLoading}
                rightIcon={!isLoading && <ArrowRight size={18} />}
              >
                {mode === 'login' ? 'Log In' : 'Sign Up'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={loginWithGoogle}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={loginWithApple}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17.2744 11.3276C17.2566 8.66646 19.4058 7.49307 19.5001 7.43214C18.3377 5.67096 16.499 5.45223 15.8487 5.43429C14.2592 5.27172 12.7222 6.39496 11.9129 6.39496C11.0848 6.39496 9.80968 5.45223 8.45331 5.47912C6.71967 5.50494 5.12659 6.48242 4.23516 8.03977C2.39647 11.2119 3.73617 15.8816 5.49623 18.4953C6.37226 19.7792 7.38347 21.2083 8.70294 21.1587C9.98453 21.1048 10.4561 20.3261 11.9969 20.3261C13.5197 20.3261 13.9648 21.1587 15.3062 21.1273C16.6917 21.1048 17.5633 19.8388 18.407 18.5459C19.4159 17.0628 19.8256 15.612 19.8433 15.5446C19.8077 15.5312 17.2966 14.5807 17.2744 11.3276Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.004 3.55446C15.7161 2.66411 16.1885 1.43946 16.0586 0.199951C14.9991 0.246758 13.7087 0.909779 12.9655 1.77677C12.3062 2.55329 11.7357 3.83007 11.8835 5.01241C13.067 5.11794 14.2629 4.42594 15.004 3.55446Z"
                      fill="currentColor"
                    />
                  </svg>
                  Apple
                </Button>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                {' '}
                <a
                  href={mode === 'login' ? '/signup' : '/login'}
                  className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  {mode === 'login' ? 'Sign up' : 'Log in'}
                </a>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};