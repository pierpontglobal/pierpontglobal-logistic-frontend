import React from 'react';
import { Link } from 'react-router-dom';

function Features() {
  return (
    <section className="section bg-light" id="features">
      <div className="container">
        <div className="row vertical-content">
          <div className="col-lg-5">
            <div className="features-box">
              <h3>
                A digital way to book and manage your car deliveries across
                America
              </h3>
              <p className="text-muted web-desc">
                Let us take care of moving your car so it can reach its
                destination in a reliable and cost effective manner.
              </p>
              <ul className="text-muted list-unstyled margin-t-30 features-item-list">
                <li className="">
                  We put a lot of effort in building relations to make it easier
                  and cheaper for you to get your car.
                </li>
                <li className="">We emphasize on delivery time.</li>
                <li className="">
                  Trust us on getting the most competitive pricing.
                </li>
              </ul>
              <Link
                to="JavaScript:Void(0);"
                className="btn btn-custom margin-t-30 waves-effect waves-light"
              >
                Learn More <i className="mdi mdi-arrow-right" />
              </Link>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="features-img features-right text-right">
              <img
                style={{
                  maxWidth: 'auto',
                  width: '150%'
                }}
                src="images/online-world.png"
                alt="macbook image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
