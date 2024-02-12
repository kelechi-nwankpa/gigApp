import React, { useRef, useState } from 'react'
//import { gigs } from "../../data";
import "./Gigs.scss";
import GigCard from '../../component/gigCard/GigCard';
import axiosRequest from '../../utils/axiosRequest';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Gigs = () => {

  const [isOpen, setIsopen] = useState(false);
  const [ sortMenu, setSortMenu] = useState("createdAt");
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation()

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['getGigs'],
    queryFn: () => axiosRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sortMenu}`)
    .then((res) =>{
      return res.data
    }),
  })


  useEffect(() => {
    
    refetch();
  }, [sortMenu])
  


  const sort =(type)=> {
    setSortMenu(type);
    setIsopen(false);
  }

  const openRightMenu = () => {
     setIsopen(!isOpen);
  }

  const apply = () => {
    refetch();
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR &gt; GRAPHICS & DESIGN &gt;</span>
        <h1>AI Artist</h1>
        <p>Explore the boundaries of art and technology with Gigs AI artists</p>
        <div className="menu">
          <div className="left">
            <span>Budgeted</span>
            <input type="text" placeholder="min" ref={minRef}/>
            <input type="text" placeholder="max" ref={maxRef}/>
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right" >
            <span className="sortBy">SortBy</span>
            {sortMenu === "createdAt" ? <span className="sortType">Newest</span> : <span className="sortType">Best Selling</span>}
            <img src="/img/down.png" alt="" onClick={()=>openRightMenu()}/>
            {
              isOpen && (
                <div className="rightMenu" >
                  {
                    sortMenu === "createdAt" ? <span onClick={()=>sort("sales")}>Best Selling</span> : <span onClick={()=>sort("createdAt")}>Newest</span>
                  }
                </div>
              )
            }

          </div>
        </div>

        <div className="cards">
           {
            isLoading ? "loading" : error ? "Something went wrong" :
            data.map((gig)=>(
              <GigCard key={gig._id} item={gig}/>
            )

            )
           }
        </div>
      </div>
    </div>
  )
}

export default Gigs