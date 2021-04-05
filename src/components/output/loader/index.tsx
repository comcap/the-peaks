import styled from 'styled-components'

const Spiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;

  .loader {
    border: 10px solid #f3f3f3;
    border-top: 10px solid var(--primary);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

/* display: flex;
  height: 100%;
  align-items: center;
  justify-content: center; */

const DefaultLoader: React.FC = () => {
  return (
    <Spiner>
      <div className='loader'></div>
    </Spiner>
  )
}

export default DefaultLoader
