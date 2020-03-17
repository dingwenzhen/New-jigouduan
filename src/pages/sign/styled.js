import styled from "styled-components"
import bg from "@/static/bg.png";
import logo from "@/static/logo.png"
export const LoginWrapper = styled.div`
    width:100%;
    height:100%;
    background:url(${bg}) no-repeat;
    background-size:100% 100%;
    display:flex;
    justify-content:center;
    align-items:center;
    .loginContainer{
        width:450px;
        position:absolute;
        right:40px;
        background:rgba(255,255,255,0);
        padding:30px;
    }
    .logo{
        width:360px;
        height:63px;
        display:flex;
        justify-content:center;
        margin-bottom:20px;
        background:url(${logo}) no-repeat;
        background-size:100% 100%;
    }
    .signAccount{
        margin-bottom:10px;
        cursor: pointer;
    }
`