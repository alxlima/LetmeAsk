import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg' // imagem importada
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button'; // criado componente butom com eletros props react
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';


export function NewRoom(){
    const { user } = useAuth()
    const history  = useHistory()

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
      event.preventDefault(); // previne comportamente padrão carregamento pagina piscar tela

      // console.log(NewRoom); testo passar do evento
      if (newRoom.trim() ==='') { //[trim()]- removo os espaços no texto digitado pelo user, verifico se é vazio
        return; 
      }

      //criado ref de registro no banco de dados
      const roomRef = database.ref('rooms'); //pega informação de rooms que é cada sala e passo varias
      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
      }) // envio inform. para dentro de Rooms

      history.push(`/rooms/${firebaseRoom.key}`) // rotas redirecionada para sala criada
                                                 // [key] -- id user sessão insert database
    }

    return( 
        <div id="page-auth">
          <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
             <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo-real</p>
          </aside>
          <main>
            <div className="main-content">
              <img src={logoImg} alt="Letmeask" />
               <h2>Criar uma nova sala</h2>
            
              <form onSubmit={handleCreateRoom}>
                <input 
                 type="text" 
                 placeholder="Nome da Sala"
                 onChange={event =>setNewRoom(event.target.value)}
                 value={newRoom}
                 />

                 <Button> 
                   Criar Sala
                 </Button>
              </form>
              <p>
                Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
              </p>

            </div>
           </main>
            
        </div>
      
    )
}