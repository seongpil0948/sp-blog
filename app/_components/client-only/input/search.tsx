'use client'
import { toast } from 'react-toastify'
import InputTag from './input-tag'
import { Input, InputProps } from '@nextui-org/input'
import { SearchIcon } from '../../server-only/icons'

export function SearchInput(props: InputProps) {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      labelPlacement="outside"
      startContent={
        <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
      }
      type="search"
      {...props}
    />
  )
}

export function SearchPostBar() {
  const handleSearch = (tags: string[]) => {
    toast('🦄 Wow so easy! ' + tags.join(', '), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
  return <InputTag onSearch={handleSearch} labelPlacement="outside" />
}
