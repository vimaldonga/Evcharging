import React from 'react';
import './App.css';
import Home from './component/Home';
import Signin from './component/Signin';
import Signup from './component/Signup';
import "./index.css";
import { Route, Routes } from 'react-router';
import Resetpassword from './component/Resetpassword';
import Recover from './component/Recover';
import Protection from './component/Protection';
import Student from './manuhome/student/Student';
import Profile from './manuhome/Profile';
import Wabhome from './component/Wabhome';
import Overview from './manuhome/Overview/Overview';
import Studentfees from './manuhome/student/Studentfees';
import Demo from "./manuhome/student/Demo";
import Reports from './manuhome/reports/Reports';
import Settelements from './manuhome/settelments/Settelments';
import View from './manuhome/settelments/View';
import Addgame from './manuhome/settelments/Addgame';
import Addstudentdetail from './manuhome/settelments/Addstudentdetail';


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Protection />}>
          <Route exact path="/" element={<Home />} >
            <Route index element={<Wabhome />} />
            <Route exact path="/profile" element={<Profile />}/>
            <Route exact path="/student" element={<Student />}/>
            <Route exact path="/overview" element={<Overview/>}/>
            <Route exact path="/studentfees" element={<Studentfees/>}/>
            <Route exact path="/demo" element={<Demo/>}/>
            <Route exact path='/reports' element={<Reports/>}/>
            <Route exact path='/settelements' element={<Settelements/>}/>
            <Route exact path='/view/:id' element={<View/>}/>
            <Route exact path='/addgame/:id' element={<Addgame/>}/>
            <Route exact path='/addstudentdetail/:id' element={<Addstudentdetail/>}/>
            

          </Route>
        </Route>
        <Route exact path="/signin" element={<Signin />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/resetpassword" element={<Resetpassword />}></Route>
        <Route exact path="/recover" element={<Recover />}></Route>


      </Routes>


    </>
  );
}

export default App;
