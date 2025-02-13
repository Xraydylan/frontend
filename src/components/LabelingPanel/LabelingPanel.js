import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from 'reactstrap';
import './LabelingPanel.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

class LabelingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      from: props.from,
      to: props.to,
      labeling: props.labeling,
      labels: props.labels,
      selectedLabelTypeId: props.selectedLabelTypeId,
      onSelectedLabelTypeIdChanged: props.onSelectedLabelTypeIdChanged,
      onDeleteSelectedLabel: props.onDeleteSelectedLabel,
      canEdit: props.canEdit,
      onCanEditChanged: props.onCanEditChanged,
      isCrosshairIntervalActive: props.isCrosshairIntervalActive
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.onAddLabel = this.onAddLabel.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState(state => ({
      id: props.id,
      from: props.from,
      to: props.to,
      labeling: props.labeling,
      labels: props.labels,
      selectedLabelTypeId: props.selectedLabelTypeId,
      onSelectedLabelTypeIdChanged: props.onSelectedLabelTypeIdChanged,
      onDeleteSelectedLabel: props.onDeleteSelectedLabel,
      canEdit: props.canEdit,
      onCanEditChanged: props.onCanEditChanged,
      isCrosshairIntervalActive: props.isCrosshairIntervalActive
    }));
  }

  handleLabelTypeClicked(e, id) {
    e.preventDefault();
    this.state.onSelectedLabelTypeIdChanged(id);
  }

  handleDeleteClicked(e) {
    e.preventDefault();
    this.state.onDeleteSelectedLabel();
  }

  toggleEdit() {
    this.state.onCanEditChanged(!this.state.canEdit);
  }

  onAddLabel() {
    const newHistory = this.props.history.location.pathname.split('/');
    newHistory.length -= 2;
    this.props.history.push({
      pathname: newHistory.join('/') + '/labelings',
      search: '?id=' + this.state.labeling['_id'],
      state: this.props.history.location.pathname
    });
  }

  render() {
    return (
      <Card className="LabelingPanel">
        <CardBody className="p-1">
          <div className="informationBox">
            <Button
              disabled={this.props.isCrosshairIntervalActive}
              className="m-1 btn-light"
              style={{ float: 'left' }}
              onClick={this.toggleEdit}
            >
              <FontAwesomeIcon
                style={{ color: !this.state.canEdit ? '#b71c1c' : '#43A047' }}
                icon={!this.state.canEdit ? faLock : faUnlock}
                className="mr-2"
              />
              <span
                style={{ color: !this.state.canEdit ? '#b71c1c' : '#43A047' }}
              >
                {!this.state.canEdit ? 'Locked' : 'Unlocked'}
              </span>
            </Button>
            <InputGroup className="inputGroup m-1">
              <InputGroupAddon addonType="prepend" className="inputGroupAddon">
                <InputGroupText className="inputLabel">Id</InputGroupText>
              </InputGroupAddon>
              <Input
                value={this.state.id ? this.state.id : ''}
                readOnly
                className="idInput text-center"
              />
            </InputGroup>
            <InputGroup className="inputGroup m-1">
              <InputGroupAddon addonType="prepend" className="inputGroupAddon">
                <InputGroupText className="inputLabel">From</InputGroupText>
              </InputGroupAddon>
              <Input
                value={
                  this.state.from
                    ? new Date(this.state.from).toUTCString().split(' ')[4]
                    : ''
                }
                readOnly
                className="timeInput text-center"
              />
            </InputGroup>
            <InputGroup className="inputGroup m-1">
              <InputGroupAddon addonType="prepend" className="inputGroupAddon">
                <InputGroupText className="inputLabel">To</InputGroupText>
              </InputGroupAddon>
              <Input
                value={
                  this.state.to
                    ? new Date(this.state.to).toUTCString().split(' ')[4]
                    : ''
                }
                readOnly
                className="timeInput text-center"
              />
            </InputGroup>
            <Button
              disabled={
                this.state.selectedLabelTypeId === undefined ||
                !this.state.canEdit
              }
              className="deleteButton m-1"
              outline
              color="danger"
              onClick={e => this.state.onDeleteSelectedLabel()}
            >
              Delete
            </Button>
          </div>

          <div className="labelingBox">
            <Button
              className="labelingButton m-1"
              color="secondary"
              onClick={this.onAddLabel}
            >
              + Edit
            </Button>
            {this.state.labeling
              ? this.state.labeling.labels
                  .slice(0)
                  .reverse()
                  .map((labelId, index, array) => {
                    let label = this.state.labels.filter(
                      label => label['_id'] === labelId
                    )[0];
                    return (
                      <Button
                        className="btn-light m-1 labelingButton"
                        disabled={
                          this.state.selectedLabelTypeId === undefined ||
                          !this.state.canEdit
                        }
                        style={{
                          backgroundColor:
                            labelId === this.state.selectedLabelTypeId
                              ? label.color
                              : null,
                          borderColor:
                            labelId === this.state.selectedLabelTypeId
                              ? null
                              : label.color,
                          color:
                            labelId === this.state.selectedLabelTypeId
                              ? null
                              : label.color
                        }}
                        onClick={e => this.handleLabelTypeClicked(e, labelId)}
                        key={index}
                      >
                        {label.name} {'(' + (array.length - index) + ')'}
                      </Button>
                    );
                  })
              : null}
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default LabelingPanel;
