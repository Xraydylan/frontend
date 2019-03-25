import React, { Component } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import './LabelingSelectionPanel.css';

class LabelingSelectionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelingsDefinition: props.labelingsDefinition,
      selectedLabelingId: props.selectedLabelingId,
      onSelectedLabelingIdChanged: props.onSelectedLabelingIdChanged
    };
  }

  componentWillReceiveProps(props) {
    this.setState(state => ({
      labelingsDefinition: props.labelingsDefinition,
      selectedLabelingId: props.selectedLabelingId,
      onSelectedLabelingIdChanged: props.onSelectedLabelingIdChanged
    }));
  }

  handleLabelingClicked(e, id) {
    e.preventDefault();
    this.state.onSelectedLabelingIdChanged(id);
  }

  render() {
    var classNames = require('classnames');

    return (
      <Card className="LabelingSelectionPanel">
        <CardBody className="text-left">
          {this.state.labelingsDefinition.map(labeling => (
            <Button
              className={classNames(
                'm-1',
                {
                  'btn-primary': labeling.id === this.state.selectedLabelingId
                },
                { 'btn-light': labeling.id !== this.state.selectedLabelingId }
              )}
              onClick={e => this.handleLabelingClicked(e, labeling.id)}
              color={
                labeling.id === this.state.selectedLabelingId ? 'primary' : {}
              }
            >
              {labeling.name}
            </Button>
          ))}
          <Button className="m-1" color="secondary">
            <bold>+ Add</bold>
          </Button>
        </CardBody>
      </Card>
    );
  }
}
export default LabelingSelectionPanel;
