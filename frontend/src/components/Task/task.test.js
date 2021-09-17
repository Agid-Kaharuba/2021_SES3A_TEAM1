import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Task from './task';
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect";

let mockTask = {
    name: "Testing Task",
    description: "Some description",
    type: "Test",
  }

const mockChange = jest.fn((evt) => {
    const {name, value} = evt.target;
    mockTask = { ...mockTask, [name]: value}
})

const MockTask = ({ mock }) => {
    return (
        <BrowserRouter>
            <Task task={mock}/>
        </BrowserRouter>
    )
}

describe("Task", () => {
    it('should render text with values', async () =>{
        const { rerender } = render(<MockTask mock={mockTask}/>);
    });
    expect(screen.getByDisplayValue('Testing Task')).toHaveAttribute('name');
    expect(screen.getByDisplayValue('Some Description')).toHaveAttribute('description');
    expect(screen.getByDisplayValue('Test')).toHaveAttribute('type');
});