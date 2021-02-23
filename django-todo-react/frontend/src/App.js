import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      filters: {
        time_sensitive: false,
        on_hold: false,
        low_energy: false,
      },
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
        time_sensitive: false,
        on_hold: false,
        low_energy: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
    this.refreshFilters();
  }

  refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  refreshFilters = () => {
    axios
      .get("/api/filters/1/")
      .then((res) => this.setState({ filters: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false, time_sensitive: false, on_hold: false, low_energy: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  toggleFilter = e => {
    let { name, value } = e.target;
    value = e.target.checked;
    const filters = { ...this.state.filters, [name]: value };
    this.setState({ filters });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted , filters } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );
    
    let filtered_items = newItems;
    if(filters.time_sensitive){
      filtered_items = filtered_items.filter(
        (item) => item.time_sensitive === true
      );
    }
    if(filters.on_hold){
      filtered_items = filtered_items.filter(
        (item) => item.on_hold === true
      );
    }
    if(filters.low_energy){
      filtered_items = filtered_items.filter(
        (item) => item.low_energy === true
      );
    }

      return filtered_items.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center text-red"
        >
          <span
            className={`todo-title mr-2 ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.description}
          >
            {item.title}
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editItem(item)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}
            >
              Delete
            </button>
          </span>
        </li>
      ));
  };



  renderFilters = () => {
    return (
      <>
        <div className='custom-control custom-switch'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='customSwitch1'
            name='time_sensitive'
            value={this.state.filters.time_sensitive}
            onChange={this.toggleFilter}
          />
          <label className='custom-control-label' htmlFor='customSwitch1'>
            Time Sensitive
          </label>
        </div>
  
        <div className='custom-control custom-switch'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='customSwitch2'
            name='on_hold'
            value={this.state.filters.on_hold}
            onChange={this.toggleFilter}
          />
          <label className='custom-control-label' htmlFor='customSwitch2'>
            On Hold
          </label>
        </div>

        <div className='custom-control custom-switch'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='customSwitch3'
            name='low_energy'
            value={this.state.filters.low_energy}
            onChange={this.toggleFilter}
          />
          <label className='custom-control-label' htmlFor='customSwitch3'>
            Low Energy
          </label>
        </div>
        
      </>
    );
  };



  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
            <div className="card p-3">
              <h5>Filter by Label:</h5>
            {this.renderFilters()}
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;