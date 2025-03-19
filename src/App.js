import React, { useEffect } from "react";
import axios from "axios";
import "./App.css"
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, useSearchParams, useLocation } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import Styles from "./Job-Portal/NaveBar/nav.module.css"

import Cancel from "./Job-Portal/img/icons8-cross-50.png"
import NavIcon from "./Job-Portal/img/icons8-menu-50.png"

import StudentLogin from "./Job-Portal/Login/StudLogin";
import EmployeeLogin from "./Job-Portal/Login/EmpLogin"
import NewRegistered from "./Job-Portal/Profile/NewRegistration";
import StuNewRegistered from "./Job-Portal/Profile/StudentRegistration";
import StudPrivate from "./Job-Portal/Private/OutletStud";
import PostedJobsbyEmp from "./Job-Portal/Jobs/mypostedjobs";
import BlogpostedByEmp from "./Job-Portal/Jobs/mypostedBlogs";
import PostedCareerJobs from "./Job-Portal/Jobs/myPostedCaereerjobs";
import EmpPrivate from "./Job-Portal/Private/OuletEmp";
import PostJobs from "./Job-Portal/PostJobs/postJobs";
import PostBlogs from "./Job-Portal/PostJobs/postBlogs";
import Jobs from "./Job-Portal/Jobs/AllJobs";
import Nav from "./Job-Portal/NaveBar/Nav";
import Jobdetails from "./Job-Portal/Jobs/AllJobdetails"
import Blogdetails from "./Job-Portal/Jobs/Blogdetail"
import Answerdetails from "./Job-Portal/Jobs/Answerdetails";
import CareerJobdetails from "./Job-Portal/Jobs/CareerJobdetails"
import Home from "./Job-Portal/Jobs/AllHomeJobs";
import StudentUpdateProfile from "./Job-Portal/Profile/StudentUpdateProfile";
import EmployeeUpdateProfile from "./Job-Portal/Profile/EmployeeUpdateProfile";
import StudentProfile from "./Job-Portal/Profile/StudentProfile";
import EmployeeProfile from "./Job-Portal/Profile/EmployeeProfile";
import UpdatePostedJobs from "./Job-Portal/PostJobs/updatePostedJobs";
import UpdateCareerPostedJobs from "./Job-Portal/PostJobs/updateCareerPostedJobs";
import UpdatePostedBlogs from "./Job-Portal/PostJobs/updatePostedBlogs";
import MyAppliedJobs from "./Job-Portal/Jobs/MyAppliedJobs"
import CareerAppliedJobs from "./Job-Portal/Jobs/MyCareerAppliedJobs"
import AppliedUserProfile from "./Job-Portal/AppliedUserProfile/AppliedUserProfile";
import CheckStudentProfiel from "./Job-Portal/Profile/CheckStudentProfiel";
import CheckEmpHalfProfile from "./Job-Portal/Profile/CheckEmpHalfProf";
// import SearchParams from "./Job-Portal/Login/SearchParams";
import SearchParams from "./Job-Portal/Login/SearchParams ";
import SearchParamsEmp from "./Job-Portal/Login/SearchParamsEmp";
import SearchParamsDub from "./Job-Portal/Login/SearchParamsDupStuD";
import SearchParamsDubEmp from "./Job-Portal/Login/SearchParamsDupEmp";
import CheckEmpProfileForAdmin from "./Job-Portal/Profile/CheckEmplProfileForAdmin";
import CheckStudentProfileForAdmin from "./Job-Portal/Profile/CheckStuForAdmin";
import CheckArchivedJobSeeker from "./Job-Portal/Profile/CheckArchivedStud";
import SearchCandidate from "./Job-Portal/AppliedUserProfile/SearchCandidat";
import SearchCandHome from "./Job-Portal/AppliedUserProfile/SearchCandHome";
import AllCareerJobs from "./Job-Portal/Jobs/AllCareerJobs";
import Blogs from "./Job-Portal/Jobs/AllBlogs";
import AboutUs from "./Job-Portal/AboutUs"
import Contact from "./Job-Portal/Contact"
import Services from "./Job-Portal/Services"
import TermsAndCondition from "./Job-Portal/TermsAndConditions"
import Footer from "./Job-Portal/Footer/Footer";
import socketIO from 'socket.io-client';
import SidebarNav from "./Job-Portal/BigSideNav";
import useScreenSize from '../src/Job-Portal/SizeHook';
import AskQuestion from "./Job-Portal/PostJobs/postQuesion";

axios.defaults.baseURL = "https://itwalkin-backend-testrelease-2-0-1-0824-ns0g.onrender.com" // Render Test

function App() {

  const screenSize = useScreenSize();
  let size = screenSize.width;

  const [ShowSideNave, setShowSideNave] = useState(false)
   
  const [nopageFilter, setNoPageFilter] = useState(true)
   const [searchKey, setsearchKey] = useState()
   const [Filtereredjobs, setFiltereredjobs] = useState([])
   const [Result, setResult] = useState(false)
   const [Filterjobs, setFilterjobs] = useState([])
   const [jobs, setJobs] = useState([])
   const [count, setCount] = useState(1)
   const [Active, setActive] = useState([])
   const [jobTagsIds, setJobTagsIds] = useState([])
   const [PageLoader, setPageLoader] = useState(false)
   let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))
   const [recordsPerPage, setrecordsPerPage] = useState(recordsperpage ? recordsperpage : 10)
   const [currentPage, setCurrentPage] = useState(1)
   const [totalCount, settotalCount] = useState()

   const [FilCandidate, setFilCandidate] = useState([])
const [Candidate, setCandidate] = useState([])



 async function getAllJobSeekers() {
    setNoPageFilter(false)
    setActive([])
    setJobTagsIds([])

    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get(`/StudentProfile/getLimitJobs/${recordsPerPage}`, { params: { currentPage }, headers })

      .then((res) => {
        let result = (res.data)
        gettotalcount()
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCandidate(sortedate)
        setFilCandidate(sortedate)
      })
  }

  // ---------------home page search methods-------------------
  async function search(e) {
    setNoPageFilter(true)
    let key = e.target.value
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
  }

  async function getjobs() {
    setCount(1)
    setActive([])
    setJobTagsIds([])

    setPageLoader(true)
    setNoPageFilter(false)
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    // await axios.get("/jobpost/getHomejobs", { headers })
    await axios.get(`/jobpost/getLimitJobs/${recordsPerPage}`, { params: { currentPage }, headers })
      .then((res) => {
        let result = (res.data)
        gettotalcount()

        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      
        setJobs(sortedate)
        setFilterjobs(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        console.log(err)
        alert("some thing went wrong")
      })
  }

  async function searchIcon(key) {
    setNoPageFilter(true)
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
  }
// ------------home page search method ends------------------

// ------------blog page search method starts------------------
  async function searchBlog(e) {
    setNoPageFilter(true)
    let key = e.target.value
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getblogs()
      setResult(false)
    }
  }
  async function getblogs() {
    setCount(1)
    setActive([])
    setPageLoader(true)
    setNoPageFilter(false)
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/BlogRoutes/getAllBlogs", { headers })
      .then((res) => {
        let result = res.data
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        setFilterjobs(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }
  async function blogsearchIcon(key) {
    setNoPageFilter(true)
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getblogs()
      setResult(false)
    }
  }

  // ------------blog page search method ends---------------

  // ------------carrer page search method starts---------------
  async function searchcarrer(e) {
    setNoPageFilter(true)
    let key = e.target.value
    setsearchKey(key)

    setFiltereredjobs(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setJobs(filteredItems)
    } else {
      getcarrer()
      setResult(false)
    }
  }

  
  async function getcarrer() {
    setCount(1)
    setActive([])
    setJobTagsIds([])

    setPageLoader(true)
    setNoPageFilter(false)
   
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/Careerjobpost/getCareerjobs", { headers })
      .then((res) => {
        let result = (res.data)
        gettotalcount()

        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        setFilterjobs(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        alert("server issue occured")
      })
  }

  async function searchCarrerIcon(key) {
    setNoPageFilter(true)
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getcarrer()
      setResult(false)
    }
  }

  //  ----------------carrer home page search method ends---------------- 

//  ----------------employer home page search method starts---------------- 
  async function searchs(e) {
    let key = e.target.value
    setsearchKey(key)
    setFiltereredjobs(key)

    if (key) {
      setResult(true)
      let dubmyjobs = [...FilCandidate]

      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setCandidate(filteredItems)
    } else {
      getAllJobSeekers()
      setResult(false)

    }
  }

  // ---------------employer home page search method ends---------------

  // ---------------jobseeker home page search method starts---------------
  async function jobSeekersearch(e) {
    setNoPageFilter(true)
    let key = e.target.value
    setsearchKey(key)

    setFiltereredjobs(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setJobs(filteredItems)
    } else {
      getJobseekerjobs()
      setResult(false)
    }
  }
  async function getJobseekerjobs() {
    setCount(1)
    setActive([])
    setJobTagsIds([])
    setPageLoader(true)
    setNoPageFilter(false)

    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get("/jobpost/getjobs", { headers })
      .then((res) => {
        let result = (res.data)
        gettotalcount()

        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        setFilterjobs(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        alert("server issue occured")
      })
  }

  async function searchJobseekerIcon(key) {
    setNoPageFilter(true)
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getJobseekerjobs()
      setResult(false)
    }
  }

  // -----------------jobseeker home page search ends----------------


  async function gettotalcount() {
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/jobpost/getTotalCount", { headers })
      .then((res) => {
        // console.log(res.data.result)
        settotalCount(res.data.result)
      }).catch((err) => {
        alert("something went wrong")
      })
  }


const [searchClick, setSearchClick] = useState(false)
const [showMobileSearchIcon, setShowMobileSearchIcon]= useState(true)

  return (
    <>

      <BrowserRouter>
        <Nav jobSeekersearch={jobSeekersearch} searchBlog={searchBlog} searchcarrer={searchcarrer} setSearchClick={setSearchClick} showMobileSearchIcon={showMobileSearchIcon} 
        setShowMobileSearchIcon={setShowMobileSearchIcon} ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}   searchClick={searchClick}  chandinmargin={setShowSideNave} 
        search={search} searchKey={searchKey} searchIcon={searchIcon} searchs={searchs}/>
        
        <div style={ShowSideNave && screenSize.width > 850 ? { marginLeft: "210px", transition: " ease-in-out 0.6s" } : { marginLeft: "-3px", transition: " ease-in-out 0.5s" }}>
        {/* <div style={ShowSideNave && screenSize.width > 850 ? { marginLeft: "210px" } : { marginLeft: "-3px"}}> */}
      
          <Routes>

            <Route path="/" element={
              <Home 
              showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
              ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
              searchClick={searchClick} setSearchClick={setSearchClick}
              nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
              searchKey={searchKey} setsearchKey={setsearchKey}
              Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
              Result={Result} setResult={setResult}
              Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
              jobs={jobs} setJobs={setJobs}
              count={count} setCount={setCount}
              Active={Active} setActive={setActive}
              jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
              PageLoader={PageLoader} setPageLoader={setPageLoader}
              recordsperpage={recordsperpage}
              recordsPerPage={recordsPerPage} setrecordsPerPage={setrecordsPerPage}
              currentPage={currentPage} setCurrentPage={setCurrentPage}
              totalCount={totalCount} settotalCount={settotalCount}
              search={search}
              getjobs={getjobs}
              gettotalcount={gettotalcount}
              searchIcon={searchIcon}
              />
            } />
            <Route path="/Blogs" element={<Blogs 
            showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
            ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
            searchClick={searchClick} setSearchClick={setSearchClick} 
             nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
             searchKey={searchKey} setsearchKey={setsearchKey}
             Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
             Result={Result} setResult={setResult}
             Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
             jobs={jobs} setJobs={setJobs}
             count={count} setCount={setCount}
             Active={Active} setActive={setActive}
             jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
             PageLoader={PageLoader} setPageLoader={setPageLoader}
             recordsperpage={recordsperpage}
             recordsPerPage={recordsPerPage} setrecordsPerPage={setrecordsPerPage}
             currentPage={currentPage} setCurrentPage={setCurrentPage}
             totalCount={totalCount} settotalCount={settotalCount}
             search={search}
             getjobs={getjobs}
             gettotalcount={gettotalcount}
             searchIcon={searchIcon}
            />} />

              <Route path="/Updatepostedjobs" element={<UpdatePostedJobs url={axios.defaults.baseURL} />} />
            {/* ..........Employee Private component i,e can not search in URL......... */}
            <Route element={<EmpPrivate />}>
              <Route path="/PostJobs" element={<PostJobs url={axios.defaults.baseURL} />} />
              <Route path="/PostBlogs" element={<PostBlogs url={axios.defaults.baseURL} />} />
              <Route path="/postedjobs" element={<PostedJobsbyEmp url={axios.defaults.baseURL} />} />
              <Route path="/posted-Blogs" element={<BlogpostedByEmp url={axios.defaults.baseURL} />} />
              <Route path="/UpdatePosted-Blogs" element={<UpdatePostedBlogs url={axios.defaults.baseURL} />} />
              <Route path="/Applied-User-Profile/:jid" element={<AppliedUserProfile url={axios.defaults.baseURL} />} />
              <Route path="/Check-Profile/:CP" element={<CheckStudentProfiel url={axios.defaults.baseURL} />} />
              <Route path="/UpdateProfile" element={<EmployeeUpdateProfile url={axios.defaults.baseURL} />} />
              <Route path="/MyProfile" element={<EmployeeProfile url={axios.defaults.baseURL}/>} />
              {/* <Route path="Search-Candidate" element={<SearchCandidate url={axios.defaults.baseURL} */}
              <Route path="Search-Candidate" element={<SearchCandidate url={axios.defaults.baseURL}
         showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
         ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
         searchClick={searchClick} setSearchClick={setSearchClick}     
          nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
          searchKey={searchKey} setsearchKey={setsearchKey}
          Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
          Result={Result} setResult={setResult}
          Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
          jobs={jobs} setJobs={setJobs}
          count={count} setCount={setCount}
          Active={Active} setActive={setActive}
          jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
          PageLoader={PageLoader} setPageLoader={setPageLoader}
          recordsperpage={recordsperpage}
          recordsPerPage={recordsPerPage} setrecordsPerPage={setrecordsPerPage}
          currentPage={currentPage} setCurrentPage={setCurrentPage}
          totalCount={totalCount} settotalCount={settotalCount}
          searchs={searchs}
          getjobs={getjobs}
          gettotalcount={gettotalcount}
          searchIcon={searchIcon}
          FilCandidate={FilCandidate}
          setFilCandidate={setFilCandidate}
          getAllJobSeekers={getAllJobSeekers}
          Candidate={Candidate}
          setCandidate={setCandidate}
               />} />

            </Route>
            {/* ..........Jobseeker Private component i,e can not search in URL......... */}
            <Route element={<StudPrivate />}>
              <Route path="/alljobs" element={<Jobs url={axios.defaults.baseURL} 
               showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
               ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
               searchClick={searchClick} setSearchClick={setSearchClick}
              nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
              searchKey={searchKey} setsearchKey={setsearchKey}
              Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
              Result={Result} setResult={setResult}
              Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
              jobs={jobs} setJobs={setJobs}
              count={count} setCount={setCount}
              Active={Active} setActive={setActive}
              jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
              PageLoader={PageLoader} setPageLoader={setPageLoader}
              recordsperpage={recordsperpage}
              recordsPerPage={recordsPerPage} setrecordsPerPage={setrecordsPerPage}
              currentPage={currentPage} setCurrentPage={setCurrentPage}
              totalCount={totalCount} settotalCount={settotalCount}
              searchs={searchs}
              getjobs={getjobs}
              gettotalcount={gettotalcount}
              searchIcon={searchIcon}
              FilCandidate={FilCandidate}
              setFilCandidate={setFilCandidate}
              getAllJobSeekers={getAllJobSeekers}
              Candidate={Candidate}
              setCandidate={setCandidate}
              />} />
              <Route path="/AskQuestion" element={<AskQuestion  />} />
              <Route path="/Update-Profile" element={<StudentUpdateProfile url={axios.defaults.baseURL} />} />
              <Route path="/My-Profile" element={<StudentProfile />} />
              <Route path="/My-Applied-Jobs" element={<MyAppliedJobs url={axios.defaults.baseURL} />} />
              <Route path="/MyCareer-Applied-Jobs" element={<CareerAppliedJobs url={axios.defaults.baseURL} />} />
            </Route>
            <Route path="/AllCareerJobs" element={<AllCareerJobs 
            showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
            ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
            searchClick={searchClick} setSearchClick={setSearchClick}
            nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
            searchKey={searchKey} setsearchKey={setsearchKey}
            Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
            Result={Result} setResult={setResult}
            Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
            jobs={jobs} setJobs={setJobs}
            count={count} setCount={setCount}
            Active={Active} setActive={setActive}
            jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
            PageLoader={PageLoader} setPageLoader={setPageLoader}
            recordsperpage={recordsperpage}
            recordsPerPage={recordsPerPage} setrecordsPerPage={setrecordsPerPage}
            currentPage={currentPage} setCurrentPage={setCurrentPage}
            totalCount={totalCount} settotalCount={settotalCount}
            search={search}
            getjobs={getjobs}
            gettotalcount={gettotalcount}
            searchIcon={searchIcon}
            />} />
            <Route path="/JobSeekerLogin" element={<StudentLogin />} />
            <Route path="/New-Registration" element={<NewRegistered />} />
            <Route path="/Jobseeker-New-Registration" element={<StuNewRegistered />} />
            <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
            <Route path="/JobDetails/:id" element={<Jobdetails />} />
            <Route path="/Blogdetails/:id" element={<Blogdetails />} />
            <Route path="/Answerdetails/:id" element={<Answerdetails />} />
            <Route path="/CareerJobdetails/:id" element={<CareerJobdetails />} />
            <Route path="/CheckEmpHalfProfile/:empId" element={<CheckEmpHalfProfile />} />

            <Route path="/Search-Candidate-Home" element={<SearchCandHome url={axios.defaults.baseURL} />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/TermsAndCondition" element={<TermsAndCondition />} />

            <Route path="*" element={<h2 style={{ marginLeft: "43%", marginTop: "10%", color: " rgb(40, 4, 99)" }}>Page Not Found</h2>} />

          </Routes>


        </div>
      
      </BrowserRouter>
    </>
  );
}

export default App

