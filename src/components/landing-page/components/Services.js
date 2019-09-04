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
                <i className="pe-7s-box1 text-custom" />
                <h4 className="padding-t-15">Finding Loads</h4>
                <p className="padding-t-15 text-muted">
                  We guarantee finding you loads with access to thousands of brokers and various customers.
                </p>
              </div>
            </div>
            <div className="col-lg-4 margin-t-20">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-cash text-custom" />
                <h4 className="padding-t-15">Top dollar, Less miles</h4>
                <p className="padding-t-15 text-muted">
                  We strive to consistently double the industry average of $1.50/mile.
                </p>
              </div>
            </div>
            <div className="col-lg-4 margin-t-20">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-clock text-custom" />
                <h4 className="padding-t-15">24 Hour Payment Guarantee</h4>
                <p className="padding-t-15 text-muted">
                  We help our clients process invoices and guaranteed payments within 24 hours.
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
