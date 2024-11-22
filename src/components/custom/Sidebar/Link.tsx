import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  text: string
}

export const Link = ({ icon, text, ...rest }: Props) => {
  return (
    <button className="group flex items-center gap-2" {...rest}>
      {icon}

      <span className="text-base font-bold text-gray-400 group-hover:text-gray-200 transition-colors duration-200">
        {text}
      </span>
    </button>
  )
}
