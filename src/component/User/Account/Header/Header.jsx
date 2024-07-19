import { Button } from "@mui/material"
import { useContext } from "react"
import { Context } from "../../../../User"

const Header = () => {
   const {logOut} = useContext(Context)


   return <Button onClick={logOut} >Logout</Button>
}

export default Header