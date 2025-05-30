import React, { useState, useEffect, useRef } from 'react';
import CompanyLogo from '../img/company-logo.png'
import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Puff } from 'react-loader-spinner'
import location from "../img/icons8-location-20.png"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
// import {SwipeableViews} from 'react-swipeable-views-v18';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../Footer/Footer';
import { jobTags } from '../Tags'
import HTMLReactParser from 'html-react-parser'

const options = [
  { value: "Bangalore", label: "Bangalore,India", img:location},
  { value: "City Food Centre", label: "City Food Centre", img:location},
  { value: "Top in Town Super Market", label: "Top in Town Super Market", img:location},
  { value: "Mano Supermarket", label: "Mano Supermarket", img:location},
  { value: "Sagar Super Bazaar", label: "Sagar Super Bazaar", img:location},
  { value: "Carrymart Super Market", label: "Carrymart Super Market", img:  location},
  { value: "A to z Mart", label: "A to z Mart", img:location},
  
  
];
const products = [
  {
    id: 1,
    name: 'Atta & Other',
    weight: '5 kg',
    price: 300,
    originalPrice: 500,
    discount: 15,
    image: 'aata.png',
  },
  {
    id: 2,
    name: 'Dals & Pules',
    weight: '500 g',
    price: 100,
    originalPrice: 200,
    discount: 13,
    image: 'Dals.png',
  },
  {
    id: 3,
    name: 'Rice & More',
    weight:'5kg',
    price: 350,
    originalPrice: 400,
    discount: 16,
    image: 'Rice.png'
  },
  {
    id: 4,
    name: 'Seasonal Picks',
    weight: '500 g',
    price: 42,
    originalPrice: 51,
    discount: 17,
    image: 'seasonal.png',
  },
  {
    id: 5,
    name: 'Oil',
    weight: '50 g',
    price: 180,
    originalPrice: 200,
    discount: 17,
    image: 'Oil.png'
  },
  {
    id: 6,
    name: 'Exotics & Premium',
    weight: '600 - 800 g',
    price: 500,
    originalPrice: 700,
    discount: 61,
    image: 'premium.png',
  },
  {
    id: 7,
    name: 'Cuts & Sprouts',
    weight: '600 - 800 g',
    price: 100,
    originalPrice: 150,
    discount: 61,
    image: 'sprouts.png'
  },
];

const attas = [
 {
    id: 1,
    name: 'Aashirwad',
    weight: '500 g',
    price: 100,
    originalPrice: 200,
    discount: 13,
    image: '/images/aata.png',
  },
  {
    id: 2,
    name: 'Patanjali',
    weight: '5 kg',
    price: 100,
    originalPrice: 200,
    discount: 13,
    image: '/images/patanjali.png',
  },
  {
    id: 3,
    name: 'Fortune',
    weight:'5kg',
    price: 350,
    originalPrice: 400,
    discount: 16,
    image: '/images/Fortune.png',
  },
  {
    id: 4,
    name: 'Shakti Bhog',
    weight: '5 kg',
    price: 42,
    originalPrice: 51,
    discount: 17,
    image: '/images/ShaktiBhog.png',
  },
  {
    id: 5,
    name: 'Rajdhani',
    weight: '5 kg',
    price: 180,
    originalPrice: 200,
    discount: 17,
    image: '/images/rajdhani.png',
  },
  {
    id: 6,
    name: '24 Mantra Organic',
    weight: '5 kg',
    price: 500,
    originalPrice: 700,
    discount: 61,
    image: '/images/Mantra.webp',
  },
  {
    id: 7,
    name: 'Silver coin',
    weight: '5 kg',
    price: 535,
    originalPrice: 150,
    discount: 61,
    image: '/images/silver coin.jpg',
  },
];

const Dals = [
  {
    id: 1,
    name: ' Unpolished MoongDal',
    weight: ' 1 kg',
    price: 190,
    originalPrice: 238,
    discount: 20,
    image: '/images/Dals.png',
  },
  {
    id: 2,
    name: 'Fortune Arhar Dal',
    weight: '1 kg',
    price: 88,
    originalPrice: 100,
    discount: 12,
    image: '/images/Fortune daal.jpg',
  },
  {
    id: 3,
    name: '24 Mantra Organic',
    weight:'5kg',
    price: 350,
    originalPrice: 400,
    discount: 16,
    image: '/images/mantra daal.webp',
  },
  {
    id: 4,
    name: 'Rajma',
    weight: '908 g',
    price: 250,
    originalPrice: 295,
    discount: 15,
    image: '/images/Rajma Red.webp',
  },
  {
    id: 5,
    name: ' Patanjali Chana Dal',
    weight: '1 kg',
    price: 70,
    originalPrice: 78,
    discount: 10,
    image: '/images/patanjaliDaal.png',
  },
  {
    id: 6,
    name: 'Natureland Organic ',
    weight: '500 g',
    price: 160,
    originalPrice: 188,
    discount: 15,
    image: '/images/NatureDall.png',
  },
  {
    id: 7,
    name: ' BB Popular Moong Dal',
    weight: '1 kg',
    price: 125,
    originalPrice: 147,
    discount: 15,
    image: '/images/BBdaal.png',
  },
];




const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 14
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};



function Home({nopageFilter,setNoPageFilter,searchKey, setsearchKey,Filtereredjobs, setFiltereredjobs
  ,Result,setResult,Filterjobs, setFilterjobs,jobs, setJobs,count,setCount, Active,setActive,
  jobTagsIds,setJobTagsIds,PageLoader,setPageLoader,recordsperpage,recordsPerPage, setrecordsPerPage,
  currentPage,setCurrentPage,totalCount,settotalCount,search,getjobs,gettotalcount,searchIcon
  ,searchClick,setSearchClick,ShowSideNave,setShowSideNave,showMobileSearchIcon,setShowMobileSearchIcon
}) {

  // const [jobs, setJobs] = useState([])
  // const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  // const [nopageFilter, setNoPageFilter] = useState(true)
  // const [Filtereredjobs, setFiltereredjobs] = useState([])
  

  // const [Filterjobs, setFilterjobs] = useState([])

  const [isReadMore, setIsReadMore] = useState(true)
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  // const [PageLoader, setPageLoader] = useState(false)
  // const [Result, setResult] = useState(false)
  const [NotFound, setNotFound] = useState("")
  // const [Active, setActive] = useState([])
  const screenSize = useScreenSize();

  let JobLocationTags = ["Bangalore"]

  let navigate = useNavigate()

  let adminLogin = localStorage.getItem("AdMLog")

  useEffect(() => {
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {
      navigate("/Search-Candidate")
    }
  }, [])

  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  }, [])




  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  // const [totalCount, settotalCount] = useState()
  // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))

  // const [currentPage, setCurrentPage] = useState(1)
  // const [recordsPerPage, setrecordsPerPage] = useState(recordsperpage ? recordsperpage : 10)
  const[jobsPerPageValue,setJobsPerPageValue]=useState(10);


  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //5
  const records = jobs.slice(firstIndex, lastIndex)//0,5

  const npage = Math.ceil(totalCount / recordsPerPage) // last page
  

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

  useEffect(() => {
    if (jobTagsIds.length < 1) {
      getjobs()
    } else {
      getTagId();
    }
  }, [currentPage, recordsPerPage])



  async function applyforJob(id) {
    navigate("/JobSeekerLogin", { state: { Jid: id } })
   
  }
  async function applyforOtherJob(Link) {
    
    window.open(`${Link}`)
  }


  // const [searchKey, setsearchKey] = useState()
  // const [jobs, setJobs] = useState([])  
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

  function sortbyOldjobs() {
    let newjob = [...jobs]
    let oldjobSort = newjob.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setJobs(oldjobSort)
  }

  function sortbyNewjobs() {

    let newjob = [...jobs]
    let newjobSort = newjob.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setJobs(newjobSort)
  }


  function SdescendingOrder() {
    let newJobs = [...jobs]
  
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJobs.sort((a, b) => {
      return collator.compare(b.salaryRange, a.salaryRange)
    })
    setJobs(sorted)
  }

  function SascendingOrder() {
    let newJObs = [...jobs]
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJObs.sort((a, b) => {
      return collator.compare(a.salaryRange, b.salaryRange)
    })
    setJobs(sorted)
  }

  function EdescendingOrder() {
    let newjob = [...jobs]
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.experiance, a.experiance)
    })
    setJobs(sorted)

  }

  function EascendingOrder() {
    let newjob = [...jobs]
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.experiance, b.experiance)
    })
    setJobs(sorted)
  }
  function checkEmpHalf(empId, e) {

    navigate(`/CheckEmpHalfProfile/${empId}`)

  }

  const [jobLocation, setjobLocation] = useState("AllL")
  const [jobTitle, setjobTitle] = useState("")
  
  async function getjobTitleAll(all) {
    await axios.get("/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }
  async function getjobsAllLoc(all) {
    await axios.get("/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
      })
  }

  async function JobtitleFilter(jobTitle) {
    await axios.get(`/jobpost/getjobTitle/${jobTitle}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }
  async function getBothFiltered(jobTitle) {

    await axios.post(`/jobpost/getBothjobFilter/${jobLocation}`, { jobTitle })
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  function firstPage() {
    setCurrentPage(1)
  }

  function previous() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  function changeCurrent(id) {
    setCurrentPage(id)
  }
  function next() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }
  function last() {
    setCurrentPage(npage)
  }

  function handleRecordchange(e) {
    sessionStorage.setItem("recordsperpageHome", JSON.stringify(e.target.value));
    let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))
    setJobsPerPageValue(Number(e.target.value));
    setrecordsPerPage(recordsperpage)
    setCurrentPage(1)
  }

  // const [count, setCount] = useState(1)
  const [jobTagIds, setjobTagIds] = useState([])

  // const [jobTagsIds, setJobTagsIds] = useState([])


  useEffect(() => {
    if (jobTagsIds.length > 0) {
      getTagId();
    }
  }, [jobTagsIds])

  let ids = jobTagsIds.map((id) => {
    return (
      id._id
    )
  })
  const uniqueList = [...new Set(ids)];
  async function getTagId() {
    settotalCount(uniqueList.length)
    await axios.get(`/jobpost/jobTagsIds/${uniqueList}`, {
      params: { currentPage, recordsPerPage }
    })
      .then((res) => {
        
        let result = res.data
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        if (count == 2) {
          setCurrentPage(1)
        }

      })
  }

  useEffect(()=>{
    if(Active.length>0){
      changeTags()
    }
  },[Active])


  async function filterByJobTitle(key) {

    if (count == 1) {
      setJobs([])
    }
    setCount(prev => prev + 1)
    const isIndex = Active.findIndex((present) => {
      return (
        present === key
      )
    })
    if (isIndex < 0) {
      
      
      var updatedActive = [...Active, key]; 
      setActive(updatedActive);

    } else {
      const IndexId = Active.findIndex((present) => {
        return (
          present == key
        )
      })
      Active.splice(IndexId, 1)
      if (Active.length === 0) {
        getjobs()
        return false
      }
    
      changeTags()
    }}
    async function changeTags(key){
     

    setNoPageFilter(true)
    setFiltereredjobs(key)
    await axios.get(`/jobpost/getTagsJobs/${Active}`)
      .then((res) => {
        let result = (res.data)
        
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobTagsIds(sortedate)
        
      })
  }

  async function getLocation(jobLocation) {
    setCount(1)
    setActive(["Banglore"])
    setFiltereredjobs(jobLocation)
    setNoPageFilter(true)

    await axios.get(`/jobpost/getjobLocation/${jobLocation}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
      
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  const [checkBoxValue, setCheckBoxValue] = useState([])
  const [check, setCheck] = useState(true)

  async function ArchiveCheckBoxArray() {
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    await axios.delete(`/jobpost/ArchiveCheckBoxArray/${checkBoxValue}`, { headers })
      .then((res) => {
        if (res.data === "success") {
          getjobs()
          alert("Archived succesfully")
          window.location.reload()
        }
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }
  async function deleteCheckedJobs() {
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    await axios.delete(`/jobpost/deleteCheckBoxArray/${checkBoxValue}`, { headers })
      .then((res) => {
        if (res.data === "success") {
          getjobs()
          alert("deleted succesfully")
          window.location.reload()
        }
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  function checkBoxforDelete(id) {

    const checkedid = checkBoxValue.findIndex((checkedid) => {
      return (
        checkedid === id
      )
    })
    if (checkedid < 0) {
      setCheckBoxValue([...checkBoxValue, id])
    } else {
      
      let removeId = checkBoxValue.filter((foundId) => {
        return (
          foundId !== id
        )
      })
      setCheckBoxValue(removeId)
    }
  }
 

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const groceries = [
    { value: 'FRUITS & VEGETABLES', label: 'FRUITS & VEGETABLES' },
    { value: 'Apples', label: 'Apples' },
    { value: 'Bananas', label: 'Bananas' },
    { value: 'Oranges', label: 'Oranges' },
    { value: 'Tomatoes', label: 'Tomatoes' },
    { value: 'Potatoes', label: 'Potatoes' },
    { value: 'Onions', label: 'Onions' },
    { value: 'Carrots', label: 'Carrots' },
    { value: 'Spinach', label: 'Spinach' },
    { value: 'Broccoli', label: 'Broccoli' },
    { value: 'Garlic', label: 'Garlic' },
  
    { value: 'DAIRY PRODUCTS', label: 'DAIRY PRODUCTS' },
    { value: 'Milk', label: 'Milk' },
    { value: 'Cheese', label: 'Cheese' },
    { value: 'Yogurt', label: 'Yogurt' },
    { value: 'Butter', label: 'Butter' },
    { value: 'Paneer', label: 'Paneer' },
  
    { value: 'GRAINS & CEREALS', label: 'GRAINS & CEREALS' },
    { value: 'Rice', label: 'Rice' },
    { value: 'Wheat Flour', label: 'Wheat Flour' },
    { value: 'Oats', label: 'Oats' },
    { value: 'Cornflakes', label: 'Cornflakes' },
    { value: 'Poha', label: 'Poha' },
  
    { value: 'PULSES & LENTILS', label: 'PULSES & LENTILS' },
    { value: 'Toor Dal', label: 'Toor Dal' },
    { value: 'Moong Dal', label: 'Moong Dal' },
    { value: 'Chana Dal', label: 'Chana Dal' },
    { value: 'Rajma', label: 'Rajma' },
    { value: 'Kabuli Chana', label: 'Kabuli Chana' },
  
    { value: 'SPICES & CONDIMENTS', label: 'SPICES & CONDIMENTS' },
    { value: 'Turmeric Powder', label: 'Turmeric Powder' },
    { value: 'Red Chilli Powder', label: 'Red Chilli Powder' },
    { value: 'Cumin Seeds', label: 'Cumin Seeds' },
    { value: 'Coriander Powder', label: 'Coriander Powder' },
    { value: 'Garam Masala', label: 'Garam Masala' },
  
    { value: 'OILS & GHEE', label: 'OILS & GHEE' },
    { value: 'Sunflower Oil', label: 'Sunflower Oil' },
    { value: 'Mustard Oil', label: 'Mustard Oil' },
    { value: 'Olive Oil', label: 'Olive Oil' },
    { value: 'Ghee', label: 'Ghee' },
  
    { value: 'BAKERY & SNACKS', label: 'BAKERY & SNACKS' },
    { value: 'Bread', label: 'Bread' },
    { value: 'Biscuits', label: 'Biscuits' },
    { value: 'Chips', label: 'Chips' },
    { value: 'Noodles', label: 'Noodles' },
    { value: 'Pasta', label: 'Pasta' },
  
    { value: 'BEVERAGES', label: 'BEVERAGES' },
    { value: 'Tea', label: 'Tea' },
    { value: 'Coffee', label: 'Coffee' },
    { value: 'Green Tea', label: 'Green Tea' },
    { value: 'Soft Drinks', label: 'Soft Drinks' },
    { value: 'Juices', label: 'Juices' },
  
    { value: 'MEAT & SEAFOOD', label: 'MEAT & SEAFOOD' },
    { value: 'Chicken', label: 'Chicken' },
    { value: 'Fish', label: 'Fish' },
    { value: 'Eggs', label: 'Eggs' },
    { value: 'Mutton', label: 'Mutton' },
  
    { value: 'FROZEN & READY-TO-EAT', label: 'FROZEN & READY-TO-EAT' },
    { value: 'Frozen Peas', label: 'Frozen Peas' },
    { value: 'Frozen French Fries', label: 'Frozen French Fries' },
    { value: 'Instant Noodles', label: 'Instant Noodles' },
    { value: 'Ready-to-Cook Parathas', label: 'Ready-to-Cook Parathas' },
    
  ];
  
  console.log(groceries);
  
  //  const[searchClick,setSearchClick]=useState(false)
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollRef3 = useRef(null);
  const scrollRef4 = useRef(null);
  const scrollRef5 = useRef(null);
  const scrollRef6 = useRef(null);
  const scrollRef7 = useRef(null);

  
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <>
      {screenSize.width > 850 ?

        <>
          <div className={adminLogin ? styles.HomeNavConetenetWrapperAdmin : styles.HomeNavConetenetWrapper}>
            <div className={styles.LocationFilterWrapper}>
              {/* {
                JobLocationTags.map((location, i) => {
                  return (
                    <> */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
      
      <div style={{ display: "flex", marginLeft: "-40px", marginTop: "-5px" }}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#007bff",
            marginTop:"-4px"
          }}
        >
          <img className={styles.jobLocationImage} src={location} alt="Location" />
        </button>
        <p style={{ marginTop: "17px", fontWeight: "bold", color: "white" }}>
          {selectedOption?.label}
        </p>
      </div>

     
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            left: "-43px",
            background: "white",
            color: "black",
            borderRadius: "20px",
            width: "160px",
            padding: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
         
          <div
            style={{
              position: "absolute",
              top: "-9px",
              left: "25px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid white",
            }}
          ></div>

        
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={option.img}
                  alt={option.label}
                  style={{ width: "22px", height: "22px", marginRight: "12px" }}
                />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

            </div>
           
          </div>
         
        </>
        : ""
      }
      {/* <h1>Nikita is working on this development</h1> */}
      {checkBoxValue.length > 0 ?
        <>
          <button style={{
            backgroundColor: "blue", border: "none", color: "white",
            padding: "5px 10px", fontWeight: "bold", cursor: "pointer"
          }} onClick={() => { ArchiveCheckBoxArray() }}>Archive</button>

          <button style={{
            backgroundColor: "red", border: "none", color: "white", marginLeft: "5px",
            padding: "5px 10px", fontWeight: "bold", cursor: "pointer"
          }} onClick={() => { deleteCheckedJobs() }}>Delete</button>
        </>
        : ""
      }

      {screenSize.width > 850 ?
        <>
         


          <div className={styles.JobtitleFilterWrapper}>
                       {console.log(jobTags)}
            <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "0px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
            <buton className={Active.length === 0 ? styles.active : styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
 
  {groceries.map((tags, i) => {
    return (
      <button
        disabled={
          tags.value === "FRUITS & VEGETABLES" || tags.value === "DAIRY PRODUCTS" ||
          tags.value === "GRAINS & CEREALS" || tags.value === "PULSES & LENTILS" ||
          tags.value === "SPICES & CONDIMENTS" || tags.value === "OILS & GHEE" ||
          tags.value === "BAKERY & SNACKS" || tags.value === "BEVERAGES" ||
          tags.value === "MEAT & SEAFOOD" || tags.value === "FROZEN & READY-TO-EAT"
        }
        style={{
          display: "inline-block",
          fontSize: "10px", // Increased text size
          padding: "6px 10px", // Reduced padding
          borderRadius: "5px", // Slightly rounded corners
          ...(
            tags.value === "FRUITS & VEGETABLES" ? { backgroundColor: "rgb(147 48 163)", color: "#fff" } :
            tags.value === "DAIRY PRODUCTS" ? { backgroundColor: "rgb(72 150 219)", color: "#fff" } :
            tags.value === "GRAINS & CEREALS" ? { backgroundColor: "rgb(67 57 143)", color: "#fff" } :
            tags.value === "PULSES & LENTILS" ? { backgroundColor: "rgb(40 165 149)", color: "#fff" } :
            tags.value === "SPICES & CONDIMENTS" ? { backgroundColor: "#ffb74d", color: "#000" } :
            tags.value === "OILS & GHEE" ? { backgroundColor: "#ffd54f", color: "#000" } :
            tags.value === "BAKERY & SNACKS" ? { backgroundColor: "#f8bbd0", color: "#000" } :
            tags.value === "BEVERAGES" ? { backgroundColor: "#b3e5fc", color: "#000" } :
            tags.value === "MEAT & SEAFOOD" ? { backgroundColor: "#ef9a9a", color: "#000" } :
            tags.value === "FROZEN & READY-TO-EAT" ? { backgroundColor: "#bdbdbd", color: "#000" } :
            {}
          )
        }}
        className={
          tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || 
          tags.value === "NOTICE PERIOD" || tags.value === "SALARY" || tags.value === "EXPERIENCE" || 
          tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || 
          tags.value === "COMPANY TYPE" || tags.value === "ROLE"
            ? styles.TagHeading
            : Active.findIndex((present) => present === tags.value) >= 0
            ? styles.active
            : styles.JobtitleFilter
        }
        onClick={() => { filterByJobTitle(tags.value) }}
      >
        {tags.value}
      </button>
    );
  })}
</div>
</div>



{/* <div className={styles.container}>
  <h2 className={styles.header}>Product List</h2>
  <div className={styles.grid}>
    {products.map((product) => (
      <div key={product.id} className={styles.card}>
        <div className={styles.discount}>{product.discount}% Off</div>
        <img src={product.image} alt={product.name} className={styles.image} />
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.weight}>{product.weight}</p>
        <p className={styles.price}>
          ₹{product.price}{' '}
          <span className={styles.original}>₹{product.originalPrice}</span>
        </p>
        <button className={styles.button} onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    ))}
  </div>
</div> */}

{/* ------------------------first----------------- */}
<div className={styles.container}>
        <h2 className={styles.header}>Attas&more</h2>
        <div className={styles.wrapper}>
          <button className={styles.scrollBtn} onClick={() => scrollLeft(scrollRef1)}>
            &#8592;
          </button>
          <div className={styles.grid} ref={scrollRef1}>
            {attas.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.discount}>{product.discount}% Off</div>
                <img src={product.image} alt={product.name} className={styles.image} />
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.weight}>{product.weight}</p>
                <p className={styles.price}>
                  ₹{product.price}{' '}
                  <span className={styles.original}>₹{product.originalPrice}</span>
                </p>
                <button className={styles.button} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className={styles.scrollBtn} onClick={() => scrollRight(scrollRef1)}>
            &#8594;
          </button>
        </div>
      </div>

      {/* ------------------------second----------------- */}
      <div className={styles.container}>
        <h2 className={styles.header}>Dals & Pules</h2>
        <div className={styles.wrapper}>
          <button className={styles.scrollBtn} onClick={() => scrollLeft(scrollRef2)}>
            &#8592;
          </button>
          <div className={styles.grid} ref={scrollRef2}>
            {Dals.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.discount}>{product.discount}% Off</div>
                <img src={product.image} alt={product.name} className={styles.image} />
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.weight}>{product.weight}</p>
                <p className={styles.price}>
                  ₹{product.price}{' '}
                  <span className={styles.original}>₹{product.originalPrice}</span>
                </p>
                <button className={styles.button} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className={styles.scrollBtn} onClick={() => scrollRight(scrollRef2)}>
            &#8594;
          </button>
        </div>
      </div>


      {/* ------------------------third----------------- */}
      {/* <div className={styles.container}>
        <h2 className={styles.header}>Rice & More</h2>
        <div className={styles.wrapper}>
          <button className={styles.scrollBtn} onClick={() => scrollLeft(scrollRef3)}>
            &#8592;
          </button>
          <div className={styles.grid} ref={scrollRef3}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.discount}>{product.discount}% Off</div>
                <img src={product.image} alt={product.name} className={styles.image} />
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.weight}>{product.weight}</p>
                <p className={styles.price}>
                  ₹{product.price}{' '}
                  <span className={styles.original}>₹{product.originalPrice}</span>
                </p>
                <button className={styles.button} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className={styles.scrollBtn} onClick={() => scrollRight(scrollRef3)}>
            &#8594;
          </button>
        </div>
      </div> */}

        {/* ------------------------Fourth----------------- */}
        {/* <div className={styles.container}>
        <h2 className={styles.header}>Seasonal Picks</h2>
        <div className={styles.wrapper}>
          <button className={styles.scrollBtn} onClick={() => scrollLeft(scrollRef4)}>
            &#8592;
          </button>
          <div className={styles.grid} ref={scrollRef4}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.discount}>{product.discount}% Off</div>
                <img src={product.image} alt={product.name} className={styles.image} />
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.weight}>{product.weight}</p>
                <p className={styles.price}>
                  ₹{product.price}{' '}
                  <span className={styles.original}>₹{product.originalPrice}</span>
                </p>
                <button className={styles.button} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className={styles.scrollBtn} onClick={() => scrollRight(scrollRef4)}>
            &#8594;
          </button>
        </div>
      </div> */}

        {/* ------------------------Fifth----------------- */}
        {/* <div className={styles.container}>
        <h2 className={styles.header}>Oil</h2>
        <div className={styles.wrapper}>
          <button className={styles.scrollBtn} onClick={() => scrollLeft(scrollRef5)}>
            &#8592;
          </button>
          <div className={styles.grid} ref={scrollRef5}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.discount}>{product.discount}% Off</div>
                <img src={product.image} alt={product.name} className={styles.image} />
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.weight}>{product.weight}</p>
                <p className={styles.price}>
                  ₹{product.price}{' '}
                  <span className={styles.original}>₹{product.originalPrice}</span>
                </p>
                <button className={styles.button} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className={styles.scrollBtn} onClick={() => scrollRight(scrollRef5)}>
            &#8594;
          </button>
        </div>
      </div> */}

        {/* ------------------------Sixth----------------- */}
        {/* <div className={styles.container}>
        <h2 className={styles.header}>Exotics & Premium</h2>
        <div className={styles.wrapper}>
          <button className={styles.scrollBtn} onClick={() => scrollLeft(scrollRef6)}>
            &#8592; */}
          {/* </button>
          <div className={styles.grid} ref={scrollRef6}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.discount}>{product.discount}% Off</div>
                <img src={product.image} alt={product.name} className={styles.image} />
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.weight}>{product.weight}</p>
                <p className={styles.price}>
                  ₹{product.price}{' '}
                  <span className={styles.original}>₹{product.originalPrice}</span>
                </p>
                <button className={styles.button} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className={styles.scrollBtn} onClick={() => scrollRight(scrollRef6)}>
            &#8594;
          </button>
        </div>
      </div> */}

        {/* ------------------------Seventh---------------- */}
        {/* <div className={styles.container}>
        <h2 className={styles.header}>Cuts & Sprouts</h2>
        <div className={styles.wrapper}>
          <button className={styles.scrollBtn} onClick={() => scrollLeft(scrollRef7)}>
            &#8592;
          </button>
          <div className={styles.grid} ref={scrollRef7}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.discount}>{product.discount}% Off</div>
                <img src={product.image} alt={product.name} className={styles.image} />
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.weight}>{product.weight}</p>
                <p className={styles.price}>
                  ₹{product.price}{' '}
                  <span className={styles.original}>₹{product.originalPrice}</span>
                </p>
                <button className={styles.button} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className={styles.scrollBtn} onClick={() => scrollRight(scrollRef7)}>
            &#8594;
          </button>
        </div>
      </div> */}





      
  


    
{/* ......................... */}
        </>
        
        // Mobile View
        :
        <>
         <div className={styles.blogSearchContainer}>
             <i style={{ visibility:showMobileSearchIcon?"visible":"hidden", color: "white", fontSize: "18px", cursor: "pointer" , marginLeft:"41px",marginTop:"-38px", position:"fixed",zIndex:"999"}} onClick={() => { searchIcon(searchKey) ;setSearchClick((currentvalue)=>!currentvalue);setShowMobileSearchIcon((currentvalue)=>!currentvalue);setShowSideNave((currentvalue)=>!currentvalue)}}
              class="searchicon fa fa-search" ></i>
            {/* <input style={{visibility:searchClick?"visible":"hidden"}} className={styles.blogInputboxsearch} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} /> */}
          </div>
       <div style={{position:"fixed",zIndex:"999",top:"-4px",left:"175px"}}>
       <div ref={dropdownRef} style={{ position: "relative" }}>
   <div style={{ display: "flex", marginLeft: "-45px", marginTop: "11px",position:"fixed" }}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          style={{background: "none",border: "none",cursor: "pointer",fontSize: "24px",color: "#007bff",}}>
          <img className={styles.jobLocationImage} src={location} alt="Location" />
        </button>
        <p style={{ marginTop: "17px", fontWeight: "bold", color: "white",width:"113px" }}>
          {selectedOption?.label}
        </p>
      </div>

     
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "57px",
            left: "126px",
            background: "white",
            color: "black",
            borderRadius: "20px",
            width: "154px",
            padding: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          
          <div
            style={{
              position: "absolute",
              top: "-9px",
              left: "25px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid white",
            }}
          ></div>

        
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={option.img}
                  alt={option.label}
                  style={{ width: "22px", height: "22px", marginRight: "12px" }}
                />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
        </div> 
        <>
       
<div className={styles.MobLocationFilterWrapper}>
   
           
          </div>
          <div className={styles.JobtitleFilterWrapperMobile} style={{height:"101px", marginLeft:"9px"}}>
            <buton className={Active.length === 0 ? styles.active : styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (

                  <button disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                    tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                    className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                      styles.TagHeading :
                      //  Active === tags.value ? 
                      Active.findIndex((present) => {
                        return (
                          present === tags.value
                        )
                      }) >= 0 ?
                        styles.active : styles.JobtitleFilter} onClick={() => { filterByJobTitle(tags.value) }}>{tags.value} </button>

                )
              })
            }
          </div>

          <div class={styles.homeMobileNextPrevBtn} style={{ diplay:"flex",flexDirection:"column",marginTop:"15px"}}>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  jobs per page
          </div>
          
          <div className={styles.navigationWrapper} style={{textAlign:"left",marginLeft:"6px"}}>
              <button disabled={currentPage === 1} style={{ display: "inline", marginLeft: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>
            </div>
            {PageLoader ?
            <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "40%", marginTop: "50px" }} />
            : ""
          }
          <div id={styles.JobCardWrapper} >
            {
              jobs.length > 0 ?

                jobs.map((job, i) => {
                  return (
                    <>
                      <div className={styles.JobCard} key={i}>
                      <p className={styles.readPageDate}>{new Date(job.createdAt).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                          } </p>
                          <div style={{marginTop:"-24px"}}>
                        <div className={styles.JobTitleDateWrapper}>
                          <p className={styles.jobTitle} onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Jobdetails/${btoa(job._id)}`)
                          }} style={{width:"100%", whiteSpace:"normal"}}>{job.jobTitle.charAt(0).toUpperCase()+job.jobTitle.substring(1)} </p>
                         

                        </div>
                         
                       
                        <div className={styles.JobPagecompanyNameLocationWrapper}   >
                         
                          <img className={styles.homePageCompanyLogo} src={ CompanyLogo} />

                          <div class={styles.jobTitleCompanyName}>
                          {!job.Source ?
                            
                            <> <span className={styles.companyName} onClick={() => { checkEmpHalf(btoa(job.empId)) }} >{job.companyName} </span><br></br></>
                            :
                            
                            <> <a className={`${styles.companyName}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>
                          }
                          </div>
                        </div>
                        <  img className={styles.jobLocationImage} src={location} />
                        
                        <span className={styles.jobLocation}>{job?.jobLocation[0]?.toUpperCase() + job.jobLocation.slice(1)} ,</span>
                    
                        <span className={styles.qualificationAndExperiance}>

                          <  img className={styles.graduationImage} src={graduation} />

                          {job.qualification}, {job.experiance}Y Exp ,   {job.jobtype}
                          
                        </span><br></br>

                        <span className={styles.jobtypeAndDate}>Source</span> :

                        <> <span className={styles.skills}>ItWalkin</span><br></br></>
                        {/* } */}

                        <div className={styles.skillWrapper}>
                          <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{job.skills}</span><br></br>
                        </div>
                        <div className={styles.ApplyPackage}>
                          <p className={styles.salaryRange}><span>&#8377;</span>{job.salaryRange}L</p>
                          {
                          
                            <button className={styles.ApplyMobile} onClick={() => { navigate("/JobSeekerLogin") }}><b>Apply</b></button>
                          }
                        </div>

                        <p className={styles.jobDescriptionHeading}>Job Description:</p>
                        <p className={styles.jobDescription}>
                          {
                            job.jobDescription ? HTMLReactParser(job.jobDescription.slice(0, 100).toString()) : ""
                          }
                          <span onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Jobdetails/${btoa(job._id)}`)
                          }} className={styles.seeMore}>
                            ...read more
                          </span>
                        </p>


                      </div>
                      </div>
                    </>
                  )
                })
                : <p style={{ marginLeft: "35%", color: "red" }}>No Record Found</p>

            }

          </div>
          <div class={styles.homeMobileNextPrevBtn} style={{ diplay:"flex",flexDirection:"column",marginTop:"15px"}}>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
             
            
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  jobs per page
          </div>
          
          <div className={styles.navigationWrapper} style={{textAlign:"left",marginLeft:"6px"}}>
              <button disabled={currentPage === 1} style={{ display: "inline", marginLeft: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>
            </div>
          <div style={{ marginTop: "20px", }}>
            <Footer />
          </div>
        </>
        </>
      }

    </>

  )
}

export default Home
