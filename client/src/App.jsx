
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import QuizPage from "./components/QuizPage/QuizPage";
import QuestionsPage from "./components/QuestionsPage/QuestionsPage";
import LayoutSelection from "./components/LayoutSelection/LayoutSelection";
import ImageSelection from "./components/ImageSelection/ImageSelection";
import VisionBoardPage from "./components/VisionBoardPage/VisionBoardPage";
import Register from './components/Register/Register';
import LoginPage from './components/LoginPage/LoginPage';
import CommunityHub from './components/CommunityHub/CommunityHub';
//import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/Navbar/NavBar';
import MakeItHappen from './components/MakeItHappen/MakeItHappen';
import ActionStep from './components/ActionStep/ActionStep';
import VisionBuddy from './components/VisionBuddy/VisionBuddy';
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/layout-selection" element={<LayoutSelection />} />
        <Route path="/image-selection" element={<ImageSelection />} />
        <Route path="/vision-board" element={<VisionBoardPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/communityhub" element={<CommunityHub />} />
        <Route path="/make-it-happen" element={<MakeItHappen />} />
        <Route path="/action-step" element={<ActionStep />} />
        <Route path="/visionbuddy" element={<VisionBuddy />} />
      
        
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/vision-board/:boardId" element={<VisionBoardPage />} /> */}
       
        
      </Routes>
    </Router>
  );
}

export default App;
