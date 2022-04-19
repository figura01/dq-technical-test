import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import { App } from "./App";
import Home from './pages/Home'
import Users from './pages/users/Users'
import User from './pages/users/User';
import NewUser from './pages/users/NewUser'
import EditUser from './pages/users/EditUser'

import Teams from './pages/teams/Teams'
import Team from './pages/teams/Team';
import NewTeam from './pages/teams/NewTeam'
import EditTeam from './pages/teams/EditTeam'

import NoMatch from './pages/NoMatch';

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />}>
          <Route path="create" element={<NewUser />} />
          <Route path=":userId" element={<User />} />
          <Route path=":userId/edit" element={<EditUser />} />
        </Route>

        <Route path="teams" element={<Teams />}>
          <Route path="create" element={<NewTeam />} />
          <Route path=":teamId" element={<Team />} />
          <Route path=":teamId/edit" element={<EditTeam />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </BrowserRouter>, 
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
