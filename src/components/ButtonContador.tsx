import { useState } from "react";

export function ButtonContador() {
   // let counter = 0; // let - let it change, tipo variavel de mudança 

   // transforma a variavel num estado
   const [counter, setCounter] = useState(0); //[useState]-retorna vetor 2 posições
                                              //'1°-Counter, 2° SetCounter

    function increment() { // inclemento o contador
        //counter += 1;
        setCounter(counter + 1); //set um novo valor para counte-somando valor anterior
       // console.log(counter);
    }
    
    return (
        <button 
          onClick={increment}>{counter}
         </button> //adiciono detro do paramentro onClick a função
    )
}