// see: https://blog.logrocket.com/use-state-url-persist-state-usesearchparams/
import { useSearchParams } from 'react-router-dom'

export default function useSearchParamsState(searchParamName, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams()

  const acquiredSearchParam = searchParams.getAll(searchParamName)
  // getAll always returns an array, even if there is no value
  const searchParamsState =
    acquiredSearchParam.length > 0 ? acquiredSearchParam : defaultValue

  // console.log('useSearchParamsState', {
  //   acquiredSearchParam,
  //   searchParamsState,
  //   searchParamName,
  //   defaultValue,
  // })

  const setSearchParamsState = (newState) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {},
      ),
      { [searchParamName]: newState },
    )
    setSearchParams(next)
  }
  return [searchParamsState, setSearchParamsState]
}

// How to use:
// const [greeting, setGreeting] = useSearchParamsState("greeting", "hello");
