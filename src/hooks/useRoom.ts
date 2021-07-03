import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

//tipagem retorno dados room firebase - questions
type FirebaseQuestions = Record<string, { //[Record]-declaro tipagem objetos
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHightLighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
  }>
  

//tipagem questoes
type QuestionType = {
    id: string;
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHightLighted: boolean;
    likeCount: number;
    likeId: string | undefined;
  }

export function useRoom(roomId: string) {
  const { user } = useAuth();  
  const [questions, setQuesttions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('');
    
  // Evento para Popular perguntas
  useEffect(() => {
    // console.log(roomId)
  const roomRef = database.ref(`rooms/${roomId}`);

  roomRef.on('value', room => {
    console.log(room.val());
    const databaseRoom = room.val();
    const firebaseQuestions:FirebaseQuestions = databaseRoom.questions ?? {};

    const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => { //value[0] value[1]
      return {
        id: key,
        content: value.content,
        author: value.author,
        isHightLighted: value.isHightLighted,
        isAnswered: value.isAnswered,
        likeCount: Object.values(value.likes ?? {}).length, //busco record likes
        likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
      }
    }) //[entries]- transforma objeto em matrix [],[],[]
    // console.log(parsedQuestions)
    setTitle(databaseRoom.title);
    setQuesttions(parsedQuestions)
  })
  
  return () => {
      roomRef.off('value');
  }

},[roomId, user?.id]);


return { questions, title }

}