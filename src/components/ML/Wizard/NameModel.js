import React, { Component } from 'react';

import {
  Col,
  Row,
  Modal,
  Input,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';

import './Wizard.css';

class NewModelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="wizzardContent">
        <Input placeholder="Name"></Input>
      </div>
    );
  }
}

export default NewModelModal;
