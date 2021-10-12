import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';
import './ManagementPanel.css';
import HelpModal from './HelpModal';
import CreateNewDatasetModal from '../CreateNewDatasetModal/CreateNewDatasetModal';
import { generateCSV } from '../../services/CsvService';

class ManagementPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploadModalOpen: false,
      isHelpModalOpen: false
    };

    this.toggleUploadModal = this.toggleUploadModal.bind(this);
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
    this.downloadDataSet = this.downloadDataSet.bind(this);
    this.onDatasetComplete = this.onDatasetComplete.bind(this);
  }

  onDatasetComplete() {
    this.setState({
      isUploadModalOpen: false
    });
    this.props.onDatasetComplete();
  }

  toggleUploadModal() {
    this.setState({ isUploadModalOpen: !this.state.isUploadModalOpen });
    this.props.setModalOpen(!this.state.isUploadModalOpen);
  }

  toggleHelpModal() {
    this.setState({ isHelpModalOpen: !this.state.isHelpModalOpen });
  }

  downloadDataSet() {
    const csv = generateCSV(this.props.dataset, this.props.labelings);
    const fileName = this.props.dataset.name;
    const blob = new Blob([csv], { type: 'application/csv' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <b>Management</b>
        </CardHeader>
        <CardBody>
          <Button
            id="buttonUploadCSV"
            block
            outline
            color="primary"
            onClick={this.toggleUploadModal}
          >
            Upload CSV
          </Button>
          <Button
            id="buttonDownloadDataset"
            block
            outline
            color="primary"
            onClick={this.downloadDataSet}
          >
            Download as CSV
          </Button>
          <Button
            id="buttonDeleteDataset"
            block
            outline
            color="danger"
            onClick={() => {
              if (window.confirm('Are you sure to delete this dataset?')) {
                this.props.onDeleteDataset();
              }
            }}
          >
            Delete Dataset
          </Button>
          <hr />
          <Button
            id="buttonOpenHelpModal"
            block
            outline
            color="secondary"
            onClick={this.toggleHelpModal}
          >
            Help
          </Button>
        </CardBody>
        <CreateNewDatasetModal
          isOpen={this.state.isUploadModalOpen}
          onCloseModal={this.toggleUploadModal}
          dataset={this.props.dataset}
          onDatasetComplete={this.onDatasetComplete}
        />
        <HelpModal
          isOpen={this.state.isHelpModalOpen}
          onCloseModal={this.toggleHelpModal}
        />
      </Card>
    );
  }
}
export default ManagementPanel;
