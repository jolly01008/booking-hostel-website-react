import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";


function App() {
  return (
    <div className="App">
        <h5> TEST </h5>
        <BrowserRouter>
          <Routes>
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="hostels" element={<HomePage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
