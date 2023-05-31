import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/Home";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreatePost from "./Components/CreatePost";
import Postpage from "./Pages/Postpage";
import Editpost from "./Pages/Editpost";
import { UserContextProvider } from "./Components/Context";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<Postpage />} />
          <Route path="edit/:id" element={<Editpost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
