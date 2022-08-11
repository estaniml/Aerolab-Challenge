import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  0%,
   100% {
   animation-timing-function: cubic-bezier(0.3, 0, 0.5, 0.3);
  }
 
  0% {
   transform: rotateY(0deg);
  }
 
  50% {
   transform: rotateY(1800deg);
   animation-timing-function: cubic-bezier(0, 0.3, 0.3, 0.5);
  }
 
  100% {
   transform: rotateY(3600deg);
  }
`

const Spin = styled.div`
  display: inline-block;
  transform: translateZ(1px);

  > div {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-image: url('../src/assets/icons/coin.svg');
    animation: ${rotation} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
`

const Spinner = () => {
  return (
    <Spin>
        <div></div>
    </Spin>
  )
}

export default Spinner;
