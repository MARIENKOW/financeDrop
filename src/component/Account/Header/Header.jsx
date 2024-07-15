import { Button } from "@mui/material"
import { Context } from "../../.."
import { useContext } from "react"

const Header = () => {
   const {user,logOut} = useContext(Context)


   return <Button onClick={logOut} >Logout</Button>
}

export default Header