import { Ellipsis, Plus, Tag } from 'lucide-react'

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
import { TagsMenu } from './TagsMenu'
import { DeleteTagDialog } from './DeleteTagDialog'
import { useState } from 'react'
import { CreateTagDialog } from './CreateTagDialog'
import { TagsService } from '@/services/TagsService'

export const TagsDrawer = () => {
  const [isOpenCreateTagDialog, setIsOpenCreateTagDialog] = useState(false)
  const [isOpenDeleteTagDialog, setIsOpenDeleteTagDialog] = useState(false)
  const [currentId, setCurrentId] = useState('')

  const { tags, setStoredTags } = useTags()

  const handleDeleteTag = (id: string) => {
    setCurrentId(id)
    setIsOpenDeleteTagDialog(true)
  }

  const deleteTag = async () => {
    try {
      await TagsService.delete({ id: currentId })
    } catch (error) {
      console.error(error)
    } finally {
      await fetchTags()
      setIsOpenDeleteTagDialog(false)
    }
  }

  const handleEditTag = () => {}

  const handleAddTag = async ({ name }: { name: string }) => {
    try {
      await TagsService.create({
        name,
      })

      setIsOpenCreateTagDialog(false)
      fetchTags()
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await TagsService.get()
      setStoredTags(response.data)
    } catch (error) {
      console.error(error)
    }
  }

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

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 py-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between gap-2"
              >
                <label htmlFor={tag.id}>{tag.name}</label>

                <TagsMenu
                  trigger={
                    <Button className="bg-transparent" variant="ghost">
                      <Ellipsis />
                    </Button>
                  }
                  handleDeleteTag={() => handleDeleteTag(tag.id)}
                  handleEditTag={handleEditTag}
                />
              </div>
            ))}
          </div>

          <Button
            className="text-white flex place-self-end"
            onClick={() => setIsOpenCreateTagDialog(true)}
          >
            <Plus />
            <span>Nova tag</span>
          </Button>
        </div>
      </SheetContent>

      <DeleteTagDialog
        dialogState={isOpenDeleteTagDialog}
        setDialogState={setIsOpenDeleteTagDialog}
        handleDeleteTag={() => deleteTag()}
      />

      <CreateTagDialog
        dialogState={isOpenCreateTagDialog}
        setDialogState={setIsOpenCreateTagDialog}
        handleCreateTag={handleAddTag}
      />
    </Sheet>
  )
}
