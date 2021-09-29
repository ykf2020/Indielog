import styled from 'styled-components'
import { MEDIA_QUERY_568 } from '../../constants.js'

const MemberPageContainer = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  max-width: 860px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;

  ${MEDIA_QUERY_568} {
    width: 100%;
  }
`

export default MemberPageContainer
