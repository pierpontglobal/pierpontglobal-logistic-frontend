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
                We craft digital, graphic and dimensional thinking, to create
                category leading brand experiences that have meaning and add a
                value for our clients.
              </p>
            </div>
          </div>

          <div className="row margin-t-30">
            <div className="col-lg-4 margin-t-20">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-helm text-custom" />
                <h4 className="padding-t-15">See transport</h4>
                <p className="padding-t-15 text-muted">
                  It is a paradisematic country, in which roasted parts of
                  sentences fly into your mouth leave for the far World.
                </p>
              </div>
            </div>
            <div className="col-lg-4 margin-t-20">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-car text-custom" />
                <h4 className="padding-t-15">Land transport</h4>
                <p className="padding-t-15 text-muted">
                  Even the all-powerful Pointing has no control about the blind
                  texts it is an almost unorthographic.
                </p>
              </div>
            </div>
            <div className="col-lg-4 margin-t-20">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-plane text-custom" />
                <h4 className="padding-t-15">Air transport</h4>
                <p className="padding-t-15 text-muted">
                  Question Marks and devious Semikoli, but the Little Blind Text
                  didn’t listen. She packed her seven versalia.
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
