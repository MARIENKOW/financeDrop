import { Button } from "@mui/material"
import { useContext } from "react"
import { AdminContext } from "../../../../Admin"

const Header = () => {
   const {logOut} = useContext(AdminContext)


   return <Button onClick={logOut} >Logout</Button>
}

export default Header