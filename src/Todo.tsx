import './Todo.css'
import { BrowserRouter } from 'react-router-dom';
import { ApiCountProvider } from './providers/apiCountProvider';
import { AppRouter } from './router/appRouter';


function Todo() {

  return (
  <ApiCountProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
  </ApiCountProvider>
  )
}

export default Todo