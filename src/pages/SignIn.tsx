import { SignInForm } from '@/components/custom/SignIn/SignInForm'

export const SignIn = () => {
  return (
    <div className="flex flex-1">
      <div className="w-0 md:w-2/3 border-l-2 relative">
        <img src="/estacionamento.jpg" className="h-full w-auto object-cover" />
        <div className="absolute w-full h-full bg-black bg-opacity-50 z-10 left-0 top-0"></div>
      </div>

      <SignInForm />
    </div>
  )
}
