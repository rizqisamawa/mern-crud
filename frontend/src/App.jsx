import React from "react";
import { Routes, Route } from "react-router-dom";
import AddUsers from "./components/AddUsers";
import UsersList from "./components/UsersList";
import EditUsers from "./components/EditUsers";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="add" element={<AddUsers />} />
      <Route path="edit/:id" element={<EditUsers />} />
    </Routes>
  );
};

export default App;
