import React from 'react';
import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import api from './services/api';

function App() {

  const [devs, setDevs] = React.useState([]);
  
  React.useEffect(()=> {

    async function loadDevs() {

      const response = await api.get('/dev');
      setDevs(response.data);

    }

    loadDevs();

  },[]);

  async function handleSubmit(data) {

    const response = await api.post('/dev',data);
    setDevs([...devs, response.data]);

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastro</strong>
        <DevForm onSubmit={handleSubmit}/>
      </aside>
      <main>
        <ul>
          {devs.map((dev)=> (<DevItem key={dev._id} dev={dev}/>))}
        </ul>
      </main>
    </div>
  );

}

export default App;
