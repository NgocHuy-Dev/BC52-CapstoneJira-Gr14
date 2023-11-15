import styled from '@emotion/styled';
import { Box, Card, CardContent, CardMedia, Grid, Typography,Button} from '@mui/material';




export const MovieCard = styled(Card)({
    display: 'flex',
    margin: '1rem',
    padding: '1rem',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    height:'60vh',
  });
  
  export const MovieCardContent = styled(CardContent)({
    flex: '1 0 auto',
  });
  
  export const MovieCardMedia = styled(CardMedia)({
    width: '200px',
  });
  
  export const Rating = styled(Typography)({
    color: '#FFA500',
  });
  
  export const GradientButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 28,
  
  });