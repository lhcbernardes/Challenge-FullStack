import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import querySearch from "stringquery";
import classNames from "classnames";
import PropTypes from "prop-types";

import { Form, File } from "./styles";

import api from "../../services/api";

class AddProperty extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  state = {
    title: "",
    about: "",
    error: "",
    files: []
  };

  componentDidMount() {
    const params = querySearch(this.props.location.search);
    if (
      !params.hasOwnProperty("latitude") ||
      !params.hasOwnProperty("longitude")
    ) {
      alert("É necessário definir a latitude e longitude para um imóvel.");
      this.props.history.push("/app");
    }

    this.setState({ ...params });
  }


  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { title, about, latitude, longitude } = this.state;

      if (!title || !about || !latitude || !longitude) {
        this.setState({ error: "Preencha todos os campos" });
        return;
      }

      const {
        data: { id }
      } = await api.post("/properties", {
        title,
        about,
        latitude,
        longitude
      });


      this.props.history.push("/app");
    } catch (err) {
      this.setState({ error: "Ocorreu algum erro ao adicionar o imóvel" });
    }
  };

  handleCancel = e => {
    e.preventDefault();

    this.props.history.push("/app");
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Adicionar local</h1>
        <hr />
        {this.state.error && <p>{this.state.error}</p>}
        <input
          type="text"
          placeholder="Título"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Sobre"
          onChange={e => this.setState({ about: e.target.value })}
        />
        <div className="actions">
          <button type="submit">Adicionar</button>
          <button onClick={this.handleCancel} className="cancel">
            Cancelar
          </button>
        </div>
      </Form>
    );
  }
}

export default withRouter(AddProperty);
