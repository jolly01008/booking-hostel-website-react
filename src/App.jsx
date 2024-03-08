import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
            <Route path="api/signin" element={<SignInPage />} />
            <Route path="api/signup" element={<SignUpPage />} />
            <Route path="api/hostels" element={<MainPage />} />
          </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
