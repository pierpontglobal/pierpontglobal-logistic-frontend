import React from 'react';
import { Link } from 'react-router-dom';

function Process() {
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h1 className="section-title text-center">Work Process</h1>
            <div className="section-title-border margin-t-20" />
            <p className="section-subtitle text-muted text-center font-secondary padding-t-30" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 text-center process-left-icon-1">
            <i className="pe-7s-angle-right" />
          </div>
          <div className="col-lg-6 text-center process-left-icon-2">
            <i className="pe-7s-angle-right" />
          </div>
        </div>
        <div className="row margin-t-50">
          <div className="col-lg-4 plan-line">
            <div className="text-center process-box">
              <i className="pe-7s-pen text-custom" />
              <h4 className="padding-t-15">Tell us what you need</h4>
              <p className="text-muted">Contact us through our platform.</p>
            </div>
          </div>
          <div className="col-lg-4 plan-line">
            <div className="text-center process-box">
              <i className="pe-7s-id text-custom" />
              <h4 className="padding-t-15">Get free quotes</h4>
              <p className="text-muted">
                We will let you know the pricing of your delivery.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="text-center process-box">
              <i className="pe-7s-target text-custom" />
              <h4 className="padding-t-15">Deliver product</h4>
              <p className="text-muted">
                We will make sure your product gets where it needs to be.
              </p>
            </div>
          </div>
          <div className="text-center mx-auto">
            <Link
              to="JavaScript:Void(0);"
              className="btn btn-custom waves-light waves-effect margin-t-50"
            >
              Get Started <i className="mdi mdi-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Process;
