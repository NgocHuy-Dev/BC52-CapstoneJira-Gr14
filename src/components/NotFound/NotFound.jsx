import React from "react";
import { useNavigate } from "react-router-dom";

import {Button,Box} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import {AnimationStyle} from "./NotFound.styles";
import animationibg from './../assets/animation.gif'









export default function NotFound() {
  const navigate = useNavigate();

  return (
<div>

        <Button
          disabled={false}
          variant="filledTonal"
          onClick={() => {
            navigate("/");
          }}
          sx={{ width: { sx: 1.0, sm: 50, md: 170, lg: 190, xl: 200 } }}
        >
          <Box sx={{ m: 1 }}><FontAwesomeIcon icon={faArrowCircleLeft}/></Box>
          
          <Box>Go to Home</Box>
        </Button>
        
    

      
  
        <AnimationStyle src={animationibg} alt="Not Found"  />
     
  </div>
  );
}
