import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import useAuth from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string
    }>
}>

type Questions = {
    id: string,
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
    likeCount: number,
    likeId: string | undefined
}

export default function useRoom(idRoom: string | undefined) {
    const { user } = useAuth()
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Questions[]>([])

    useEffect(() => {

        const roomRef = database.ref(`rooms/${idRoom}`)

        roomRef.on('value', (snapshot) => {
            let databaseRoom = snapshot.val()
            let firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

            let questionsParse = Object.entries(firebaseQuestions).map(([key, value]) => {

                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            })
            setQuestions(questionsParse)
            setTitle(databaseRoom.title)
        })

        return () => {
            roomRef.off('value')
        }

    }, [idRoom, user?.id])

    return {
        questions,
        title
    }
}