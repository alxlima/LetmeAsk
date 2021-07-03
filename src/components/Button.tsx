import { ButtonHTMLAttributes } from 'react' // esta propriedade é nativa do react

//import estilização css do Botão
import '../styles/button.scss';

// propriedade props que o botão pode receber
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { // & [isOutlined?: boolean] adicio. mais propriedades botão
  isOutlined?: boolean
};

export function Button({isOutlined=false, ...props}: ButtonProps) {
  return (
        <button 
        className={`button ${isOutlined ? 'outlined':''}`}
        {...props} /> //caso isOutLine- existir incluo mais a classe outlined, [:]- senão, colona nada
    )
}

<Button />