import { Search } from 'lucide-react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface SearchInputProps {
  isMobile?: boolean
}

export function SearchInput({ isMobile }: SearchInputProps) {
  const [searchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get('query') ?? '')
  const navigate = useNavigate()
  const location = useLocation()

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setInputValue(value)
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inputValue === '') {
      navigate(`/`)
      return
    }
    navigate(`/search?query=${inputValue}`)
  }

  useEffect(() => {
    setInputValue(searchParams.get('query') ?? '')
  }, [location, searchParams])

  return (
    <form
      className={twMerge(
        'w-full max-w-[250px] hidden md:block',
        isMobile && 'block md:hidden max-w-none'
      )}
      onSubmit={handleSearchSubmit}
    >
      <div className="relative w-full">
        <button type="submit" className="absolute top-0 bottom-0 left-3">
          <Search className="w-4 h-4 my-auto cursor-pointer" />
        </button>
        <Input
          type="text"
          value={inputValue}
          placeholder="Digite um filme, programa ou pessoa..."
          className="pl-10 pr-4 text-sm py-4 bg-background"
          onChange={handleInputChange}
        />
      </div>
    </form>
  )
}
