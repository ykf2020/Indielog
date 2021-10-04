import { Carousel } from 'react-bootstrap';

import styled from 'styled-components'
const Carousellll = styled(Carousel)`
  width: 100%;
`

const Carou = () => {
  return (
    <Carousellll>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="/carou001.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="/carou002.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="/carou003.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousellll>
  )
}

export default Carou
