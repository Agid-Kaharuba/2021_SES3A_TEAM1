import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from './profile';
import ChangePasswordDialog from './changePswDialog';
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect";

let mockEmployee = {
  firstname: "John",
  lastname: "Smith",
  staffid: "001",
  email: "JohnSmith@email.com",
  password: "",
  newPassword: "",
  confirmPassword: ""
}

const mockChange = jest.fn((evt) => {
  const { name, value } = evt.target;
  mockEmployee = { ...mockEmployee, [name]: value }
})

const MockDialog = ({ mock }) => {
  return (
    <BrowserRouter>
      <ChangePasswordDialog open={true} employee={mock} />
    </BrowserRouter>
  )
}

const MockProfile = ({ mock }) => {
  const image = { data: "https://i.pinimg.com/236x/1f/25/5d/1f255d7f9cf3afe7cd9cd97626d08fbf.jpg" }
  return (
    <BrowserRouter>
      <Profile image={image} employee={mock}></Profile>
    </BrowserRouter>
  )
}

describe("Profile", () => {
  it('should render textField with input value', async () => {
    const { rerender } = render(<MockProfile mock={mockEmployee} />);

    expect(screen.getByDisplayValue('John')).toHaveAttribute('name', 'firstname');
    expect(screen.getByDisplayValue('Smith')).toHaveAttribute('name', 'lastname');
    expect(screen.getByDisplayValue('001')).toHaveAttribute('name', 'staffid');
    expect(screen.getByDisplayValue('JohnSmith@email.com')).toHaveAttribute('name', 'email');
  });

  it('should be able to change input value', async () => {
    const { rerender } = render(<MockProfile mock={mockEmployee} />);

    const inputElmFirstName = screen.getByTestId('inputFirstName').querySelector('input');
    const inputElmLastName = screen.getByTestId('inputLastName').querySelector('input');
    const inputElmStaffId = screen.getByTestId('inputStaffId').querySelector('input');
    const inputElmEmail = screen.getByTestId('inputEmail').querySelector('input');
    inputElmFirstName.onchange = evt => mockChange(evt);
    inputElmLastName.onchange = evt => mockChange(evt);
    inputElmStaffId.onchange = evt => mockChange(evt);
    inputElmEmail.onchange = evt => mockChange(evt);
    fireEvent.change(inputElmFirstName, { target: { value: 'Giorgio' } });
    fireEvent.change(inputElmLastName, { target: { value: 'Williams' } });
    fireEvent.change(inputElmStaffId, { target: { value: '002' } });
    fireEvent.change(inputElmEmail, { target: { value: 'GiorgioWilliams@email.com' } });

    rerender(<MockProfile mock={mockEmployee} />);

    expect(mockChange).toBeCalledTimes(4);
    expect(inputElmFirstName.value).toEqual('Giorgio');
    expect(inputElmLastName.value).toEqual('Williams');
    expect(inputElmStaffId.value).toEqual('002');
    expect(inputElmEmail.value).toEqual('GiorgioWilliams@email.com');
  });

  it('should not render dialog by default', async () => {
    const { rerender } = render(<MockProfile mock={mockEmployee} />);

    const dialogElm = screen.getByTestId('dialogChangePsw');

    expect(dialogElm).toBeEmpty();
  });

  it('should call handleDialogOpen function if change password button is clicked', async () => {
    const { rerender } = render(<MockProfile mock={mockEmployee} />);

    const mockFn = jest.fn();
    const button = screen.getByTestId('btnChangePsw');
    button.onclick = () => mockFn();
    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalled();
  });

  it('should render change password dialog if open is true', async () => {
    const { rerender } = render(<MockDialog mock={mockEmployee} />)

    const dialogElm = screen.getByTestId('dialogTitle');

    expect(dialogElm).toHaveTextContent('Change Password');
  });

  it('should display helper text if new password not match with confirmed password', async () => {
    const { rerender } = render(<MockDialog mock={mockEmployee} />)

    const inputElmNewPsw = screen.getByTestId('inputNewPsw').querySelector('input');
    const inputElmCfmPsw = screen.getByTestId('inputCfmPsw').querySelector('input');
    inputElmNewPsw.onchange = evt => mockChange(evt);
    inputElmCfmPsw.onchange = evt => mockChange(evt);
    fireEvent.change(inputElmNewPsw, { target: { value: 'Pass001' } });
    fireEvent.change(inputElmCfmPsw, { target: { value: 'Pass002' } });

    rerender(<MockDialog mock={mockEmployee} />)

    expect(screen.getByText('Password do not match')).toBeInTheDocument();
  });

  it('should call saveChange function if save button is clicked', async () => {
    const { rerender } = render(<MockProfile mock={mockEmployee} />);

    const mockFn = jest.fn();
    const button = screen.getByTestId('btnSave');
    button.onclick = () => mockFn();
    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalled();
  });
});