import React, { Component } from 'react';

import {
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import ChooseDatasets from './Wizard/ChooseDatasets';
import ChooseClassifier from './Wizard/ChooseClassifier';
import ClassifierSettings from './Wizard/ClassifierSettings';

import NameModel from './Wizard/NameModel';
import ChooseFeatures from './Wizard/ChooseFeatures';

class NewModelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wizzardStep: 1,
      numPages: 5,
      choosenDatasets: [],
      classifierSettings: this.extractStandardParameters(
        props.trainingParams.classifierSelections[2].classifier
      ),
      modelName: '',
      classifier: props.trainingParams.classifierSelections[2].classifier
    };
    this.onNavigate = this.onNavigate.bind(this);
    this.getModalName = this.getModalName.bind(this);
    this.toggleDataset = this.toggleDataset.bind(this);
    this.setClassifier = this.setClassifier.bind(this);
    this.extractStandardParameters = this.extractStandardParameters.bind(this);
    this.setHyperParameter = this.setHyperParameter.bind(this);
  }

  setClassifier(classifier) {
    const settings = this.extractStandardParameters(classifier);
    this.setState({
      classifier: classifier,
      classifierSettings: settings
    });
  }

  setHyperParameter(name, value) {
    const classifierSettings = this.state.classifierSettings;
    classifierSettings[name] = value;
    this.setState({
      classifierSettings: classifierSettings
    });
  }

  extractStandardParameters(classifierName) {
    const params = this.props.trainingParams;
    const classifier = params.classifierSelections.find(
      elm => elm.classifier === classifierName
    );
    const classifierSettings = {};
    Object.keys(classifier.hyperparameters).forEach((key, index) => {
      if (classifier.hyperparameters[key].type == 'Constant') {
        classifierSettings[key] = classifier.hyperparameters[key].value;
      } else {
        classifierSettings[key] = classifier.hyperparameters[key].default_value;
      }
    });
    return classifierSettings;
  }

  onNavigate(page) {
    if (page < 1 || page > this.state.numPages) {
      return;
    }
    this.setState({
      wizzardStep: page
    });
  }

  toggleDataset(e, datasetId) {
    if (!this.state.choosenDatasets.includes(datasetId)) {
      this.setState({
        choosenDatasets: [...this.state.choosenDatasets, datasetId]
      });
    } else {
      const newDatasets = this.state.choosenDatasets.filter(
        elm => elm != datasetId
      );
      this.setState({
        choosenDatasets: newDatasets
      });
    }
  }

  getModalName() {
    var extraName = '';
    switch (this.state.wizzardStep) {
      case 1:
        extraName = 'Model name';
        break;
      case 2:
        extraName = 'Choose datasets';
        break;
      case 3:
        extraName = 'Choose classifier';
        break;
      case 4:
        extraName = 'Hyperparameters';
        break;
      case 5:
        extraName = 'Select features';
        break;
    }
    return 'Create new Model - ' + extraName;
  }

  render() {
    return (
      <Modal className="modal-xl" isOpen={this.props.isOpen}>
        <div className="modalHeader">
          <h5>{this.getModalName()}</h5>
          <div onClick={this.props.onClose} className="buttonClose">
            <h5>X</h5>
          </div>
        </div>
        <ModalBody>
          {this.state.wizzardStep === 1 ? <NameModel></NameModel> : null}
          {this.state.wizzardStep === 2 ? (
            <ChooseDatasets
              datasets={this.props.datasets}
              choosenDatasets={this.state.choosenDatasets}
              toggleDataset={this.toggleDataset}
            ></ChooseDatasets>
          ) : null}
          {this.state.wizzardStep === 3 ? (
            <ChooseClassifier
              setClassifier={this.setClassifier}
              classifier={this.state.classifier}
              trainingParams={this.props.trainingParams}
            ></ChooseClassifier>
          ) : null}
          {this.state.wizzardStep === 4 ? (
            <ClassifierSettings
              classifierSettings={this.state.classifierSettings}
              trainingParams={this.props.trainingParams}
              classifier={this.state.classifier}
              setHyperParameter={this.setHyperParameter}
              classifierSettings={this.state.classifierSettings}
            ></ClassifierSettings>
          ) : null}
          {this.state.wizzardStep === 5 ? (
            <ChooseFeatures
              trainingParams={this.props.trainingParams}
            ></ChooseFeatures>
          ) : null}
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'space-between' }}>
          <Button onClick={() => this.onNavigate(this.state.wizzardStep - 1)}>
            Prev
          </Button>
          <div>{this.state.wizzardStep + '/' + this.state.numPages}</div>
          <Button onClick={() => this.onNavigate(this.state.wizzardStep + 1)}>
            Next
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default NewModelModal;
