import React, { useState, useCallback, useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import get from 'lodash/get'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'
import { useApolloClient } from 'react-apollo-hooks'

import ErrorBoundary from './shared/ErrorBoundary'
import idbContext from '../idbContext'
import storeContext from '../storeContext'

const StyledDialog = styled(Dialog)``
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`
const StyledInput = styled(Input)`
  &:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`

const User = () => {
  const client = useApolloClient()
  const { idb } = useContext(idbContext)
  const store = useContext(storeContext)
  const { user } = store

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [nameErrorText, setNameErrorText] = useState('')
  const [passwordErrorText, setPasswordErrorText] = useState('')
  const [token, setToken] = useState(user.token)
  const [fetchingToken, setFetchingToken] = useState(true)

  const fetchLogin = useCallback(
    // callbacks pass name or password
    // because state is not up to date yet
    async ({ name: namePassed, password: passwordPassed }) => {
      const nameToUse = namePassed || name
      const passwordToUse = passwordPassed || password
      let result
      try {
        result = await client.mutate({
          mutation: gql`
            mutation logIn($name: String, $password: String) {
              login(input: { username: $name, pass: $password }) {
                jwtToken
              }
            }
          `,
          variables: {
            name: nameToUse,
            password: passwordToUse,
          },
          optimisticResponse: {
            login: {
              username: name,
              jwtToken: '',
              __typename: 'Login',
            },
            __typename: 'Mutation',
          },
        })
      } catch (error) {
        const messages = error.graphQLErrors.map(x => x.message)
        const isNamePassError =
          messages.includes('invalid user or password') ||
          messages.includes('permission denied for relation user')
        if (isNamePassError) {
          const message = 'Name oder Passwort nicht bekannt'
          setNameErrorText(message)
          return setPasswordErrorText(message)
        }
        return console.log(error)
      }
      // refresh currentUser in idb
      idb.currentUser.clear()
      await idb.currentUser.put({
        name,
        token: get(result, 'data.login.jwtToken'),
      })
      // this is easiest way to make sure everything is correct
      // as client is rebuilt with new settings
      typeof window !== 'undefined' && window.location.reload(true)
    },
    [name, password],
  )
  const onBlurName = useCallback(
    e => {
      setNameErrorText('')
      const name = e.target.value
      setName(name)
      if (!name) {
        setNameErrorText('Geben Sie den Ihnen zugeteilten Benutzernamen ein')
      } else if (password) {
        setTimeout(() => fetchLogin({ name }))
      }
    },
    [password],
  )
  const onBlurPassword = useCallback(
    e => {
      setPasswordErrorText('')
      const password = e.target.value
      setPassword(password)
      if (!password) {
        setPasswordErrorText('Bitte Passwort eingeben')
      } else if (name) {
        setTimeout(() => fetchLogin({ password }))
      }
    },
    [name],
  )
  const onKeyPressName = useCallback(e => {
    if (e.key === 'Enter') {
      onBlurName(e)
    }
  })
  const onKeyPressPassword = useCallback(e => {
    if (e.key === 'Enter') {
      onBlurPassword(e)
    }
  })
  const onClickShowPass = useCallback(() => setShowPass(!showPass), [showPass])
  const onMouseDownShowPass = useCallback(e => e.preventDefault())

  idb.currentUser.toArray().then(users => {
    setToken(get(users, '[0].token', null))
    setFetchingToken(false)
  })

  return (
    <ErrorBoundary>
      <StyledDialog
        aria-labelledby="dialog-title"
        open={!token && !fetchingToken}
      >
        <DialogTitle id="dialog-title">Anmeldung</DialogTitle>
        <StyledDiv>
          <FormControl
            error={!!nameErrorText}
            fullWidth
            aria-describedby="nameHelper"
          >
            <InputLabel htmlFor="name">Name</InputLabel>
            <StyledInput
              id="name"
              className="user-name"
              defaultValue={name}
              onBlur={onBlurName}
              autoFocus
              onKeyPress={onKeyPressName}
            />
            <FormHelperText id="nameHelper">{nameErrorText}</FormHelperText>
          </FormControl>
          <FormControl
            error={!!passwordErrorText}
            fullWidth
            aria-describedby="passwortHelper"
          >
            <InputLabel htmlFor="passwort">Passwort</InputLabel>
            <StyledInput
              id="passwort"
              className="user-passwort"
              type={showPass ? 'text' : 'password'}
              defaultValue={password}
              onBlur={onBlurPassword}
              onKeyPress={onKeyPressPassword}
              autoComplete="current-password"
              autoCorrect="off"
              spellCheck="false"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onClickShowPass}
                    onMouseDown={onMouseDownShowPass}
                    title={showPass ? 'verstecken' : 'anzeigen'}
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="passwortHelper">
              {passwordErrorText}
            </FormHelperText>
          </FormControl>
        </StyledDiv>
        <DialogActions>
          <Button color="primary" onClick={fetchLogin}>
            anmelden
          </Button>
        </DialogActions>
      </StyledDialog>
    </ErrorBoundary>
  )
}

export default observer(User)
