import { useContext } from "react";
import { observer } from "mobx-react-lite";
import {
   Box,
   Paper,
   IconButton,
   Button,
   FormHelperText,
   CircularProgress,
   CardMedia,
   Typography,
   useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Context } from "../../../User";
import { Title } from "../../../component/general/Title";
import AvatarEditor from "../../../component/general/Settings/ChangeImage/AvatarEditor";

const ChangeImage = () => {
   const theme = useTheme();

   const [src, setSrc] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const { user, deleteImg, createImg } = useContext(Context);

   const handleImgChange = (e) => {
      setSrc(URL.createObjectURL(e.target.files[0]));
      setError("");
   };

   const handleSave = async (cropRef) => {
      try {
         setLoading(true);
         setSrc(null);
         const file = await new Promise((res) => {
            cropRef.current
               .getImage()
               .toBlob((blob) =>
                  res(new File([blob], "Avatar.png", { type: "image/png" }))
               );
         });
         const formData = new FormData();
         formData.append("img", file);
         await createImg(formData);
      } catch (error) {
         console.log(error);
         // if (error?.response?.status === 400)
         //    return setError("завантажено невірний тип даних");
         setError("Oops! something went wrong, try again later");
         enqueueSnackbar(`Oops! something went wrong, try again later`, {
            variant: "error",
         });
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async () => {
      try {
         setLoading(true);
         await deleteImg();
      } catch (error) {
         console.log(error);
         setError("Oops! something went wrong, try again later");
         enqueueSnackbar(`Oops! something went wrong, try again later`, {
            variant: "error",
         });
      } finally {
         setLoading(false);
      }
   };

   return (
      <Box
         flex={1}
         display={"flex"}
         flexDirection={"column"}
         justifyContent={"center"}
         alignItems={"center"}
         gap={1}
      >
         <Title
            sx={{ mb: 3, color: theme.palette.secondary.contrastText }}
            label={"Change profile image"}
         />
         {loading ? (
            <Paper
               variant="outlined"
               sx={{
                  width: 200,
                  height: 200,
                  borderRadius: 99,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
               }}
            >
               <CircularProgress size="50px" />
            </Paper>
         ) : src ? (
            <AvatarEditor saveImg={handleSave} src={src} setSrc={setSrc} />
         ) : user?.img ? (
            <Box sx={{ position: "relative", width: 200, height: 200 }}>
               <CardMedia
                  sx={{
                     width: "100%",
                     height: "100%",
                     borderRadius: 99,
                     overflow: "hidden",
                  }}
                  image={user?.img?.path}
                  title="avatar"
               />
               <Button
                  onClick={handleDelete}
                  size="small"
                  variant="contained"
                  color="error"
                  endIcon={<DeleteForeverIcon />}
                  sx={{ position: "absolute", top: 20, right: -20 }}
               >
                  Delete
               </Button>
            </Box>
         ) : (
            <>
               <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleImgChange}
               />
               <label htmlFor="raised-button-file">
                  <IconButton aria-label="upload picture" component="span">
                     <Paper
                        variant="outlined"
                        sx={{
                           width: 200,
                           height: 200,
                           borderRadius: 99,
                           display: "flex",
                           flexDirection: "column",
                           justifyContent: "center",
                           alignItems: "center",
                           overflow: "hidden",
                           background: theme.palette.background.light,
                           p: 2,
                        }}
                     >
                        <CloudUploadIcon
                           color="primary"
                           style={{ fontSize: 60 }}
                        />
                        <Typography
                           fontWeight={600}
                           variant="h6"
                           color="secondary"
                        >
                           Click to load
                        </Typography>
                     </Paper>
                  </IconButton>
               </label>
            </>
         )}
         <FormHelperText error={!!error} sx={{ p: "0 14px" }}>
            {error}
         </FormHelperText>
      </Box>
   );
};

export default observer(ChangeImage);
