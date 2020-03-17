import styled from "styled-components"
import DeletedIconOne from "@/static/icon-tuceng.png"
import FrequencyIconIconOne from "@/static/JHCS.png"
import QualityIcon from "@/static/jhzl.png"
import ShiBai from "@/static/shibai.png"
export const UserInterfaceStyle = styled.div`
    .DeletedIcon{
        width:40px;
        height:40px;
        background:url(${DeletedIconOne}) no-repeat;
        background-size:100% 100%;
    }
    .FrequencyIcon{
        width:40px;
        height:40px;
        background:url(${FrequencyIconIconOne}) no-repeat;
        background-size:100% 100%;
    }
    .qualityIcon{
        width:40px;
        height:40px;
        background:url(${QualityIcon}) no-repeat;
        background-size:100% 100%;
    }
    .ShibaiIcon{
        width:40px;
        height:40px;
        background:url(${ShiBai}) no-repeat;
        background-size:100% 100%;
    }
`