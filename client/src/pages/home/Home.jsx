import React from 'react';
import "./Home.scss";
import Featured from '../../component/featured/Featured';
import TrustedBy from '../../component/trustedBy/TrustedBy';
import Slide from '../../component/Slide/Slide';
import { cards } from "../../data";
import { projects } from "../../data";
import CatCard from '../../component/catCard/CatCard.jsx';
import ProjectCard from '../../component/projectCard/ProjectCard.jsx';

const Home = () => {

  return (
    <div className='home'>
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} slidesToScroll={1}>
        {
          cards.map((card) => (
            <CatCard item={card} key={card.id} />
          ))
        }
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A World of frellancers at your finger tips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find high quality servies at every price point. No hourly reates, just peoject-based pricing.</p>

            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find high quality servies at every price point. No hourly reates, just peoject-based pricing.</p>

            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find high quality servies at every price point. No hourly reates, just peoject-based pricing.</p>

          </div>
          <div className="item">
            <video src="./img/video.mp4" controls></video>
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>GiG Business</h1>
            <h1>A business solution designed for teams</h1>
            <p>Advance solutions and professional talent for businesses</p>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Access top freelancers and professional business tools for any project
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Access top freelancers and professional business tools for any project
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Access top freelancers and professional business tools for any project
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Access top freelancers and professional business tools for any project
            </div>
            <button>Explore Gig Business</button>
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/51c35c7cecf75e6a5a0110d27909a2f5-1690202609364/EN.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} slidesToScroll={1}>
        {
          projects.map((card) => (
            <ProjectCard item={card} key={card.id} />
          ))
        }
      </Slide>
      
    </div>
  )
}

export default Home