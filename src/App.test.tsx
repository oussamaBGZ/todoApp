import { fireEvent, getByPlaceholderText, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';

describe('todo', () => {

  beforeEach(() => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your todo/i),
      { target: { value: 'test' } }
    );
    fireEvent.click(screen.getByText(/add/i));
  })

  test('check if todo is added', async () => {
    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
    })
  });

  test('check if todo is removed', async () => {
    await waitFor(async () => {
      const element = screen.getByText(/test/i)
      fireEvent.click(within(element).getByRole('button'));
      await waitFor(() => expect(element).not.toBeInTheDocument())
    })
  });

  test('search and try to find a todo', async () => {
    const element = screen.getByPlaceholderText(/Search.../i)
    fireEvent.change(element, { target: { value: 'test' } });
    expect(screen.getByText("test")).toBeInTheDocument()
  })

  test('search and try not to find a todo', async () => {
    const element = screen.getByPlaceholderText(/Search.../i)
    fireEvent.change(element, { target: { value: 'test not found' } });
    expect(screen.queryByText("test not found")).not.toBeInTheDocument()
  })
  
})
