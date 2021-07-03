import { createContext, ReactNode, useEffect, useState } from "react"; // Criando contextos do react
import { auth, firebase } from "../services/firebase";

//criando tipagem de atutenticação usuarios
type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  //criando tipagem de contexto usuarios
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }
  

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);//{}-objeto [as any]-ignora valore objeto vazio


export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();//useState()-inicio estado andefined, [user]-usuario aunt , [setUser]-modificar usuario
   
    // função que monitoro a sesão de usuario autenticado e logado
    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const { displayName, photoURL, uid} = user
         
          if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.')
          }
   
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
          })
        }
      })
  
      return () => {
        unsubscribe();
      }
    }, [])
  
    //criar função para chamar usuario para  aplicação
    async function signInWithGoogle() {
      //executa a atutenticação de usuario
      const provider = new firebase.auth.GoogleAuthProvider();
      
      const result = await auth.signInWithPopup(provider);
       // console.log(result) // testes usuario login
  
       if (result.user){
         const { displayName, photoURL, uid} = result.user
         
         if (!displayName || !photoURL) {
           throw new Error('Missing information from Google Account.')
         }
  
         setUser({
           id: uid,
           name: displayName,
           avatar: photoURL,
         })
       }      
      }                               // [auth]- atutenticacao
                                       // [signInWithPopup]- abrir o login = popUp
     
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
       {props.children}  
    </AuthContext.Provider>
  );
}