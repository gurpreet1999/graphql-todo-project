
import './App.css';
import NavBar from './components/Navbar';

import { useRoutes } from 'react-router';
import { routes } from './routes';
function App() {
 const element = useRoutes(routes)
  return (
    <div>
      <NavBar />
      {element}
    </div>
  );
}

export default App;