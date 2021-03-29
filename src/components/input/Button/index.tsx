import styled from 'styled-components'

const ButtonStyle = styled.button`
  display: flex;
  max-height: 30px;
  border: none;
  border-radius: 6px;
  background-color: var(--primary);
  padding: 8px;
  color: var(--white);

  img {
    vertical-align: top;
  }
`

const Button: React.FC<HTMLButtonElement> = ({ children }) => {
  return <ButtonStyle>{children}</ButtonStyle>
}

export default Button
