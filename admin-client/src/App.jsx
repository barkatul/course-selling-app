import axios from "axios";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RecoilRoot, useSetRecoilState } from "recoil";
import AddCourse from "./components/AddCourse.jsx";
import Appbar from "./components/Appbar.jsx";
import Course from "./components/Course.jsx";
import Courses from "./components/Courses.jsx";
import { Landing } from "./components/Landing.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import { BASE_URL } from "./config.js";
import { userState } from "./store/atoms/user.js";

function App() {
  return (
    <RecoilRoot>
      <div style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee"
      }}>
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/addcourse"} element= {<AddCourse />}></Route>
            <Route path={"/course/:courseId"} element= {<Course />}></Route>
            <Route path={"/courses"} element= {<Courses />}></Route>
            <Route path={"/signin"} element= {<Signin />}></Route>
            <Route path={"/signup"} element= {<Signup />}></Route>
            <Route path={"/"} element= {<Landing />}></Route>
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async ( ) => {
    try{
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          "Authorization" : "Bearer " + localStorage.getItem("token")
        }
      })

      if(response.data.username){
        setUser({isLoading: false,
        userEmail: response.data.username})
      }
      else{
        setUser({
          isLoading: false,
          userEmail: null
        })
      }
    }
    catch(e){
      setUser({
        isLoading: false,
        userEmail: null
      })
    }
  };
  useEffect(() => {
    init();
  }, []);

  return <></>
}

export default App;