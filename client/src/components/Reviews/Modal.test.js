import React from 'react';
import { render, fireEvent, queryByRole } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';
//import jest from 'jest';

test('Modal renders correctly and closes on click', () => {
  const imageUrl = 'https://example.com/image.jpg';
  const mockCloseHandler = jest.fn();

  // Render the modal with necessary props
  const { getByText, getByRole, queryByRole } = render(
    <Modal imageUrl={imageUrl} closeHandler={mockCloseHandler} />
  );

  // Assert initial rendering: modal content and close button
  expect(getByRole('img', { name: /real size/i })).toBeInTheDocument(); // Improved image assertion
  expect(getByText(/×/i)).toBeInTheDocument(); // More descriptive close button assertion

  // Simulate close button click and assert behavior
  fireEvent.click(getByText(/×/i));

  expect(mockCloseHandler).toHaveBeenCalledTimes(1); // Verify close handler is called
  expect(queryByRole('img')).toBeNull();// Assert image is removed after close
});