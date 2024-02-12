import React from 'react'
import "./Gig.scss";
import Slider from 'react-slick';
import axiosRequest from '../../utils/axiosRequest';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Reviews from '../../component/reviews/Reviews';


const Gig = () => {

  const { id } = useParams()

  const { isLoading, error, data } = useQuery({
    queryKey: ['getGig', id],
    queryFn: () => axiosRequest.get(`/gigs/single/${id}`)
      .then((res) => {
        return res.data
      }),
  })

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ['getUser', userId],
    queryFn: () => axiosRequest.get(`/users/${userId}`)
      .then((res) => {
        return res.data
      }),
    enabled: !!userId,
  })


  return (

    <div className='gig'>
      <div className="container">
        {
          isLoading ? "loading" : error ? "Something went wrong" :
            <>
              <div className="left">
                <span className="breadCrumbs">FIVERR &gt; GRAPHICS & DESIGN &gt; </span>
                <h1>{data.title}</h1>

                {
                  isLoadingUser ? "loading" : errorUser ? "Something went wrong" :
                    <>
                      <div className="user">
                        <img
                          className='pp_img'
                          src={dataUser.img || "/img/user.png"}
                          alt="" />
                        <span>{dataUser.username}</span>

                        {
                          !isNaN(data.totalStars / data.starNumber) && (
                            <div className="stars">
                              {[...new Array(Math.round(data.totalStars / data.starNumber))].map((item, i) => (
                                <img src="/img/star.png" key={i} alt="" />
                              ))}
                              <span>{Math.round(data.totalStars / data.starNumber)}</span>
                            </div>
                          )
                        }
                      </div>
                    </>
                }
                <Slider slidesToShow={1} className="slider">
                  {
                    data.images.map((img) => {
                      return (
                        <img
                          key={img}
                          src={img}
                          alt=""
                        />
                      )
                    })
                  }

                </Slider>

                <h2>About this gig</h2>
                <p>{data.desc}
                </p>

                {
                  isLoadingUser ? "loading" : errorUser ? "Something went wrong" : (
                    <div className="seller">
                      <h2>About the Seller</h2>
                      <div className="user">
                        <img
                          className="pp_img"
                          src={dataUser.img || "/img/user.png"}
                          alt=""
                        />
                        <div className="info">
                          <span>{dataUser.username}</span>


                          {
                            !isNaN(data.totalStars / data.starNumber) && (
                              <div className="stars">
                                {[...new Array(Math.round(data.totalStars / data.starNumber))].map((item, i) => (
                                  <img src="/img/star.png" key={i} alt="" />
                                ))}
                                <span>{Math.round(data.totalStars / data.starNumber)}</span>
                              </div>
                            )
                          }
                          <button>Contact Me</button>
                        </div>
                      </div>

                      <div className="box">
                        <div className="items">
                          <div className="item">
                            <span className='title'>From</span>
                            <span className='desc'>GBP</span>
                          </div>
                          <div className="item">
                            <span className='title'>Member Since</span>
                            <span className='desc'>Aug 2022</span>
                          </div>
                          <div className="item">
                            <span className='title'>Avg. response time</span>
                            <span className='desc'>4 hours</span>
                          </div>
                          <div className="item">
                            <span className='title'>Last delivery</span>
                            <span className='desc'>1 day</span>
                          </div>
                          <div className="item">
                            <span className='title'>Languages</span>
                            <span className='desc'>English</span>
                          </div>
                        </div>
                        <hr />
                        <p>
                          Hello! Im Valeriia, a freelance digital artist, and I want to earn money to support my family in Ukraine. Drawing is my passion, and I will be very happy to create artwork that you will fall in love with!
                          Feel free to contact me anytime.
                          Kindness regards,
                          Valeriia
                        </p>
                      </div>
                    </div>
                  )
                }


                <Reviews gigId={id} />

              </div>

              <div className="right">
                <div className="price">
                  <h3>{data.shortTitle}</h3>
                  <h2>$ {data.price}</h2>
                </div>
                <p>{data.shortDesc}</p>
                <div className="details">
                  <div className="item">
                    <img src="/img/clock.png" alt="" />
                    <span>{data.deliveryTime} days Delivery</span>
                  </div>
                  <div className="item">
                    <img src="/img/recycle.png" alt="" />
                    <span>{data.revisionNumber} Revisions</span>
                  </div>
                </div>
                <div className="features">

                  {
                    data.features.map((feature) => {
                      return (
                        <div key={feature} className="item">
                          <img src="/img/greencheck.png" alt="" />
                          <span>{feature}</span>
                        </div>
                      )
                    })
                  }

                </div>
                <Link to={`/pay/${id}`}> 
                  <button>Continue</button>
                </Link>
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default Gig