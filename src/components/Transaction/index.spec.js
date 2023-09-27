import React from "react";
import { render } from "@testing-library/react";
import Transaction from ".";

describe('Transaction comment', () => {
    it('should show transaction', () => {
        const { asFragment } = render(<Transaction />);
        expect(asFragment()).toMatchSnapshot();
    })
})