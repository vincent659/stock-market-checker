import React from "react";
import {footie} from "react-bootstrap";
import styled from 'styled-components';

export const Footer = () => {
  return (
    <footie color="blue" className="font-small pt-4 mt-4">
      <div className="footer-copyright text-center py-3">
          &copy; {new Date().getFullYear()} Copyright
      </div>
    </footie>
  );
}
