
import { RATES } from "../../constants";
import styled from "styled-components";


const CurrencyContainer = styled.div`
.balance__item{
    flex: 1 1 auto;
    /* background-color: #fff; */
    padding: 10px 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    max-height: 288px;
    gap: 15px;
}

.item{
        padding: 5px 10px;
        display: flex;
        gap: 10px;
        color: ${({ theme }) => theme.color};

        &__content{
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }

    .content__balance{
        font-size: 16px;
        font-weight: 700;
        text-wrap: nowrap;
        line-height: 133%; /* 133.333% */
& span{
    color: ${({ theme }) => theme.linkColor};

}
}

.balance__container{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
}

`

export const СurrencyRate = () => {

    return (
        <CurrencyContainer>
            <div className="balance__container">
                <div className="balance__item item">
                    <div className="item__content content">
                        <div className="content__title">USD:</div>
                        <div className="content__balance"><span>$</span> {(1 / RATES.USD).toFixed(2)}</div>
                    </div>
                    <div>|</div>
                    <div className="item__content content">
                        <div className="content__title">EURO:</div>
                        <div className="content__balance"><span>€</span> {(1 / RATES.EUR).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </CurrencyContainer>
    )
}