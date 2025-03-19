import React, { useEffect, useState } from 'react'
import Styles from "./nav.module.css"
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";


function SidebarNav(props) {
  const[show,setShow]=useState(false)
  let navigate = useNavigate()
  const [empHome, setEmpHome] = useState(false);
  const location = useLocation(); 
  // const[pathName,setPathName]=useState(location.pathname)
  // console.log("pathnameees",pathName)

  useEffect(() => {
    // console.log("Current Path:", location.pathname); 

    if (location.pathname === "/Search-Candidate") {
      setEmpHome(true);
    } else {
      setEmpHome(false); 
    }

    const inputField = document.querySelector(`.${Styles.blogInputboxsearch}`);
    if (inputField) {
      inputField.value = ""; 
      props.setShowMobileSearchIcon(true)
    }
  }, [location.pathname]); 

  return (
  <>
  
      <div  >
      {/* <p style={{marginLeft:"80%"}} onClick={()=>{props.setShowSideNaveProps((prev)=>!prev)}}> &#10005;</p> */}
      <div style={{ marginTop:"-15px", zIndex:1000}}>
      <div style={{display:"flex",marginTop:"10px",marginRight:"6px"}} >
            {/* <input style={{height:"18px",width:"84%",marginLeft:"2px"}}className={Styles.blogInputboxsearch}  type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { props.search(e) }} /> */}
            <input style={{height:"18px",width:"84%",marginLeft:"2px"}}className={Styles.blogInputboxsearch}  type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => {  
                                                                                                                                                                            if(empHome)
                                                                                                                                                                                props.searchs(e)
                                                                                                                                                                             else if(location.pathname==="/Blogs"){
                                                                                                                                                                                  props.searchBlog(e)
                                                                                                                                                                                  console.log("s-screen blogs entered")          
                                                                                                                                                                              }
                                                                                                                                                                             else if(location.pathname==="/AllCareerJobs"){
                                                                                                                                                                              props.searchcarrer(e)
                                                                                                                                                                              console.log(" s-screen carrer entered")          
                                                                                                                                                                             }
                                                                                                                                                                             else if(location.pathname==="/alljobs"){
                                                                                                                                                                              props.jobSeekersearch(e)
                                                                                                                                                                              console.log("s-screen jobseeker home entered") 
                                                                                                                                                                             }
                                                                                                                                                                             
                                                                                                                                                                             else{
                                                                                                                                                                              props.search(e)
                                                                                                                                                                              console.log("s-screen else entered")   
                                                                                                                                                                             } }} />
           
            <i style={{marginLeft:"2px",fontSize:"16px",marginTop:"6px"}} class="fa fa-search" onClick={() => { props.searchIcon(props.searchKey);props.setShowSideNaveProps();props.setShowMobileSearchIcon(true)}}></i>
          </div>
        <p onClick={()=>{navigate("/"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Home </p>
        <p onClick={()=>{setShow(prev=>!prev)}} className={`${Styles.textinMobileSodeBar} `}>Open an account
       {
        show?
        <i  className={`${Styles.arrow} ${Styles.down}`} ></i>
        :
        <i  className={`${Styles.arrow} ${Styles.up}`} ></i>     
       }
        </p>
       {
        show?
        <div style={{marginLeft:"10px"}}>
<p onClick={() => { navigate("/New-Registration");props.setShowSideNaveProps(false);setShow(false); window.scrollTo({top:0}) }} className={`${Styles.textinMobileSodeBar} `}>Employer Registration </p>
<p onClick={() => { navigate("/Jobseeker-New-Registration");props.setShowSideNaveProps(false);setShow(false); window.scrollTo({top:0}) }}className={`${Styles.textinMobileSodeBar} `} >Job Seeker Registration</p>
        </div>
        :""
       }
        <p onClick={()=>{navigate("/Blogs"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Blogs </p>
        <p onClick={()=>{navigate("/AllCareerJobs"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>ITwalkin Career</p>
        <p  className={`${Styles.textinMobileSodeBar} `} style={{color:"grey"}}>Walkin Drive</p>
        <p onClick={()=>{navigate("/AboutUs"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>About Us</p>
        <p onClick={()=>{navigate("/Services"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Our Services</p>
        <p onClick={()=>{navigate("/Contact"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Contact Us</p>
       
        <p onClick={()=>{navigate("/TermsAndCondition"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Terms & Conditions</p>
        </div>
      </div>
      </>
  )
}

export default SidebarNav