import { useParams, useSearchParams } from 'react-router-dom'
import { CreatePasswordForm } from '@/components/custom/CreatePassword/CreatePasswordForm'

export const CreatePassword = () => {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const expiresAt = searchParams.get('expiresAt')

  const expired = expiresAt ? new Date(expiresAt) < new Date() : false

  if (expired) {
    window.location.href = '/entrar'
  }

  return (
    <div className="flex flex-1">
      <div className="w-0 md:w-2/3 border-l-2 relative">
        <img src="/estacionamento.jpg" className="h-full w-auto object-cover" />
        <div className="absolute w-full h-full bg-black bg-opacity-50 z-10 left-0 top-0"></div>
      </div>

      <CreatePasswordForm userId={String(id)} />
    </div>
  )
}
