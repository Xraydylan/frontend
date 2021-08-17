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

class ChooseClassifier extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getRadioInputs(inputs) {
    return inputs.map((input, inputIndex) => (
      <div key={input + inputIndex}>
        <FormGroup className="mr-2" check>
          <Label check>
            <Input
              value={input}
              type="radio"
              checked={this.props.classifier === input}
              onChange={() => this.props.setClassifier(input)}
            />
            {input}
          </Label>
        </FormGroup>
      </div>
    ));
  }

  render() {
    const classifiers = this.props.trainingParams.classifierSelections.map(
      elm => elm.classifier
    );
    return <div>{this.getRadioInputs(classifiers)}</div>;
  }
}

export default ChooseClassifier;
