import styled from 'styled-components'

export const SettingsCont = styled.div`
    padding: 10px;
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: all 0.3s ease 0s;
    color: ${({ theme }) => theme.color};

.settings{
    &__form{
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
}
&__advanced{
        max-width: 300px;
        padding: 20px 0;
    }

hr{
    color: transparent;
    width: 100%;
}
}
.form{

    &__label{
        display: flex;
        flex-direction: column;
        font-size: 18px;
        font-weight: 500;
        line-height: 32px; /* 133.333% */
        letter-spacing: -0.48px;

        & select{
            max-width: 300px;
            padding: 5px;
            border-radius: 10px;
            border: none;
            background: #4318FF;
            outline: none;
            background-color:  ${({ theme }) => theme.secondary};
            color: ${({ theme }) => theme.linkColor};
            box-shadow: ${({ theme }) => theme.shadow} 0px 5px 15px;
            cursor: pointer;
        }
    }
}
.advanced{
    position: relative;
    &__input{
        height: 33px;
        margin-bottom: 5px;
        outline: none;
                &:focus{
                    border: 2px solid #4318FF;
                }

    }
    &__errormessage{
        position: absolute;
        top: 52%;
        left: 1%;
        color: red;
        font-size: 12px;
    }
    &__title{
        font-weight: 600;
        font-size: 18px;
    }
}
.error .advanced__input{
    border: 2px solid red
};


.button{
padding: 10px 50px;
border: 1px solid rgb(66, 142, 204);
background-color: #4318FF;
color: #fff;
min-width: 80px;
height: 40px;
transition: all 0.3s ease 0s;
margin-bottom: 15px;

&.del{
    background-color: red;
    border: none;
}

&:not(:last-child){
    margin-right: 15px;
}


@media (min-width:767.98px){
    padding: 5px 25px;

    &:hover{
    color: ${({ theme }) => theme.linkColor};
    background-color: transparent;
    box-shadow: 2px 2px 2px 2px  ${({ theme }) => theme.linkColor};
    cursor: pointer;
    }
    &.del{
        &:hover{
        color: red;
        background-color: transparent;
        box-shadow: 2px 2px 2px 2px  red;
        cursor: pointer;
        }
        }
    }
}

@media (max-width:767.98px){
    .button{
        padding: 5px 25px;
    }

    }



`;
SettingsCont.displayName = 'SettingsCont';