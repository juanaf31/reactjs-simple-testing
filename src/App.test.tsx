import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer'

import {api} from './api'

const mockCreateItem = (api.createItem=jest.fn())

test('renders app component', () => {
  const { getByText, getByLabelText } = render(<App/>);

  getByText('Nusantech TODOs')
  getByLabelText('What you want to do?')
  getByText('Add #1')
  getByText('clear')
});

test('Add style when hover',()=>{
  const {getByTestId}=render(<App/>)

  const button = getByTestId('buttonSubmit')

  fireEvent.mouseEnter(button)
  expect(button).toHaveClass('hovered')
})

test('Remove style when mouse leave',()=>{
  const {getByTestId}=render(<App/>)

  const button = getByTestId('buttonSubmit')
  
  fireEvent.mouseLeave(button)
  expect(button).not.toHaveClass()
})

test('makes sure input value correct',()=>{
  const {getByLabelText}=render(<App/>)

  const input = getByLabelText('What you want to do?') as HTMLInputElement

  fireEvent.change(input, {target:{value:'go to school'}})

  expect(input.value).toBe('go to school')
  expect(input.value).not.toBe('go to schools')
})

test('allows user to add list',async ()=>{
  const todo = 'This is Todo'
  mockCreateItem.mockResolvedValueOnce({id:1,item:todo})
  
  const {getByText,getByLabelText, getByTestId}=render(<App/>)

  const input = getByLabelText('What you want to do?')
  const button = getByTestId('buttonSubmit')

  fireEvent.change(input,{target:{value:todo}})

  fireEvent.click(button)
  
  expect(mockCreateItem).toHaveBeenCalledTimes(1)
  expect(mockCreateItem).toHaveBeenCalledWith(
    "/item",
    {id:1,item:todo}
    )
    await waitFor(()=>getByText(todo))
  expect(button.textContent).toBe('Add #2')
})

test('allows user to clear list',()=>{
  const {getByText,getByLabelText, getByTestId}=render(<App/>)

  const input = getByLabelText('What you want to do?')
  const button = getByText('clear')
  const buttonSubmit = getByTestId('buttonSubmit')

  fireEvent.click(button)
  expect(input.textContent).toBe('')
  expect(buttonSubmit.textContent).toBe('Add #1')
})


test('button matches snapshot',()=>{
  const tree = renderer.create(<App/>).toJSON()
  expect(tree).toMatchSnapshot()
})