import React from 'react';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Features from './components/Features';
import Descriptions from './components/Descriptions';
import Pricing from './components/Pricing';
import Team from './components/Team';
import Process from './components/Process';
import Testi from './components/Testi';
import Started from './components/Started';
import Blog from './components/Blog';
import Contact from './components/Contact';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import FooterLinks from './components/FooterLinks';
import Switcher from './components/Switcher';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import Aux from './hoc/Aux_';
import BackImage from '../../assets/images/landing_background.jpeg';
import ButtonsSelect from './components/ButtonsSelect';
import OriginDestination from './components/OriginDestination';

class HomeSeven extends React.Component {
  render() {
    var bkg1 = {
      backgroundImage: `url(${BackImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };

    return (
      <Aux>
        {/* Navbar Component*/}
        <Navbar />

        <section
          className="section section-lg height-100vh"
          id="home"
          style={bkg1}
        >
          <Particles
            style={{ position: 'absolute', top: 0 }}
            params={{
              particles: {
                number: {
                  value: 50
                },
                size: {
                  value: 4
                }
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: 'repulse'
                  }
                }
              }
            }}
          />
          <div className="bg-overlay" />
          <div className="display-table">
            <div className="display-table-cell">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 offset-lg-2 text-white text-center">
                    <h1 className="home-title text-rotate">
                      The future of logistics
                    </h1>
                    <p className="padding-t-15 home-desc">
                      Etiam sed.Interdum consequat proin vestibulum className at
                      a euismod mus luctus quam.Lorem ipsum dolor sit amet,
                      consectetur adipisicing eli.
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyItems: 'center',
                        flexDirection: 'column'
                      }}
                      className="margin-t-30 margin-l-r-auto"
                    >
                      <ButtonsSelect />
                      <OriginDestination />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Component*/}
        <Services />

        {/* Features Component*/}
        <Features />

        {/* Process Component*/}
        <Process />

        {/* Testi Component*/}
        <Testi />

        {/* Contact Component*/}
        <Contact />

        {/* SocialMedia Component*/}
        <SocialMedia />

        {/* Footer Component*/}
        <Footer />

        {/* FooterLinks Component*/}
        <FooterLinks />
      </Aux>
    );
  }
}

export default HomeSeven;
