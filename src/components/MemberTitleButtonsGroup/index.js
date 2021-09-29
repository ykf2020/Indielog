import styled from 'styled-components'
import { gray1, gray2, gray3, gray4, green1, green2, black1, MEDIA_QUERY_568, MEDIA_QUERY_768 } from '../../constants.js'

const TitleButtonsGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 1px solid ${gray2};
`

const TitleNormalButton = styled.button`
  font-size: 0.9rem;
  color: ${gray3};
  background: none;
  border: none;
  margin: 10px 20px;
  transition: all 0.3s ease;
  &:hover {
    color: ${black1};
    transform: translateY(-10%);
  }
`

const TitleActiveButton = styled.button`
  border-radius: 30px;
  color: white;
  background: ${green1};
  width: 100px;
  border: none;
  padding: 6px 10px;
  margin: 10px 20px;
`

const MemberTitileButtonsGroup = ({ orders }) => {
  return (
    <>
    <TitleButtonsGroup>
    {orders.map((order, index) => {
      if(index === 0) return <TitleActiveButton>{order}</TitleActiveButton>
      return <TitleNormalButton>{order}</TitleNormalButton>
    })}
    </TitleButtonsGroup>
    <>
  )
}

export default MemberTitileButtonsGroup
