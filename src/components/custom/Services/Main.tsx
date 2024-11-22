import { ServicesTable } from './Table'

export const Main = () => {
  const services = [
    {
      name: 'string',
      created_at: new Date(),
      amount: 0,
      method: 'teste',
      tags: [
        {
          name: 'teste',
          color: 'green',
        },
        {
          name: 'teste 3',
          color: 'yellow',
        },
        {
          name: 'teste',
          color: 'green',
        },
        {
          name: 'teste 3',
          color: 'yellow',
        },
        {
          name: 'teste',
          color: 'green',
        },
        {
          name: 'teste 3',
          color: 'yellow',
        },
      ],
      updated_at: new Date(),
      id: 'asdasdasdas',
    },
  ]

  return (
    <div className="flex flex-col flex-1 gap-6 p-8">
      <h1 className="text-2xl font-semibold">Serviços cadastrados</h1>

      <div className="flex flex-1">
        <ServicesTable services={services} />
      </div>
    </div>
  )
}
