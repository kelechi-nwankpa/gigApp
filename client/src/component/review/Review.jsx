import React from 'react';
import "./Review.scss";
import axiosRequest from '../../utils/axiosRequest';
import { useQuery } from '@tanstack/react-query';

const Review = ({item}) => {

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [item.userId],
        queryFn: () => axiosRequest.get(`/users/${item.userId}`)
        .then((res) =>{
          return res.data
        }),
      })
    
    return (
        
        <div className="review">
            {
                isLoading ? "loading" : error ? "Something went wrong" :
                <>
                    <div className="user">
                <img
                    className="pp_img"
                    src={data.img || "/img/user.png"}
                    alt=""
                />
                <div className="info">
                    <span>{data.username}</span>
                    <div className="country">
                        <img
                            src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                            alt=""
                        />
                        <span>{data.country}</span>
                    </div>
                </div>
            </div>

            <div className="stars">
                {
                    [...new Array(item.star)].map((item, i)=> (
                        <img key={i} src="/img/star.png" alt="" />
                    ))
                }
                <span>{item.star}</span>
            </div>
            <p>
                {item.desc}
            </p>

            <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/like/like.png" alt="" />
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
            </div>
            <hr/>
                </>
            }   
        
        </div>
        
    )
}

export default Review