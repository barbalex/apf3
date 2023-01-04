import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'

const OuterContainer = styled.div`
  border-bottom: 1px solid rgba(46, 125, 50, 0.5);
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? 'rgb(255, 250, 198)' : 'unset'};
  border-top: ${(props) =>
    props.active ? '1px solid rgba(46, 125, 50, 0.5)' : 'unset'};
  &:hover {
    background-color: rgb(255, 250, 198);
    border-top: 1px solid rgba(46, 125, 50, 0.5);
    margin-top: -1px;
  }
`
const InnerContainer = styled.div`
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
  > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const EkfList = ({ projektCount, style, row }) => {
  const { ekfId, userId } = useParams()
  const navigate = useNavigate()
  const innerContainerHeight = projektCount > 1 ? 110 : 91

  const onClick = useCallback(() => {
    navigate(`/Daten/Benutzer/${userId}/EKF/${row.id}`)
  }, [navigate, row.id, userId])

  return (
    <OuterContainer style={style} onClick={onClick} active={ekfId === row.id}>
      <InnerContainer height={innerContainerHeight}>
        {projektCount > 1 && <div>{row.projekt}</div>}
        <div>{row.art}</div>
        <div>{row.pop}</div>
        <div>{row.tpop}</div>
      </InnerContainer>
    </OuterContainer>
  )
}

export default EkfList
