import React, { useCallback, useContext, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useApolloClient, useQuery, gql } from '@apollo/client'
import SimpleBar from 'simplebar-react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import TextField from '../../../shared/TextField'
import FormTitle from '../../../shared/FormTitle'
import query from './query'
import storeContext from '../../../../storeContext'
import ifIsNumericAsNumber from '../../../../modules/ifIsNumericAsNumber'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import Error from '../../../shared/Error'
import Spinner from '../../../shared/Spinner'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
const FieldsContainer = styled.div`
  overflow-y: auto;
`
const FormContainer = styled.div`
  padding: 10px;
`

const fieldTypes = {
  name: 'String',
}

const Projekt = () => {
  const { projId } = useParams()

  const client = useApolloClient()
  const queryClient = useQueryClient()
  const store = useContext(storeContext)

  const [fieldErrors, setFieldErrors] = useState({})

  const { data, loading, error } = useQuery(query, {
    variables: {
      id: projId,
    },
  })

  const row = useMemo(() => data?.projektById ?? {}, [data?.projektById])

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = ifIsNumericAsNumber(event.target.value)

      const variables = {
        id: row.id,
        [field]: value,
        changedBy: store.user.name,
      }
      try {
        await client.mutate({
          mutation: gql`
            mutation updateProjekt(
              $id: UUID!
              $${field}: ${fieldTypes[field]}
              $changedBy: String
            ) {
              updateProjektById(
                input: {
                  id: $id
                  projektPatch: { 
                    ${field}: $${field}
                    changedBy: $changedBy
                  }
                }
              ) {
                projekt {
                  id
                  name
                  changedBy
                }
              }
            }
          `,
          variables,
        })
      } catch (error) {
        return setFieldErrors({ [field]: error.message })
      }
      setFieldErrors({})
      queryClient.invalidateQueries({ queryKey: [`treeQuery`] })
    },
    [client, queryClient, row.id, store.user.name],
  )

  if (loading) return <Spinner />

  if (error) return <Error error={error} />

  return (
    <ErrorBoundary>
      <Container>
        <FormTitle title="Projekt" />
        <FieldsContainer>
          <SimpleBar
            style={{
              maxHeight: '100%',
              height: '100%',
            }}
          >
            <FormContainer>
              <TextField
                name="name"
                label="Name"
                type="text"
                value={row.name}
                saveToDb={saveToDb}
                error={fieldErrors.name}
              />
            </FormContainer>
          </SimpleBar>
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Projekt)
