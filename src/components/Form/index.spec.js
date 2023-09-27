import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from "react-dom/client";
import { act, fireEvent, } from "@testing-library/react";
import Form from "."; // Замість "./Form" вкажіть правильний шлях до вашого компонента

let container = null;
beforeEach(() => {
    // налаштування DOM-елемента як цільового контейнера
    container = document.createElement("div");
    document.body.appendChild(container);

    jest.spyOn(global, 'Date')
        .mockImplementation(() => ({
            toISOString: () => '2021-01-01T11:49:558Z'
        }))
});

afterEach(() => {
    // очищення при виході
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('when edit form', () => {

    it("should change and check value input", () => {
        const root = createRoot(container);
        const expectedElement = '123';
        act(() => {
            root.render(<Form />);
        });

        const valueInput = container.querySelector("input[name='value']");

        expect(valueInput).toBeDefined();


        act(() => {
            fireEvent.change(valueInput, { target: { value: "123" } });
            root.unmount();
        });

        const value = valueInput.value;

        expect(value).toBe(expectedElement);

        // Також перевірте інші очікувані результати після зміни вводу та перевірки значення
    });

    it("should change and check comment input", () => {
        const root = createRoot(container);
        const expectedElement = 'comment top';
        act(() => {
            root.render(<Form />);
        });

        const valueInput = container.querySelector("textarea[name='comment']");

        expect(valueInput).toBeDefined();


        act(() => {
            fireEvent.change(valueInput, { target: { value: "comment top", name: 'comment' } });
            root.unmount();
        });

        const value = valueInput.value;

        expect(value).toBe(expectedElement);

        // Також перевірте інші очікувані результати після зміни вводу та перевірки значення
    });

})


describe('when user submit form', () => {
    it("should call onChange from onChangeMock", () => {
        const onChangeMock = jest.fn();

        const root = createRoot(container);

        act(() => {
            root.render(<Form onChange={onChangeMock} />);
        });

        const valueForm = container.querySelector("form");

        expect(valueForm).toBeDefined();


        act(() => {
            fireEvent.submit(valueForm, {
                preventDefault: jest.fn()
            });
            root.unmount();
        });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    it("should send form data", () => {
        const onChangeMock = jest.fn();
        const root = createRoot(container);

        act(() => {
            root.render(<Form onChange={onChangeMock} />);
        });

        const valueInput = container.querySelector("input[name='value']");
        const commentInput = container.querySelector("textarea[name='comment']"); // Зміна тут
        const formElement = container.querySelector("form");

        act(() => {
            fireEvent.change(valueInput, { target: { value: "123" } });
            fireEvent.change(commentInput, { target: { value: "comment top", name: 'comment' } });

            fireEvent.submit(formElement, {
                preventDefault: jest.fn()
            });
            root.unmount();
        });

        expect(onChangeMock).toHaveBeenCalledWith({
            value: '123',
            date: '2021-01-01',
            comment: 'comment top'
        });
    });

})
