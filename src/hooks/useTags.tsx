import { useContext } from 'react'

import { TagsContext, TagsContextProps } from '../contexts/TagsContext'

export function useTags(): TagsContextProps {
  const context = useContext(TagsContext)

  return context
}
