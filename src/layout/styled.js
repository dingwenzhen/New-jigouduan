import styled from "styled-components";
import Logo from "@/static/logo.png"

export const LayoutStyled = styled.div`
   width: 300px;
   height: 40px;
   position:absolute;
   top:10px;
   left:10px;
   background:url(${Logo}) no-repeat;
   background-size:100% 100%;
   cursor:pointer
`