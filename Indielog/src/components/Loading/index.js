import {
  LoadingDiv,
  ModalBackground
} from './LoadingElements.js'

const Loading = () => {
  return (
    <ModalBackground>
      <LoadingDiv>
        <img alt='' src='/loading.gif'/>
      </LoadingDiv>
    </ModalBackground>
  )
}

export default Loading
