import MusicPlayerSmall from '../MusicPlayerSmall'
import MusicPlayerFull from '../MusicPlayerFull'
import data from '../../data.js'

const MusicPlayer = () => {
  return (
    <>
      <MusicPlayerSmall />
      <MusicPlayerFull data={data}/>
    </>
  )
}

export default MusicPlayer
