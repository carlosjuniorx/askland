import { BrowserRouter,Routes ,Route } from "react-router-dom";
import AuthContextProvider from './contexts/AuthContexts';
import AdminRoom from "./pages/AdminRoom";

import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";
import Room from "./pages/Room";

export default function App() {
  

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/news" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<Room />} />

          <Route path="/admin/rooms/:id" element={<AdminRoom/>}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

