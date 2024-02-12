import React from 'react';
import "./Orders.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosRequest from '../../utils/axiosRequest';
import getCurrentUser from '../../utils/getCurrentUser';

const Orders = () => {

  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ['getOrders'],
    queryFn: () => axiosRequest.get(`/orders`)
      .then((res) => {
        return res.data
      }),
  })

  const handleMessage =async(buyerId, sellerId)=>{
    const toSendId = currentUser.isSeller ? buyerId : sellerId

    const convo = await axiosRequest.post(`/conversations`, {
      to: toSendId
    })

    navigate(`/message/${convo.data.conversationId}`);
  

  }

  return (
    <div className='orders'>
      {
        isLoading ? "loading" : error ? "Something went wrong" :
          (
            <div className="container">
              <div className="title">
                <h1>Orders</h1>
                <Link to="/add">
                  <button>
                    Add New Orders
                  </button>
                </Link>
              </div>

              <table>
                <tbody>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Contact</th>
                  </tr>

                  {
                    data.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <img
                            className="p_img"
                            src={order.img}
                            alt=""
                          />
                        </td>
                        <td>{order.title}</td>
                        <td>{order.price}</td>
                        <td>
                            <img onClick={()=>handleMessage(order.buyerId, order.sellerId)}className="message_btn" src="./img/message.png" alt="" />
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

export default Orders;