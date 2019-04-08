import React from 'react';

class Services extends React.Component {
  render() {
    return (
      <section className="section pt-5" id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1 className="section-title text-center">Our Services</h1>
              <div className="section-title-border margin-t-20" />
              <p className="section-subtitle text-muted text-center padding-t-30 font-secondary">
                We manage your car transportation from point A to point B using
                any transportation method that best suits the needs of our
                clients, wether it has to cross land or oceans, we can handle
                it.
              </p>
            </div>
          </div>
          <div className="row margin-t-30">
            <div className="col-lg-4 margin-t-20">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-helm text-custom" />
                <h4 className="padding-t-15">Sea</h4>
                <p className="padding-t-15 text-muted">
                  Take your car across the sea to reach its destination at an
                  affordable pricing.
                </p>
              </div>
            </div>
            <div className="col-lg-4 margin-t-20">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-car text-custom" />
                <h4 className="padding-t-15">Land</h4>
                <p className="padding-t-15 text-muted">
                  We have connections to multiple transport solutions on th
                  ground to be able to move your car across all the US.
                </p>
              </div>
            </div>
            <div className="col-lg-4 margin-t-20">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-plane text-custom" />
                <h4 className="padding-t-15">Air</h4>
                <p className="padding-t-15 text-muted">
                  Given the nature, urgency and type of product you want to
                  deliver we also cover air transportation so you can get it on
                  time in any part of the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Services;
