import { Box, Button, Slider } from '@mui/material';
import { useRef, useState } from "react";
import AvatarBlock from "react-avatar-editor";

const boxStyle = {
   maxWidth: "300px",
   display: "flex",
   flexFlow: "column",
   justifyContent: "center",
   alignItems: "center"
};

const AvatarEditor = ({ src, setSrc, saveImg }) => {
   const [slideValue, setSlideValue] = useState(10);
   const cropRef = useRef(null);

   return (
      <Box sx={boxStyle}>
         <AvatarBlock
            ref={cropRef}
            image={src}
            style={{ width: "100%", height: "100%" }}
            border={50}
            borderRadius={150}
            color={[0, 0, 0, 0.72]}
            scale={slideValue / 10}
            rotate={0}
         />

         <Slider
            min={10}
            max={50}
            sx={{
               margin: "0 auto",
               width: "80%",
            }}
            size="medium"
            color='primary'
            defaultValue={slideValue}
            value={slideValue}
            onChange={(e) => setSlideValue(e.target.value)}
         />
         <Box
            sx={{
               display: "flex",
               padding: "10px",
               gap:2
            }}
            color="primary"
            aria-label="image">
            <Button
               size="small"
               variant="contained"
               color='error'
               onClick={(e) => setSrc(null)}
            >
               Cancel
            </Button>
            <Button
               size="small"
               variant="contained"
               onClick={() => saveImg(cropRef)}
            >
               Save
            </Button>
         </Box>
      </Box>
   );
};

export default AvatarEditor