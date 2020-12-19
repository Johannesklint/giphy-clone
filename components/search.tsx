import { useMutate } from '../pages/hooks/useGraphql'

export default function Search() {
  const { data, error, init, mutate } = useMutate(
    `query($search: String!) {
      getSearch(search: $search) {
        id
        
      }
    }`
  )

  console.log('data', data,error)

  return (
    <button
      onClick={async (event) => {
        // const { value } = event.target
        let value = 'hello'
        if (value.length > 3) {
          await init({ search: value })
          mutate()
        }
      }}>
      ok
    </button>
  )
}
