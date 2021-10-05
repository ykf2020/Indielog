import styled from 'styled-components'
import { gray3, gray4, green1, green2 } from '../../utils/constants.js'
export const BlogPostPageContainer = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  max-width: 860px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`
export const Title = styled.h2`
  align-self: flex-start;
  padding-bottom: 2px;
  border-bottom: 2px solid ${green1};
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`
export const InputSection = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`
export const SectionTitle = styled.h4`
  font-size: 1rem;
  color: ${gray4}
`
export const Input = styled.input`
  height: 40px;
  outline: none;
  padding: 0 8px;
  border: 1px solid ${gray3}
`
export const Select = styled.select`
  width: 200px;
  outline: none;
  border: 1px solid ${gray3};
`
export const ImgSection = styled.div`
  display:flex;
  align-items: flex-end;
  margin-top: 20px;
`
export const ImageDiv = styled.div`
  width:  360px;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
export const UploadButton = styled.label`
  font-size: 14px;
  height: 30px;
  width: 120px;
  cursor: pointer;
  background: ${green1};
  border-radius: 15px;
  line-height: 30px;
  margin-left: 20px;
  text-align: center;
  color: white;
  transition: all 0.2s ease;
  &:hover {
    background: ${green2}
  }
`
export const SubmitButton = styled.button`
  border: none;
  height: 40px;
  border-radius: 10px;
  margin-top: 20px;
  border-radius: 5px;
  background: ${green1};
  text-align: center;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: ${green2}
  }
`
