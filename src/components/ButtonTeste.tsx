//crio tipagem contendo todas as propriedades do botão
type ButtonProps = {
   text?: string;// passo propriedade "text". para App.tsx -[?] torna propriedade opcional
   children?: string; // nesta formado de propriedade não adiciono parametro
}


export function ButtonTeste(props: ButtonProps) { // export - função named exporte {Button} in APP.tsx
    return(
    //    <button>{props.text ||'Defaul'}</button>  // Adiciono propri. Text [||'Default']-caso não exitir fica default
       <button>{props.children ||'Defaul'}</button>  // Adiciono propri. Children [||'Default']-caso não exitir fica default
    );
}

