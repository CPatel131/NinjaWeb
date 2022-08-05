import React from 'react';
import '../App.css';
import Navbar from '../components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './';
import User from './user';
import Routes2 from './routes';
import Followers from './followers';

const Home2 = (props) => {
    return (
        <Router>
        <Navbar />
        <Routes>
            <Route path='/home' element={<Home data = {props.data}/>} />
            <Route path='/user' element={<User data = {props.data}/>} />
            <Route path='/routes' element={<Routes2 data = {props.data}/>} />
            <Route path='/followers' element={<Followers data = {props.data}/>} />
        </Routes>
        </Router>
    );
};
    
export default Home2;