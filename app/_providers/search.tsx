'use client'
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/modal'
import { SearchInput } from '../_components/client-only/input/search'
import { Kbd } from '@nextui-org/kbd'
import { useState, createContext, useContext, useEffect } from 'react'
import { ContextUndefined } from '../_utils'
import type { SearchResponse } from '../api/search/route'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import Icon from '@mdi/react'
import { mdiBook } from '@mdi/js'

type SearchContextType = {
  isOpen: boolean
  onOpen: () => void
  word: string
}
export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
)

export const useSearchCtx = () => {
  const ctx = useContext(SearchContext)
  if (ctx === undefined) {
    throw new ContextUndefined('SearchContext')
  }
  return ctx
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [word, setWord] = useState('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        console.log('Command/Control + K was pressed')
        onOpen()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onOpen])

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        onOpen,
        word,
      }}
    >
      {children}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
          base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <SearchInput
                  autoFocus
                  value={word}
                  onValueChange={setWord}
                  endContent={<Kbd className="lg:inline-block">ESC</Kbd>}
                />
              </ModalHeader>
              <ModalBody>
                <SearchResultList word={word} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </SearchContext.Provider>
  )
}

function SearchResultList(props: { word?: string }) {
  const { word } = props
  const [response, setResponse] = useState<SearchResponse>({ results: [] })

  function search(word: string) {
    console.log('requesting search word: ', word)
    fetch(`/api/search?word=${word}`)
      .then((res) => res.json())
      .then((data: SearchResponse) => {
        console.log('search response: ', data)
        setResponse(data)
      })
  }
  // listen for the word change
  useEffect(() => {
    if (!word) return
    search(word)
  }, [word])

  return (
    <Listbox
      aria-label="User Menu"
      onAction={(key) => alert(key)}
      className="max-w-[300px] gap-0 divide-y divide-default-300/50 overflow-visible rounded-medium bg-content1 p-0 shadow-small dark:divide-default-100/80"
      itemClasses={{
        base: 'px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80',
      }}
    >
      {response.results.map((result) => (
        <ListboxItem
          key={result.url}
          href={result.url}
          startContent={<Icon path={mdiBook} size={1} />}
        >
          {result.title}
        </ListboxItem>
      ))}
    </Listbox>
  )
}
