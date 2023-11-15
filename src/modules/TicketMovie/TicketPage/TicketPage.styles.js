
import styled from "styled-components";
import { Grid, Box, Typography, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { css } from '@emotion/react';



export const GridCustom = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 6.4%);
  background-color: grey;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
`;

export const ButtonSeat = styled.button`
  text-align: center;
  border-radius: 7px;
  padding: 8px;
  margin: 3px;
  cursor: pointer;
  border: 1px solid white;
`;


export const TableStyle = styled(Table)`
 
 border: 2px solid white;
  border-collapse: collapse;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: 'rgba(255, 255, 255, 0.5)';
  text-align: center;
   
`;



export const  TableCellStyle= styled(TableCell)`
  
  .headerStyle {

    font-size: 20px;
    border: white;
    

  }
  .cellStyle{


    border: 1px solid white;


  }
 
`;

export const Text = styled.p`
  font-weight: bold;
  color: black;
`;

export const TextColor = styled.p`
  font-weight: bold;
  color: #7F7F7F;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextSeat = styled.p`
  display: inline;
  color: #ff3838;
  font-weight: bold;
`;

export const Screen = styled.div`
border-bottom: 50px solid rgb(255, 159, 95);
border-left: 50px solid transparent;
border-right: 50px solid transparent;
height: 20;
width:80%;
margin-left:100px;
filter: drop-shadow(4px 30px 20px rgba(255, 255, 255, 0.5));
font-size: 25px;
color: #fff;
`;
