import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { useMutate } from '../pages/hooks/useGraphql'
import { useModal } from './modal'

const Wrapper = styled.div`
  position: relative;
  z-index: 10000000000;
`

const StyledInput = styled.input`
  border: 0;
  padding: 9px 10px;
  width: 500px;
`

const List = styled.ul`
  background-color: #fff;
  position: absolute;
  top: 17px;
  padding: 0;
  width: 520px;
`

const Text = styled.li`
  padding: 14px 12px;
  border-bottom: 1px solid #bbb4b4;
  ${({ isSelected }) => isSelected && 'background-color: #ebe5e5;'};
`

function Input() {
  const router = useRouter()
  const { isOpen: isModalOpen } = useModal()
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [value, setValue] = useState<string>('')
  const [selectedCount, setSelectedCount] = useState<number>(-1)
  const { data, mutate } = useMutate(`
    query($letters: String!) {
      getSearchAutoAutoComplete(letters: $letters) {
        name
      }
    }
  `)

  function handleOnChange(event: { target: { value: string } }) {
    const { value } = event.target
    if (value.length >= 2) {
      mutate({ letters: value })
    }

    if (value.length === 0) {
      mutate({ letters: '' })
    }
    setValue(value)
  }

  function handleKeyDown(event: { keyCode: number }) {
    setIsOpen(true)
    const isUp = event.keyCode === 38
    if (isUp) {
      setSelectedCount((prev) => (prev === -1 ? prev : prev - 1))
    }
    const isDown = event.keyCode === 40
    if (isDown) {
      const { length } = data.getSearchAutoAutoComplete
      setSelectedCount((prev) => (length - 1 === prev ? prev : prev + 1))
    }

    const isEnter = event.keyCode === 13
    if (isEnter) {
      const { name } =
        data.getSearchAutoAutoComplete.find((_, index) => index === selectedCount) ?? {}
      router.push({
        pathname: '/search/[id]',
        query: { id: name || value },
      })
      setIsOpen(false)
      setValue(name)
      setSelectedCount(0)
    }
    const isExit = event.keyCode === 27
    if (isExit) {
      setIsOpen(false)
    }
  }

  function handleEnter(event: { target: { innerHTML: string } }) {
    router.push({
      pathname: '/search/[id]',
      query: { id: event.target.innerHTML },
    })
    setIsOpen(false)
    setValue(event.target.innerHTML)
    setSelectedCount(0)
  }

  return (
    <Wrapper>
      <StyledInput
        onKeyDown={handleKeyDown}
        name="search"
        type="text"
        value={value}
        onChange={handleOnChange}
      />
      {isOpen || isModalOpen ? (
        <List>
          {data?.getSearchAutoAutoComplete.map(({ name }, index) => (
            <Text onMouseDown={handleEnter} key={name} isSelected={selectedCount === index}>
              {name}
            </Text>
          ))}
        </List>
      ) : null}
    </Wrapper>
  )
}

export default Input
