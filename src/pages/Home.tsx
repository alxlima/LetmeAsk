//webpack (snowpac, vite, ...) e dependencias que pega instensoes do arquivo
//Nota: no React tudo que for utilizado no companente é necessario ser importado da pasta origem.
// import { useContext } from 'react'; // para recuperar um valor de contexto
import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg' // imagem importada
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { database } from '../services/firebase';

import { Button } from '../components/Button'; // criado componente butom com eletros props react
import { useAuth } from '../hooks/useAuth';
 

import '../styles/auth.scss';

export function Home(){
  const history = useHistory(); 
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode ] = useState('');


   //função que crio rota de navegação buton 
   async function handleCreateRomm(){ 
     if (!user) {
       await signInWithGoogle()
     }

     history.push('/rooms/new'); //executa a rotas App.tsx   
   }

   async function handleJoinRoom(event: FormEvent){
     event.preventDefault()

     if (roomCode.trim() ==='') { //[trim()]- removo os espaços no texto digitado pelo user, verifico se é vazio
      return; 
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get(); //busco todos registro de codigo sala

    if (!roomRef.exists()){ // [!]roomRef- valido se retorna falso
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room alredy closed.')
      return;
    }

    history.push(`/rooms/${roomCode}`);

   }

    return(
        <div id="page-auth">
          <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
             <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo-real</p>
          </aside>
          <main>
            {/* <h1>{value}</h1> */}
            <div className="main-content">
              <img src={logoImg} alt="Letmeask" />
              <button onClick={handleCreateRomm} className="create-room">
                <img src={googleIconImg} alt="Logo do Google" />
                Crie sua sala com o Google    
              </button>  
              <div className="separator">ou entre em uma sala</div>
              <form onSubmit={handleJoinRoom}>
                <input 
                 type="text" 
                 placeholder="Digite o código da sala "
                 onChange={event => setRoomCode(event.target.value)}
                 value={roomCode}
                 />
                 <Button> 
                   Entrar na sala
                 </Button>
                  
              </form>

            </div>
           </main>
            
        </div>
      
    )
}