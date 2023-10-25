import styled from 'styled-components'

export const BalanceContainer = styled.div`
display: flex;


.balance__items{
    width: 100%;//!
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 0 0 10px 0;
}

.balance__item{
    flex: 1 1 auto;
    background-color: #fff;
    padding: 10px 15px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    max-height: 288px;
    gap: 15px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
.item{
        padding: 5px 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
        &__content{
            display: flex;
            gap: 10px;
        }
    }
    
    


.content{
    width: 100%;//!
    align-items: center;
    justify-content: center;
}
.content__title{
    color: ${({ theme }) => theme.linkColor};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
}

.content__balance{
font-size: 24px;
font-style: normal;
font-weight: 700;
text-wrap: nowrap;
line-height: 133%; /* 133.333% */
& span{
    color: ${({ theme }) => theme.linkColor};

}
}

.balance__icon{
    font-size: 32px;
    max-width: 67px;
    max-height: 67px;
    padding: 10px 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.linkColor};
}
.balance__img{
    display: flex;
    max-width: 67px;
    max-height: 67px;
    padding: 16px 16px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.background};
}
.balance__img img{
    max-width: 26px;
}

@media (min-width:999px){
    .item{
        width: 100%;//!
    }
}

@media (max-width:997.99px){

    .balance__container{
            position: absolute;
            top: 15px;
            right: 15%;
            flex-wrap: nowrap;
    }

    .item{
        padding: 5px 10px;
        & .content__balance{
        font-size: 16px;
        }
    }
}


@media (max-width:830px){
    justify-content: center;
    .balance__items{
    gap: 10px;
    }
    .balance__item{
    gap: 10px;
    padding: 5px 10px;
}


}

@media (max-width:767.98px){

    .balance__items{
    flex-wrap: wrap;
    width: 100%;
    }
    .balance__item{
        padding: 3px;
        gap: 5px;
    &:first-child{
        flex: 1 1 100%;
        justify-content: center;
    }
    &:not(:first-child){
        flex: 1 1 40%;
    }
    }
    .item{
        padding: 5px 10px;
        &:first-child{
            flex: none;
        }
    }
    .content__balance{
        font-size: 18px;
    }
    .balance__icon,
    .balance__img{
    background-color: transparent;
    padding: 10px;
    }

}

@media (max-width:400px){
    .balance__icon,
    .balance__img{
    padding: 5px;
    }
}


`;

BalanceContainer.displayName = 'BalanceContainer';

/*
.item{
    position: absolute;
    &_1{
            top: 20px;
            right: calc(17%);
        }
        &_2{
            top: 20px;
            right:  calc(55%);
        }
    }
    */