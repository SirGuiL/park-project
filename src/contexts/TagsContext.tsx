import { ReactNode, createContext, useCallback, useState } from 'react'
import { tagType } from '../DTOs/tag'

type createTagType = {
  name: string
  id: string
  createdAt: Date
}

export type TagsContextProps = {
  tags: tagType[]
  setStoredTags: (tags: tagType[]) => void
  createTag: (tag: createTagType) => void
  filteredTags: (query: string) => tagType[]
  changeTagColor: (id: string, color: string) => void
  findTagById: (id: string) => tagType | undefined
}

type TagsContextProviderProps = {
  children: ReactNode
}

export const TagsContext = createContext<TagsContextProps>(
  {} as TagsContextProps
)

export function TagsContextProvider({ children }: TagsContextProviderProps) {
  const [tags, setTags] = useState<tagType[]>([])

  const createTag = (tag: createTagType) => {
    const newTag = {
      name: tag.name,
      id: tag.id,
      createdAt: tag.createdAt,
    }

    setTags([...tags, newTag])
  }

  const filteredTags = (query: string) => {
    return tags.filter((tag) =>
      tag.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  const changeTagColor = (id: string, color: string) => {
    const newTags = tags.map((tag) => {
      if (tag.id === id) {
        return {
          ...tag,
          color,
        }
      }

      return tag
    })

    setTags(newTags)
  }

  const findTagById = (id: string) => {
    return tags.find((tag) => tag.id === id)
  }

  const setStoredTags = useCallback((tags: tagType[]) => {
    setTags(tags)
  }, [])

  return (
    <TagsContext.Provider
      value={{
        tags,
        createTag,
        filteredTags,
        changeTagColor,
        findTagById,
        setStoredTags,
      }}
    >
      {children}
    </TagsContext.Provider>
  )
}
