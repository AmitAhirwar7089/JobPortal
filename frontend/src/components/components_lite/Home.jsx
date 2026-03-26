import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Categories from './Categories'
import Latestjobs from './Latestjobs'
import Footer from './Footer'
import useGetAllJob from '@/hooks/useGetAllJob'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const {user} = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(()=> {
    if(user?.role === "Recruiter"){
      navigate("/admin/companies");
    }
  })


  useGetAllJob();
  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      <Latestjobs />
      <Footer />
    </div>
  )
}

export default Home