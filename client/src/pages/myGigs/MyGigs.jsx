import React from 'react';
import "./MyGigs.scss";
import { Link } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosRequest from '../../utils/axiosRequest';

const MyGigs = () => {

  //when I land on this page, I'd want to get the gigs that only 
  //belong to THIS particular seller using thier userId.
  //I'd be making a GET request with a query param(userId)
  //get useId from the localStorage

  const userId = getCurrentUser()._id;
  const queryClient = useQueryClient();


  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () => axiosRequest.get(`/gigs?userId=${userId}`)
      .then((res) => {
        return res.data
      }),
  })

  const mutation = useMutation({
    mutationFn: (id) => {
      return axiosRequest.delete(`/gigs/${id}`)
    },
    onSuccess:()=>{
        //This invalidates and removes this request from cache and fetches a new set.
        queryClient.invalidateQueries(["myGigs"]);
    }
  })

  const handleDelete = (gigId) =>{
    mutation.mutate(gigId);
  }

  return (
    <div className='myGigs'>
       {
          isLoading ? "loading" : error ? "Something went wrong" : (
            <div className="container">
       
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/addGig">
            <button>
              Add New Gig
            </button>
          </Link>
        </div>

        <table>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {
              data?.map((gig) => (
                <tr>
                  <td>
                    <img
                      className="p_img"
                      src={gig.cover}
                      alt=""
                    />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <Link onClick={()=>handleDelete(gig._id)}>
                      <img className="delete" src="./img/delete.png" alt="" />
                    </Link>
                  </td>
                </tr>
              ))
            }



          </tbody>
        </table>

      </div>

          ) 
        }
      

    </div>
  )
}

export default MyGigs