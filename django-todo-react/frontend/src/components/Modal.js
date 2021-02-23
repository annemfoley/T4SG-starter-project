// frontend/src/components/Modal.js

import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
            <div></div>
            <h5>Labels:</h5>
            <FormGroup check>
              <Label for="time_sensitive">
                <Input
                  type="checkbox"
                  name="time_sensitive"
                  checked={this.state.activeItem.time_sensitive}
                  onChange={this.handleChange}
                />
                Time Sensitive
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label for="on_hold">
                <Input
                  type="checkbox"
                  name="on_hold"
                  checked={this.state.activeItem.on_hold}
                  onChange={this.handleChange}
                />
                On Hold
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label for="low_energy">
                <Input
                  type="checkbox"
                  name="low_energy"
                  checked={this.state.activeItem.low_energy}
                  onChange={this.handleChange}
                />
                Low Energy
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}