import React, { Component } from 'react';

import {
  Col,
  Row,
  Modal,
  Input,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
  FormGroup,
  Label
} from 'reactstrap';

import './Wizard.css';

class ChooseFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const features = this.props.trainingParams.features;
    return (
      <div>
        {features.map((feature, featureIndex) => (
          <div key={feature + featureIndex}>
            <FormGroup className="mr-2" check>
              <Label check>
                <Input value={feature} type="radio" />
                {feature}
              </Label>
            </FormGroup>
          </div>
        ))}
      </div>
    );
  }
}

export default ChooseFeatures;
