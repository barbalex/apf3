import React from 'react'
import { FixedSizeList as List } from 'react-window'
import uniq from 'lodash/uniq'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import SimpleBar from 'simplebar-react'

import Item from './Item'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid rgb(46, 125, 50);
`
const Scrollcontainer = styled.div`
  overflow-y: auto;
  height: 100%;
`

const EkfList = ({ ekf, activeTpopkontrId }) => {
  const projektCount = uniq(ekf.map((e) => e.projekt)).length
  const itemHeight = projektCount > 1 ? 110 : 91

  return (
    <Container>
      <Scrollcontainer>
        <SimpleBar
          style={{
            maxHeight: '100%',
            height: '100%',
          }}
        >
          <List
            height={ekf.length * itemHeight}
            itemCount={ekf.length}
            itemSize={itemHeight}
            width={window.innerWidth / 3}
          >
            {({ index, style }) => (
              <Item
                activeTpopkontrId={activeTpopkontrId}
                projektCount={projektCount}
                style={style}
                row={ekf[index]}
              />
            )}
          </List>
        </SimpleBar>
      </Scrollcontainer>
    </Container>
  )
}

export default observer(EkfList)
