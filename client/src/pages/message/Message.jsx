import React, { useRef } from 'react';
import "./Message.scss";
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosRequest from '../../utils/axiosRequest';
import getCurrentUser from '../../utils/getCurrentUser';


const Message = () => {

  const textareaRef = useRef();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();

  const { isLoading, error, data } = useQuery({
    queryKey: ["getMessage"],
    queryFn: () => axiosRequest.get(`/messages/${id}`)
      .then((res) => {
        return res.data
      }),
  })


  const mutation = useMutation({
    mutationFn: (message) => {
      return axiosRequest.post("/messages", message)
    },
    onSuccess:()=>{
        //This invalidates and removes this request from cache and fetches a new set.
        queryClient.invalidateQueries(["getMessage"]);
    }
  })

  const handleSubmit =(e)=>{
    e.preventDefault();
    const desc = e.target[0].value
  
    mutation.mutate({desc, id});
    textareaRef.current.value = " ";
  }

 
  return (
    <div className='message'>
      <div className="container">

        {isLoading ? "loading" : error ? "Something went wrong" : (
          <>
            <span className="breadcrumbs">
              <Link className="link" to="/messages">MESSAGES</Link> &gt; JOHN DOE &gt;
            </span>
            <div className="messages">
              {
                data.map((m) => (
                  <div key={m._id} className={currentUser._id === m.userId ? "item sender" : "item"}>
                    <img
                      src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                    <p>
                      {m.desc}
                    </p>
                  </div>

                ))
              }
            </div>
            <hr />
   
            <form onSubmit={handleSubmit} className="text">
              <textarea ref= {textareaRef} name="" placeholder="Write a message" ></textarea>
              <button>Sent</button>
            </form>
          </>

        )}

      </div>
    </div>
  )
}
//<div className="item sender">
export default Message;