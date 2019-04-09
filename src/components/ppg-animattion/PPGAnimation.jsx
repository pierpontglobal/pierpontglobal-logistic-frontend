import React, { Component } from 'react';


/**
 * PPG ANIMATION COMPONENT
 * GreenSock - GSAP implementation
 */
class PPGAnimation extends Component {
  constructor(props) {
    this.state = {
      
    }
    this.wrapper = React.createRef();
  }

  componentDidMount = () => {
    this.wrapper = document.getElementById('wrapper');
    // TeewnLite - From GSAP
  }

  render() {
    const { element } = this.props;
    if (!element) return null;

    return (
      <>
        <div id="wrapper">
          {element}
        </div>
      </>
    );
  }
}

export default PPGAnimation;