import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContexts"

export default function useAuth(){
    const use = useContext(AuthContext)

    return use
}