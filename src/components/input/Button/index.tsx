import styled from 'styled-components'

const ButtonStyle = styled.button`
  display: flex;
  max-height: 30px;
  border: none;
  border-radius: 6px;
  background-color: var(--primary);
  padding: 8px;
  color: var(--white);
  cursor: pointer;

  img {
    vertical-align: top;
  }
`

export type IPropsButton = {
  children: JSX.Element
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<IPropsButton> = ({ children, onClick }) => {
  return <ButtonStyle onClick={onClick}>{children}</ButtonStyle>
}

export default Button
