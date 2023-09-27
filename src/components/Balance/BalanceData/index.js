import React, { useState } from "react";
import Proptypes from "prop-types";

export const BalanceData = ({ children }) => {
    const [balance] = useState(12);
    return children(balance)
}


BalanceData.Proptypes = {
    children: Proptypes.func.isRequired
}