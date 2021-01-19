import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
`

interface Value {
  gutter: number
  columnWidth: number
  rowHeight: number
}
interface IGrid extends Value {
  children: JSX.Element
}

const GridContext = createContext<Value>(null)

function GridProvider({ children, value }: { children: JSX.Element; value: Value }) {
  return <GridContext.Provider value={value}>{children}</GridContext.Provider>
}

export function Grid({ gutter = 0, columnWidth = 0, rowHeight = 0, children }: IGrid) {
  const gridContainerStyle = {
    gridGap: `${gutter}px`,
    gridTemplateColumns: `repeat(auto-fill, ${columnWidth}px)`,
    gridAutoRows: `${rowHeight}px`,
  }
  return (
    <GridProvider value={{ columnWidth, rowHeight, gutter }}>
      <Wrapper style={gridContainerStyle}>{children}</Wrapper>
    </GridProvider>
  )
}

export function GridItem({ children }: { children: JSX.Element }) {
  const gridItemRef = useRef<HTMLDivElement>(null)
  const gridItemWrapper = useRef<HTMLDivElement>(null)
  const gridContext = useContext<Value>(GridContext)

  const { columnWidth, rowHeight, gutter: rowGap } = gridContext

  const itemsLoad = useCallback(() => {
    const refHeight = gridItemRef.current.clientHeight
    const refWidth = gridItemRef.current.clientWidth

    const desiredHeight = (columnWidth * refHeight) / refWidth
    const rowSpan = Math.ceil((desiredHeight + rowGap) / (rowHeight + rowGap))

    gridItemWrapper.current.style.height = `${desiredHeight}px`
    gridItemWrapper.current.style.width = `${columnWidth}px`
    gridItemWrapper.current.style.gridRowEnd = `span ${rowSpan}`
  }, [columnWidth, rowGap, rowHeight])

  useEffect(() => {
    itemsLoad()
  }, [itemsLoad])

  return (
    <div ref={gridItemWrapper} style={{ width: `${gridContext.columnWidth}px` }}>
      <div ref={gridItemRef} onLoad={itemsLoad}>
        {children}
      </div>
    </div>
  )
}
