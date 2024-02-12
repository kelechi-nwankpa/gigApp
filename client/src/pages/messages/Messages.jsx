import React from 'react';
import "./Messages.scss";
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosRequest from '../../utils/axiosRequest';
import dayjs from 'dayjs' // ES 2015
import relativeTime from 'dayjs/plugin/relativeTime';
import getCurrentUser from '../../utils/getCurrentUser';

dayjs.extend(relativeTime);
//dayjs().from(dayjs('1990-01-01'), true) // 31 years

const Messages = () => {

  const currentUser = getCurrentUser();
  const message = `We and our partners use cookies to Store and/or access information on a device. We and our partners use data for Personalised advertising and content, advertising and content measurement, audience research and services development . An example of data being processed may be a unique identifier stored in a cookie. `
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["getConversations"],
    queryFn: () => axiosRequest.get(`/conversations`)
      .then((res) => {
        return res.data
      }),
  })


  const mutation = useMutation({
    mutationFn: (convoId) => {
      return axiosRequest.put(`/conversations/${convoId}`)
    },
    onSuccess:()=>{
        //This invalidates and removes this request from cache and fetches a new set.
        queryClient.invalidateQueries(["getConversations"]);
    }
  })


  const handleRead = (convoId) =>{
    mutation.mutate(convoId)
  }

 
  return (
    <div className='messages'>
      {
        isLoading ? "loading" : error ? "Something went wrong" : (
          <div className="container">
            <div className="title">
              <h1>Messages</h1>
              <Link to="/add">
                <button>
                  Add New Message
                </button>
              </Link>
            </div>

            <table>
              <tbody>
                <tr>
                  <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                  <th>Last Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>

                {
                  data.map((convo) => (
                    <tr className={
                      (!currentUser.isSeller && convo.readByBuyer) || (currentUser.isSeller && convo.readBySeller) ?
                      "" :
                      "active"
                    } key={convo._id}>
                      <td>{currentUser.isSeller ? convo.sellerId : convo.buyerId}</td>
                      <td><Link onClick={()=>handleRead(convo.id)} className="link" to={`/message/${convo.id}`}>{convo?.lastMessage?.substring(0, 100)}...</Link></td>
                      <td>about {dayjs().from(dayjs(convo.updatedAt), true)} ago</td>
                      <td>
                        { (!currentUser.isSeller && convo.readByBuyer) || (currentUser.isSeller && convo.readBySeller)?
                         <button disabled style={{backgroundColor: "grey", cursor: "not-allowed"}}>Mark as Read</button> 
                         :<button onClick={()=>handleRead(convo.id)} >Mark as Read</button>  }
                        
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

export default Messages;