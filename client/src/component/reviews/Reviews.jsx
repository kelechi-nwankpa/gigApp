import React from 'react';
import "./Reviews.scss";
import Review from '../review/Review';
import axiosRequest from '../../utils/axiosRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Reviews = ({ gigId }) => {

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ["getReviews", gigId],
        queryFn: () => axiosRequest.get(`/reviews/${gigId}`)
            .then((res) => {
                return res.data
            }),
    })

    const mutation = useMutation({
        mutationFn: (review) => {
          return axiosRequest.post("/reviews", review)
        },
        onSuccess:()=>{
            //This invalidates and removes this request from cache and fetches a new set.
            queryClient.invalidateQueries(["getReviews", gigId]);
        }
      })

    const handleSubmit = (e)=>{
        e.preventDefault();

        const desc = e.target[0].value;
        const star = e.target[1].value;
        mutation.mutate({ gigId, desc, star})
    }
    
    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {
                isLoading ? "loading" : error ? "No reviews yet-Something went wrong" : (
                data.map((review) => <Review key={review._id} item={review} />)
                )
            }
            <div className='add'>
                <h3>Add a review</h3>
                <form className="addForm" onSubmit={handleSubmit}>
                <input type="text" placeholder="write your opinion" />
                <select>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <button>Send</button>
                </form>
            </div>
            
        </div>
    )
}

export default Reviews