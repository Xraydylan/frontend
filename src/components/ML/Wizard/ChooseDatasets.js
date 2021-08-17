import React, { Component } from 'react';

import {
  Col,
  Row,
  Modal,
  Input,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table
} from 'reactstrap';

import './Wizard.css';

class ChooseDatasets extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.datasetListEntry = this.datasetListEntry.bind(this);
  }

  datasetListEntry(dataset) {
    return (
      <tr key={dataset._id}>
        <td>{dataset.name}</td>
        <td>
          <Input
            className="datasets-check"
            type="checkbox"
            checked={this.props.choosenDatasets.includes(dataset._id)}
            onChange={e => this.props.toggleDataset(e, dataset['_id'])}
          />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.datasets.map((dataset, datasetIndex) => {
              return this.datasetListEntry(dataset);
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ChooseDatasets;
