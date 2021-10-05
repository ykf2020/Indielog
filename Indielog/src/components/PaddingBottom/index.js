import styled from 'styled-components'
import { gray1 } from '../../utils/constants.js'
const Padding = styled.div`
  display:block;
  height: 80px;
  background: ${gray1};
`

const PaddingBottom = () => {
  return(
    <>
      <Padding/>
    </>
  )
}

export default PaddingBottom
