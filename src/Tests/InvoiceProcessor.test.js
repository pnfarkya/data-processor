import { fireEvent, render, screen } from '@testing-library/react';
import InvoiceProcessor from '../Components/DataProcessor/InvoiceProcessor';
import '@testing-library/jest-dom'

test('Post button disbaled', () => {
    render(<InvoiceProcessor />);
    const postButton = screen.getByTestId("PostData");
    expect(postButton).toBeDisabled();
});


test('Validate button enabled', () => {
    render(<InvoiceProcessor />);
    const validateButton = screen.getByTestId("ValidateData");
    expect(validateButton).toBeEnabled();
});