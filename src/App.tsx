import { BrowserRouter, Route, Switch } from 'react-router-dom' //Switch- não permite duplicar as rotas na mesma pag;

import { Home } from './pages/Home';       // Rota 01
import { NewRoom } from './pages/NewRoom'; // Rota 02
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

// import { AuthContextProvider } from './contexts/AuthContext'
import {AuthContextProvider} from './contexts/AuthContext'

export function App() {
  return (
    
    <BrowserRouter>
     <AuthContextProvider>
        <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/rooms/new" component={NewRoom} />
         <Route path="/rooms/:id" component={Room} />
         <Route path="/admin/rooms/:id" component={AdminRoom} />
         </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;



// Modelo exemplo Butos testes
//import { ButtonTeste } from './components/ButtonTeste'
//import { ButtonContador} from './components/ButtonContador';
// export function App() {
//   return (
    
//      //  <Home />
//      //  <NewHome />
//     /*<div>
//       <h1>Hello World</h1>
//       <ButtonTeste text="Botão 1"/> 
//      <ButtonTeste>Clique aqui</Button>
//      <ButtonTeste />
//      <hr/ >
//      <ButtonContador />  
//     </div>*/
//   );
// }
