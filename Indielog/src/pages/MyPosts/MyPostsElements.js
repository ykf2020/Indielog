import { gray2, gray3, green1, green2, black1, MEDIA_QUERY_568 } from '../../utils/constants.js'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
export const MemberPageContainer = styled.div`
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
export const TitleButtonsGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 1px solid ${gray2};
`
export const TitleNormalButton = styled(Link)`
  text-decoration: none;
  line-height: 2.2rem;
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
  ${MEDIA_QUERY_568} {
    font-size: 0.6rem;
    margin: 10px 12px;
  }
`
export const TitleActiveButton = styled.button`
  border-radius: 30px;
  color: white;
  background: ${green1};
  width: 120px;
  border: none;
  padding: 6px 10px;
  margin: 10px 20px;
  ${MEDIA_QUERY_568} {
    font-size: 0.6rem;
    padding: 6px 4px;
  }
`
export const LinkWithoutDecoration = styled(Link)`
  text-decoration: none;
`
export const PostDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ButtonsGroup = styled.div`
  margin-top: 30px;
  width: 180px;
  height: 40px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${gray2};
`
export const Button = styled.div`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background: ${green1};
  color: white;
  cursor:pointer;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${green2};
  }
`
