import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useTags } from '@/hooks/useTags'
import { Tag } from 'lucide-react'

interface Props {
  tagsSerch: string
  setTag: (tag: string) => void
}

export const TagsList = ({ tagsSerch, setTag }: Props) => {
  const { tags } = useTags()

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(tagsSerch.toLowerCase())
  )

  if (tags.length == 0) {
    return (
      <div className="flex flex-wrap gap-2 p-2">
        <span className="text-sm text-gray-500">Nenhuma tag cadastrada</span>
      </div>
    )
  }

  if (filteredTags.length == 0) {
    return (
      <div className="flex flex-wrap gap-2 p-2">
        <span className="text-sm text-gray-500">
          Nenhuma tag encontrada com essa busca
        </span>
      </div>
    )
  }

  return (
    <div>
      {filteredTags.map((tag) => (
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTag(tag.id)}
          key={tag.id}
        >
          <div className="flex items-center gap-2">
            <Tag size={16} />

            <span>{tag.name}</span>
          </div>
        </DropdownMenuItem>
      ))}
    </div>
  )
}
