import React, { useRef } from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../Footer/Footer';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TailSpin, Puff } from "react-loader-spinner"
import location from "../img/icons8-location-20.png" 
import Swal from "sweetalert2";
import Styles from "./myPostedjobs.module.css"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import profileDp from "../img/user_3177440.png"
import "./Allobs.module.css"
import HTMLReactParser from 'html-react-parser'
import StProfile from "../Profile/StudentProfile"
import EMpProfile from "../Profile/EmployeeProfile"
import Down from '../img/icons8-down-button-24.png'
import Up from '../img/icons8-arrow-button-24.png'
import Linkedinlogo from '../img/linkedin-logo.png'
import Linkedin from '../img/linkedin.webp'
import Email from '../img/email.webp'
import Whatsapp from '../img/whatsapp.png'
import Share from '../img/share.jpg'


function Answerdetails(props) {
  
  let userid = JSON.parse(localStorage.getItem("StudId")) || JSON.parse(localStorage.getItem("EmpIdG"))

  const [CommentName, setCommentName] = useState("")
  const [CommentID, setCommentID] = useState()
  // const [shareClicked, setShareClicked] = useState(false)
  // let CommentName = atob(JSON.parse(localStorage.getItem("Snm")))
  const updateClick=()=>{
    setShareClicked((currenvalue)=>!currenvalue)
  }
  async function getProfile() {
    let userId = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userId +" "+ atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get(`/StudentProfile/getProfile/${userId}`, {headers})
        .then((res) => {
            let result = res.data.result
           
            setCommentName(result.name)
        }).catch((err) => {
            // alert("some thing went wrong")
        })
}
let empId = JSON.parse(localStorage.getItem("EmpIdG"))
async function getEmpProfile() {
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.get(`/EmpProfile/getProfile/${empId}`, {headers})
      .then((res) => {
          let result = res.data.result
          // console.log(result.name)
          setCommentName(result.name)
          // localStorage.setItem("Snm", JSON.stringify(btoa(result.name)))

      }).catch((err) => {
          // alert("some thing went wrong")
      })
}

useEffect(() => {
  if(empId){
    getEmpProfile()
  }else{
    getProfile()
  }
}, [])
  // let empId = JSON.parse(localStorage.getItem("EmpIdG"))
  const [jobdescription, setjobdescription] = useState([])
  const [jobseekerid, setjobSeekerId] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
const screenSize = useScreenSize();
const [Loader, setLoader] = useState(false)
  const [jobs, setJobs] = useState([])
  const [comments, setcomments] = useState({
    id:userid,
    name:"",
    comment:""
  })

  const [clickedJobId, setclickedJobId] = useState() //for single job loader

function changeComments(e){
  // setcomments(comments.comment=e.target.value)
    setcomments({ ...comments, comment: e.target.value, name:CommentName})
}


async function handleComment(){
  if(!userid){
    alert("you must login to comment on question")
    return false
  }
  if(!comments.comment){
    return false
  }
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.put(`/BlogRoutes/Addcomment/${atob(params.id)}`,{comments}, {headers})
  .then((res)=>{
    let result=res.data
    if(result==="success"){
      // setcomments("")
    setcomments({ ...comments, comment: ""})
      getjobs()
    }
  })
}

async function deletComment(id){  
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.put(`/BlogRoutes/deletComment/${atob(params.id)}`,{id}, {headers})
  .then((res)=>{
    let result=res.data
    if(result==="success"){
      // setcomments("")
    // setcomments({ ...comments, comment: ""})
      getjobs()
    }
  })
}


  const navigate = useNavigate()

  let params = useParams();

  async function getjobs() {
    
    const headers = { authorization: 'BlueItImpulseWalkinIn'};
    await axios.get(`/BlogRoutes/getjobs/${atob(params.id)}`, {headers})
      .then((res) => {
        let result = (res.data)
        // console.log(result)
        setJobs(result)
        setjobdescription(result.jobDescription)
        setjobSeekerId(result.jobSeekerId)
      })
  }

  useEffect(() => {
    getjobs()
  }, [])

  function goUp(){
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }
  function goDown(){
    window.scrollTo(50,5000000)

    }  
    
   
    const location = useLocation();
    const url = window.location.origin + location.pathname; // Dynamic URL
      // const url = "https://www.itwalkin.com/Blogs";
      // const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
     
     console.log("url",url);  
  const [shareClicked, setShareClicked] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef(null);
  const buttonRef = useRef(null);

  const updateClickStatus = () => {
    setShareClicked((prev) => !prev);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareRef.current && shareRef.current.contains(event.target)
      ) {
        return;
      }

      if (
        buttonRef.current && buttonRef.current.contains(event.target)
      ) {
        return;
      }

      setTimeout(() => {
        setShareClicked(false);
      }, 50);
    };

    if (shareClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareClicked]);
  
  return (
    <>
        
    {/* <div style={{display:"flex", marginTop:"20px"}}> */}
                            {/* <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} /> */}
             {/* <button style={{  color:"grey", marginTop:"10px", marginLeft:"8%", cursor:"pointer",}} 
             onClick={()=>{navigate(-1)}}>Back</button> */}
             {/* <button class={styles.jobdetailBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
              
    {/* </div> */}

      {screenSize.width>850 ?

        <>
    <div class={ styles.blogArrow} style={{display:"flex", height:"50px", alignItems:"center"}}>
           <h2 style={{fontSize:"25px",marginLeft:"120px", fontWeight:"800", marginTop:"-15px", marginBottom:"-15px"}}> Blogs  </h2>
          <img style={{marginLeft:"35%", height: "30px"}}  onClick={()=>{goDown()}} src={Down}/>
        </div>
        
    <div class={styles.readPageContainer}>
       <div class={styles.ReadPageBtnTitleContainer} style={{display:"flex"}}>
           {/* <button class={styles.readPageBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
           <button className={styles.readPageBackBtn} 
            onClick={() => {
               if (window.history.length > 1) {
                  navigate(-1);
                 } else {
                    navigate('/Blogs'); 
                  }
             }}>
                 Back
          </button>
          {console.log("history length",window.history.length)}

              <h1 style={{textAlign:"center", fontSize:"40px", whiteSpace:"no", marginTop:"10px",marginRight:"120px"}}>{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading..."}</h1>
           {/* <div style={{display:" flex",flexDirection:"column"}}> */}
           {/* <button style={{ marginRight:"4px"}}class={styles.readPageBackBtn} onClick={updateClick} >Share</button> */}
           {/* <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img  class={styles.linkedinLogoDesktop} src={Linkedinlogo} />
      </a> */}
      {/* </div> */}

    <div ref={buttonRef} onClick={updateClickStatus} style={{ marginRight: "4px" }} className={styles.shareBtn}>
  <i className="fa-solid fa-share" style={{ fontSize: "medium", cursor: "pointer" }}></i>
  <p style={{ margin: "0px",fontWeight:"400" }}>Share</p>
</div>

      {shareClicked && (
        <div ref={shareRef} class={styles.shareContainer}>
          <h1 style={{textAlign:"center",color:"white"}}>Share</h1>

          <div class={styles.shareButtonsContainer}>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} style={{borderRadius:"50%",height:"45px",backgroundColor:"white" }}></img>
            </a>

            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
            <img src={Whatsapp} style={{borderRadius:"50%", height:"46px",width:"48px"}}></img>
            </a>

            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Shared%20Link&body=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
            <img src={Email} style={{borderRadius:"70%", borderRadius:"50%", height:"45px",}}></img>
              </a>
          </div>

          <div className={styles.copyLinkContainer}>
            <input type="text" value={url} readOnly className={styles.urlInput} />
            <button onClick={copyToClipboard} className={styles.copyButton}>
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          <div onClick={() => setShareClicked(false)} className={styles.closeButton} style={{position:"absolute", top:"8px", right:"13px",fontSize:"20px", color:"white", cursor:"pointer"}}>X</div>
        </div>
      )}



      </div>    
              <div style={{marginLeft:"12px"}}>
                <span>Posted by {jobs.name}</span> |  
                <span> Posted on : {new Date(jobs.createdAt).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}</span> . 
              
     </div>
     {/* <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class={styles.linkedinLogoDesktop} src={Linkedinlogo} style={{visibility:shareClicked?"visible":"hidden"}}/>
      </a> */}



  <table style={{marginLeft:"6px", marginTop:"0px", width:"98.8%", borderCollapse: "collapse",border:"none"}}>         
  
  <tr style={{border:"none"}}>
    <td colSpan={2} style={{border:"none"}}>
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>

  </tr>
  </table>
  </div>
  <img style={{marginLeft:"50%",height:"30px",marginBottom:"20px" }}  onClick={()=>{goUp()}} src={Up}/>
          </>
          :
          <>
    <div id={styles.JobCardWrapper} >

              <>
              <div style={{display:"flex",marginLeft:"8px",marginTop:"25px",marginRight:"-6px",alignItems:"center", justifyContent:"space-between"}}>
      
              {/* <div class={styles.mobileReadTopbtnsContainer} style={{backgroundColor:"red"}}> */}
              {/* <button class={styles.readPageBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
              <button className={styles.jobdetailBackBtnMobile} 
            onClick={() => {
               if (window.history.length > 1) {
                  navigate(-1);
                 } else {
                    navigate('/Blogs'); 
                  }
             }}>
                 Back
          </button>
              <img style={{height:"30px"}}  onClick={()=>{goDown()}} src={Down}/>
              <div ref={buttonRef} onClick={updateClickStatus} style={{height:"35px", width:"76px"}} className={styles.shareBtnMobile}>
  <i className="fa-solid fa-share" style={{ fontSize: "medium", cursor: "pointer",marginLeft: "8px"}}></i>
  <p style={{fontWeight:"400" }}>Share</p>
</div>

      {shareClicked && (
        <div ref={shareRef} class={styles.shareContainerMob}>
          <h1 style={{textAlign:"center",color:"white"}}>Share</h1>

          <div class={styles.shareButtonsContainer} style={{marginTop:"16px"}}>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} style={{borderRadius:"50%",height:"45px",backgroundColor:"white" }}></img>
            </a>

            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
            <img src={Whatsapp} style={{borderRadius:"50%", height:"46px",width:"48px"}}></img>
            </a>

            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Shared%20Link&body=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
            <img src={Email} style={{borderRadius:"70%", borderRadius:"50%", height:"45px"}}></img>
              </a>
          </div>

          <div className={styles.copyLinkContainer} style={{marginTop:"16px"}}>
            <input type="text" value={url} readOnly className={styles.urlInput} />
            <button onClick={copyToClipboard} className={styles.copyButton}>
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          <div onClick={() => setShareClicked(false)} className={styles.closeButton} style={{position:"absolute", top:"8px", right:"13px",fontSize:"20px", color:"white", cursor:"pointer"}}>X</div>
        </div>
      )}
 </div>

         
              {/* <div style={{display:"flex",marginLeft:"20px"}}> */}
                 {/* <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class={styles.linkedinLogoMobile} src={Linkedinlogo} />
      </a> */}
                {/* <button  class={styles.readPageBackBtn} onClick={updateClick}>Share</button> */}
             
              {/* </div> */}
              {/* </div> */}
              {/* <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class={styles.linkedinLogoMobile} src={Linkedinlogo} style={{visibility:shareClicked?"visible":"hidden"}}/>
      </a> */}

                <div className={styles.JobCard} >
                <p className={`${styles.Date} ${styles.readPageDate}`}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p>
                <div className={styles.JobTitleDateWrapper}>
        <p className={styles.QuestionjobTitle} style={{fontSize:"26px", width:"100%" , marginTop:"2px"}}>{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading..."}</p>
        {/* <p className={styles.Date}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p> */}
        </div>
     
     <table style={{marginLeft:"6px", marginTop:"0px", width:"95.5%"}}>         
  
  <tr >
    <td colSpan={2} >
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>


  </tr>
  </table>  

                </div>
                <img style={{marginLeft:"50%",height:"30px",marginTop:"10px" }}  onClick={()=>{goUp()}} src={Up}/>
             
              </>

            </div>

          </>


              }
                          
        </>

  )
}

      export default Answerdetails