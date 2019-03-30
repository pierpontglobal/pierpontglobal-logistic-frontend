import React, { Component } from 'react';
import PPGLNavBar from '../navbar/PPGLNavBar';
import PermanentSidemenu from '../permanent-sidemenu/PermanentSidemenu';

function BaseComponent(props) {
  return (
    <>
      <PermanentSidemenu cookies={props.cookies}>
        <PPGLNavBar />
        {props.children}
      </PermanentSidemenu>
    </>
  );
}

export default BaseComponent;
