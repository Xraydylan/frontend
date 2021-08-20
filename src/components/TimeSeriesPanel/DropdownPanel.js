import React, { Component } from 'react';
import {
  Button,
  Input,
  Table,
  Card,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import './TimeSeriesPanel.css';

class DropdownPanel extends Component {
  constructor(props) {
    super(props);
    const time = new Date(props.start + props.offset);

    this.state = {
      isOpen: false,
      timestamp: undefined,
      year: time.getFullYear(),
      month: time.getMonth() + 1,
      date: time.getDate(),
      hour: time.getHours(),
      min: time.getMinutes(),
      sec: time.getSeconds(),
      millisec: time.getMilliseconds(),
      name: props.name,
      unit: props.unit
    };
    this.onUnitChange = this.onUnitChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  onUnitChange(e) {
    this.setState({
      unit: e.target.value
    });
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const time = new Date(nextProps.start + nextProps.offset);

      this.setState({
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        date: time.getDate(),
        hour: time.getHours(),
        min: time.getMinutes(),
        sec: time.getSeconds(),
        millisec: time.getMilliseconds()
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    // click outside the component to close dropdown
    this.setState({
      isOpen: false,
      timestamp: undefined
    });
  };

  toggleDropdown = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
        timestamp: undefined
      });
    } else {
      this.setState({
        isOpen: true,
        timestamp: this.props.start + this.props.offset
      });
    }
  };

  onShift = (unit, value) => {
    let { year, month, date, hour, min, sec, millisec } = this.state;

    switch (unit) {
      case 'y':
        this.setState({ year: value });
        year = value;
        break;
      case 'm':
        this.setState({ month: value });
        month = value;
        break;
      case 'd':
        this.setState({ date: value });
        date = value;
        break;
      case 'h':
        this.setState({ hour: value });
        hour = value;
        break;
      case 'min':
        this.setState({ min: value });
        min = value;
        break;
      case 's':
        this.setState({ sec: value });
        sec = value;
        break;
      case 'ms':
        this.setState({ millisec: value });
        millisec = value;
        break;
      default:
        return;
    }

    month = month - 1;
    let timestamp = new Date(
      year,
      month,
      date,
      hour,
      min,
      sec,
      millisec
    ).getTime();
    this.props.onShift(timestamp);
  };

  onReset = () => {
    if (window.confirm('Are you sure to reset the time series?')) {
      this.props.onShift(this.state.timestamp);
    }
  };

  onDelete = () => {
    if (window.confirm('Are you sure to delete this time series?')) {
      this.toggleDropdown();
      this.props.onDelete();
    }
  };

  render() {
    let numOfDays = new Date(this.state.year, this.state.month, 0).getDate();

    return (
      <div className="dropdownWrapper" ref={node => (this.node = node)}>
        <button className="dropdownBtn" onClick={this.toggleDropdown}>
          <FontAwesomeIcon icon={faEllipsisV} size="xs" color="#999999" />
        </button>

        {this.state.isOpen ? (
          <Card className="dropdown">
            {!this.props.fused ? (
              <div>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Year</td>
                      <td />
                      <td>Month</td>
                      <td />
                      <td>Day</td>
                      <td />
                      <td>Hours</td>
                      <td />
                      <td>Minutes</td>
                      <td />
                      <td>Seconds</td>
                      <td />
                      <td>Milliseconds</td>
                    </tr>

                    <tr>
                      <td>
                        <Input
                          value={this.state.year}
                          min={0}
                          max={10000}
                          type="number"
                          step="1"
                          onChange={e => this.onShift('y', e.target.value)}
                        />
                      </td>
                      <td>-</td>
                      <td>
                        <Input
                          value={this.state.month}
                          min={1}
                          max={12}
                          type="number"
                          step="1"
                          onChange={e => this.onShift('m', e.target.value)}
                        />
                      </td>
                      <td>-</td>
                      <td>
                        <Input
                          value={this.state.date}
                          min={1}
                          max={numOfDays}
                          type="number"
                          step="1"
                          onChange={e => this.onShift('d', e.target.value)}
                        />
                      </td>
                      <td> </td>
                      <td>
                        <Input
                          value={this.state.hour}
                          min={0}
                          max={24}
                          type="number"
                          step="1"
                          onChange={e => this.onShift('h', e.target.value)}
                        />
                      </td>
                      <td>:</td>
                      <td>
                        <Input
                          value={this.state.min}
                          min={0}
                          max={60}
                          type="number"
                          step="1"
                          onChange={e => this.onShift('min', e.target.value)}
                        />
                      </td>
                      <td>:</td>
                      <td>
                        <Input
                          value={this.state.sec}
                          min={0}
                          max={60}
                          type="number"
                          step="1"
                          onChange={e => this.onShift('s', e.target.value)}
                        />
                      </td>
                      <td>.</td>
                      <td>
                        <Input
                          value={this.state.millisec}
                          min={0}
                          max={999}
                          type="number"
                          step="1"
                          onChange={e => this.onShift('ms', e.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button
                  color="secondary"
                  block
                  className="m-0"
                  outline
                  onClick={() => this.onReset()}
                >
                  Reset
                </Button>
                <hr />
              </div>
            ) : null}
            <div className="nameUnitChange">
              <div style={{ padding: '2px' }}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>name</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    data-testid="nameInput"
                    type="text"
                    placeholder="Name"
                    onChange={this.onNameChange}
                    value={this.state.name}
                  />
                </InputGroup>
                <div className="buttonSetNameUnit">
                  <Button
                    style={{ whiteSpace: 'nowrap' }}
                    id="deleteButton"
                    color="primary"
                    onClick={() =>
                      this.props.onSetName(this.props.index, this.state.name)
                    }
                  >
                    Set
                  </Button>
                  <Button
                    style={{ whiteSpace: 'nowrap', marginLeft: '8px' }}
                    id="deleteButton"
                    color="primary"
                    onClick={() => this.props.onSetAllName(this.state.name)}
                  >
                    Set all
                  </Button>
                </div>
              </div>
              <div style={{ padding: '2px' }}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Unit</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    data-testid="unitInput"
                    tpye="text"
                    placeholder="Unit"
                    onChange={this.onUnitChange}
                    value={this.state.unit}
                  />
                </InputGroup>
                <div className="buttonSetNameUnit">
                  <Button
                    style={{ whiteSpace: 'nowrap' }}
                    id="deleteButton"
                    color="primary"
                    onClick={() =>
                      this.props.onSetUnit(this.props.index, this.state.unit)
                    }
                  >
                    Set
                  </Button>
                  <Button
                    style={{ whiteSpace: 'nowrap', marginLeft: '8px' }}
                    id="deleteButton"
                    color="primary"
                    onClick={() => this.props.onSetAllUnit(this.state.unit)}
                  >
                    Set all
                  </Button>
                </div>
              </div>
            </div>

            <hr />
            <Button
              color="danger"
              block
              className="m-0"
              outline
              onClick={() => this.onDelete()}
            >
              Delete
            </Button>
          </Card>
        ) : null}
      </div>
    );
  }
}
export default DropdownPanel;
