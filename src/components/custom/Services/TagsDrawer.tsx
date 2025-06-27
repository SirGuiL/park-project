import { Tag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useTags } from '@/hooks/useTags'

export const TagsDrawer = () => {
  const { tags } = useTags()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-sky-800 hover:bg-sky-900 text-gray-200 hover:text-gray-200 rounded-full flex gap-1 items-center">
          <Tag size={16} />
          Tags
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Tags</SheetTitle>

          <SheetDescription>Lista de tags cadastradas</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-1 py-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between gap-2"
            >
              <label htmlFor={tag.id}>{tag.name}</label>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
