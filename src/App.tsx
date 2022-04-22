import { BrowserRouter,Routes ,Route } from "react-router-dom";
import AuthContextProvider from './contexts/AuthContexts';

import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";

export default function App() {
  

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/news" element={<NewRoom />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

