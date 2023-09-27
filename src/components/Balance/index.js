const Balance = ({ balance, children }) => {
    return (
        <div data-testid="balance">
            Actual balance: {balance}
        </div>
    )
}

export default Balance;