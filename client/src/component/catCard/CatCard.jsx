import React from 'react';
import "./CatCard.scss";
import { Link } from 'react-router-dom';

const CatCard = ({item}) => {
    return (
        <Link to="/gigs?cat=design">
            <div className="catCard">
                <img src={item.img}  alt=""/>
                <span className='title'>{item.title}</span>
                <span className='desc'>{item.desc}</span>
            </div>
        </Link>

    )
}

export default CatCard