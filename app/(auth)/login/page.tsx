'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

// Note: This metadata would need to be in a server component in a real app
// For client components, we handle title through document.title or useEffect

interface LoginFormData {
  email: string
  password: string
}

interface FormErrors {
  email: string
  password: string
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })

  useEffect(() => {
    document.title = 'Accedi | App'
  }, [])

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev)
  }

  const validateEmail = (email: string): string => {
    if (!email) {
      return 'Email è richiesta'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Formato email non valido'
    }
    return ''
  }

  const validatePassword = (password: string): string => {
    if (!password) {
      return 'Password è richiesta'
    }
    if (password.length < 6) {
      return 'La password deve contenere almeno 6 caratteri'
    }
    return ''
  }

  const validateForm = (): boolean => {
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)
    
    setErrors({
      email: emailError,
      password: passwordError
    })

    return !emailError && !passwordError
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log('Form data submitted:', formData)
        // Here you would normally make an actual API call
      } catch (error) {
        console.error('Login error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const isFormValid = formData.email && formData.password && !errors.email && !errors.password && !isLoading

  return (
    <Card className="w-full max-w-sm sm:max-w-md mx-auto shadow-lg border-thin border-border dark:border-border bg-card dark:bg-card">
      <CardHeader className="space-y-1">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-8">
            Accedi al tuo account
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Inserisci le tue credenziali per accedere
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-6 sm:px-8 pb-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label 
              htmlFor="email"
              className="text-sm font-medium text-foreground dark:text-foreground"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Inserisci la tua email"
              value={formData.email}
              onChange={handleInputChange}
              className={`
                h-11 px-4 text-base sm:text-sm
                bg-background dark:bg-background
                border-thin border-input dark:border-input
                focus:outline-none focus-visible:border-primary
                transition-all duration-200
                ${errors.email ? 'border-red-500 dark:border-red-500 focus:border-red-500' : 'focus:border-primary'} 
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent-foreground/20'}
              `}
              disabled={isLoading}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label 
              htmlFor="password"
              className="text-sm font-medium text-foreground dark:text-foreground"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Inserisci la tua password"
                value={formData.password}
                onChange={handleInputChange}
                className={`
                  h-11 px-4 pr-12 text-base sm:text-sm
                  bg-background dark:bg-background
                  border-thin border-input dark:border-input
                  focus:outline-none focus-visible:border-primary
                  transition-all duration-200
                  ${errors.password ? 'border-red-500 dark:border-red-500 focus:border-red-500' : 'focus:border-primary'} 
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent-foreground/20'}
                `}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={`
                  absolute right-3 top-1/2 -translate-y-1/2 p-1
                  text-muted-foreground hover:text-foreground
                  focus:outline-none rounded-sm
                  transition-all duration-200
                  ${isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-accent'}
                `}
                disabled={isLoading}
                aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                {errors.password}
              </p>
            )}
          </div>
          <div className="text-right my-3">
            <a 
              href="#" 
              className="
                text-sm text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80
                hover:underline focus:outline-none
                transition-all duration-200 px-1 py-0.5
              "
            >
              Recupera password
            </a>
          </div>
          <Button 
            type="submit" 
            className="
              w-full h-11 text-base sm:text-sm font-medium
              bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90
              text-primary-foreground dark:text-primary-foreground
              focus:outline-none
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            " 
            disabled={!isFormValid}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Accedendo...
              </>
            ) : (
              'Accedi'
            )}
          </Button>
        </form>
        <div className="my-6 sm:my-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-thin border-border dark:border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card dark:bg-card px-3 text-muted-foreground dark:text-muted-foreground font-medium">
                oppure
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground">
            Non hai un account?{' '}
            <a 
              href="#" 
              className="
                font-medium text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80
                hover:underline focus:outline-none
                transition-all duration-200 px-1 py-0.5
              "
            >
              Registrati
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 