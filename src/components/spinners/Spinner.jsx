import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    100% {
    transform: rotate(360deg);
    }
`
const dash = keyframes`
    0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    }

    50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
    }

    100% {
    stroke-dashoffset: -125px;
    }
`

const Svg = styled.svg`
    width: 3.25em;
    transform-origin: center;
    animation: ${spin} 2s linear infinite;

    > circle {
        fill: none; 
        stroke: hsl(214, 97%, 59%);
        stroke-width: 2;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: ${dash} 1.5s ease-in-out infinite;
    }
`

const Spinner = () => {
  return (
    <div style={{width: '100%', textAlign: 'center'}}>
        <Svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
        </Svg>
    </div>
  )
}

export default Spinner