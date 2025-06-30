import { ChevronLeft, ChevronRight, Ellipsis, Plus, Tag } from 'lucide-react'

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
import { useEffect, useState } from 'react'
import { CreateTagDialog } from './CreateTagDialog'
import { TagsService } from '@/services/TagsService'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { hasCachedPage } from '@/lib/utils'

export const TagsDrawer = () => {
  const [isOpenCreateTagDialog, setIsOpenCreateTagDialog] = useState(false)
  const [isOpenDeleteTagDialog, setIsOpenDeleteTagDialog] = useState(false)
  const [currentId, setCurrentId] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPages, setMaxPages] = useState(1)

  const { tags, setStoredTags } = useTags()

  const paginatedTags = tags.slice((currentPage - 1) * 10, currentPage * 10)

  const updatePage = (page: number) => {
    setCurrentPage(page)

    const alreadySearched = hasCachedPage({
      cachedItems: tags,
      page,
    })

    if (alreadySearched) return

    fetchTags(page)
  }

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
      await fetchTags(1)
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
    } catch (error) {
      console.error(error)
    } finally {
      fetchTags(1)
    }
  }

  const fetchTags = async (page: number) => {
    try {
      const response = await TagsService.get({
        page,
      })

      if (page === 1) {
        setStoredTags(response.data.tags)
        return
      }

      setStoredTags([...tags, ...response.data.tags])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await TagsService.get({})

        setStoredTags(response.data.tags)
        setMaxPages(Math.ceil(response.data.metadata.count / 10))
      } catch (error) {
        console.error(error)
      }
    }

    fetchTags()
  }, [setStoredTags])

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
            {paginatedTags.map((tag) => (
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

          <div className="flex items-center justify-between">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    disabled={currentPage === 1}
                    onClick={() => updatePage(currentPage - 1)}
                  >
                    <ChevronLeft />
                  </Button>
                </PaginationItem>

                {currentPage > 1 && (
                  <PaginationItem
                    className="cursor-pointer"
                    onClick={() => updatePage(currentPage - 1)}
                  >
                    <PaginationLink>{currentPage - 1}</PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem className="cursor-pointer">
                  <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>

                {maxPages > currentPage && (
                  <PaginationItem
                    className="cursor-pointer"
                    onClick={() => updatePage(currentPage + 1)}
                  >
                    <PaginationLink>{currentPage + 1}</PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <Button
                    variant="ghost"
                    disabled={currentPage === maxPages}
                    onClick={() => updatePage(currentPage + 1)}
                  >
                    <ChevronRight />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <Button
              className="text-white flex place-self-end"
              onClick={() => setIsOpenCreateTagDialog(true)}
            >
              <Plus />
              <span>Nova tag</span>
            </Button>
          </div>
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
