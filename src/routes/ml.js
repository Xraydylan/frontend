import React, { Component } from 'react';
import Loader from '../modules/loader';

import { Col, Row, Button } from 'reactstrap';
import NewModelModal from '../components/ML/NewModelModal';

import { getDatasets } from '../services/ApiServices/DatasetServices';
import { getParameters } from '../services/ApiServices/MLService';

class MlPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      datasets: [],
      newModelModalOpen: false,
      trainingParams: undefined
    };
    this.onToggleNewModelModal = this.onToggleNewModelModal.bind(this);
  }

  componentDidMount() {
    const promises = [getDatasets(), getParameters()];
    Promise.all(promises)
      .then(data => {
        this.setState({
          ready: true,
          datasets: data[0],
          trainingParams: data[1]
        });
      })
      .catch(err => {
        window.alert('Could not receive datasets from server');
      });
  }

  onToggleNewModelModal() {
    this.setState({
      newModelModalOpen: !this.state.newModelModalOpen
    });
  }

  render() {
    if (!this.state.ready) {
      return <Loader loading={!this.state.ready}></Loader>;
    }
    return (
      <div>
        <Button onClick={this.onToggleNewModelModal}>Create new Model</Button>
        <NewModelModal
          isOpen={this.state.newModelModalOpen}
          onClose={this.onToggleNewModelModal}
          datasets={this.state.datasets}
          trainingParams={this.state.trainingParams}
        ></NewModelModal>
      </div>
    );
  }
}

export default MlPage;
