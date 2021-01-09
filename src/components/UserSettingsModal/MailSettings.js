import React, { Component } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import { validateEmail } from './../../services/helpers';
import { changeUserMail } from './../../services/ApiServices/AuthentificationServices';

class MailSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: undefined,
      confirmationEmail: undefined,
      emailError: undefined
    };
    this.onNewEmailChange = this.onNewEmailChange.bind(this);
    this.onConfirmationEmailChange = this.onConfirmationEmailChange.bind(this);
    this.onEmailChangeSubmit = this.onEmailChangeSubmit.bind(this);
  }

  onNewEmailChange(e) {
    this.setState({
      newEmail: e.target.value
    });
  }
  onConfirmationEmailChange(e) {
    this.setState({
      confirmationEmail: e.target.value
    });
  }

  onEmailChangeSubmit() {
    if (!this.state.newEmail && !this.state.confirmationEmail) return;
    if (this.state.newEmail !== this.state.confirmationEmail) {
      this.setState({
        emailError: 'E-mails do not match'
      });
    } else if (!validateEmail(this.state.newEmail)) {
      this.setState({
        emailError: 'Not a valid e-mail format'
      });
    } else {
      changeUserMail(this.state.newEmail).then(data => window.alert(data));
    }
  }

  render() {
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>E-Mail</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="New e-mail" onChange={this.onNewEmailChange} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>E-Mail</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Retype new e-mail"
            onChange={this.onConfirmationEmailChange}
          />
        </InputGroup>
        <Button
          color="primary"
          className="m-1 mr-auto"
          onClick={this.onEmailChangeSubmit}
        >
          Save new e-mail
        </Button>
        {this.state.emailError ? (
          <div
            style={{
              display: 'inline',
              color: 'red',
              marginLeft: '16px'
            }}
          >
            {this.state.emailError}
          </div>
        ) : null}
      </div>
    );
  }
}

export default MailSettings;
