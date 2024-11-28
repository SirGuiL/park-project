import { ReactNode, createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { tagType } from '../DTOs/tag'

export type TagsContextProps = {
  tags: tagType[]
  createTag: (tag: string) => void
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

  const createTag = (tag: string) => {
    const newTag = {
      name: tag,
      color: '#FFFFFF',
      id: uuid(),
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

  return (
    <TagsContext.Provider
      value={{
        tags,
        createTag,
        filteredTags,
        changeTagColor,
        findTagById,
      }}
    >
      {children}
    </TagsContext.Provider>
  )
}
