import { useState } from 'react'
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewTaskPage from '../NewTaskPage/NewTaskPage';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import TasksPage from '../TasksPage/TasksPage';

import { Routes, Route } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(getUser())
  return (
    <>
      <header>
        {user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path='task/new' element={<NewTaskPage />} />
              <Route path='tasks/' element={<TasksPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
        }
      </header>
    </>
  );
}


