import { Routes, Route } from "react-router-dom";

import Authentication from "./UserAutheticate";
// import Banner from "../pages/Banner"
import { Books } from "./Books";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/book" element={<Books />} />
    </Routes>
  );
};
