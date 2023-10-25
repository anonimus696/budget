import styled from 'styled-components'

export const SettingsCont = styled.div`
    padding: 10px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transition: all 0.3s ease 0s;

.settings{
    &__form{
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
    &__label{
        font-size: 24px;
        font-weight: 700;
        line-height: 32px; /* 133.333% */
        letter-spacing: -0.48px;
    }
    }
    &__advanced{
        padding: 20px 0;
    }   
hr{
    color: transparent;
    width: 100%;
}
}
.form{

    &__label{
        font-size: 18px;
        font-weight: 600;
        line-height: 32px; /* 133.333% */
        letter-spacing: -0.48px;
        & select{
            padding: 5px;
            border-radius: 15px;
            margin-left: 10px;
            background-color: transparent;
            color: ${({ theme }) => theme.linkColor};
        }
    }
}

`;
SettingsCont.displayName = 'SettingsCont';