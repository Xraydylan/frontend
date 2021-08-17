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
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import './Wizard.css';

class ClassifierSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getCategoricalParameter = this.getCategoricalParameter.bind(this);
    this.getUniformFloatHyperparameter = this.getUniformFloatHyperparameter.bind(
      this
    );
    this.getConstantHyperparameter = this.getConstantHyperparameter.bind(this);
    this.getUnifromatIntegerHyperparameter = this.getUnifromatIntegerHyperparameter.bind(
      this
    );
  }

  getCategoricalParameter(parameter) {
    return (
      <div style={{ display: 'flex' }}>
        {' '}
        <div className="parameterHeading">{parameter[0] + ': '}</div>
        <div style={{ display: 'flex' }}>
          {parameter[1].choices.map((option, optionIndex) => (
            <div key={option + optionIndex}>
              <FormGroup className="mr-2" check>
                <Label check>
                  <Input
                    value={option}
                    type="radio"
                    checked={
                      this.props.classifierSettings[parameter[0]] === option
                    }
                    onChange={e =>
                      this.props.setHyperParameter(parameter[0], e.target.value)
                    }
                  />
                  {option}
                </Label>
              </FormGroup>
            </div>
          ))}
        </div>
      </div>
    );
  }

  getUniformFloatHyperparameter(parameter) {
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{parameter[0]}</InputGroupText>
          </InputGroupAddon>
          <Input
            value={this.props.classifierSettings[parameter[0]]}
            type="number"
            max={parameter[1].upper}
            min={parameter[1].lower}
            onChange={e =>
              this.props.setHyperParameter(parameter[0], e.target.value)
            }
          />
        </InputGroup>
      </div>
    );
  }

  getConstantHyperparameter(parameter) {
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{parameter[0]}</InputGroupText>
          </InputGroupAddon>
          <Input
            value={parameter[1].value}
            readOnly
            onChange={e =>
              this.props.setHyperParameter(parameter[0], e.target.value)
            }
          />
        </InputGroup>
      </div>
    );
  }

  getUnifromatIntegerHyperparameter(parameter) {
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{parameter[0]}</InputGroupText>
          </InputGroupAddon>
          <Input
            value={this.props.classifierSettings[parameter[0]]}
            type="number"
            max={parameter[1].upper}
            min={parameter[1].lower}
            onChange={e =>
              this.props.setHyperParameter(parameter[0], e.target.value)
            }
          />
        </InputGroup>
      </div>
    );
  }

  mapParameters(parameter) {
    switch (parameter[1].type) {
      case 'CategoricalHyperparameter':
        return this.getCategoricalParameter(parameter);
      case 'UniformFloatHyperparameter':
        return this.getUniformFloatHyperparameter(parameter);
      case 'Constant':
        return this.getConstantHyperparameter(parameter);
      case 'UniformIntegerHyperparameter':
        return this.getUnifromatIntegerHyperparameter(parameter);
    }
  }

  render() {
    const clsIndex = this.props.trainingParams.classifierSelections.findIndex(
      elm => elm.classifier === this.props.classifier
    );
    const parameters = this.props.trainingParams.classifierSelections[clsIndex]
      .hyperparameters;
    return (
      <div>
        <div>
          {Object.entries(parameters).map((param, paramIndex) => (
            <div key={param + paramIndex}>
              {this.mapParameters(param)}
              {paramIndex !== 0 ? <div className="divider"></div> : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ClassifierSettings;
