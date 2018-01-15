import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'

import { Container, Row, Col } from 'reactstrap'
// import styles from './Resources.css'
import Modal from '../../UI/Modal/Modal'

import Resource from './Resource/Resource'
import CreateResource from './CreateResource/CreateResource'
import EditResource from './EditResource/EditResource'
import ResourcesList from './ResourcesList/ResourcesList'

class Resources extends Component {
  state = {
    resource: '',
    showResource: false,
    showResourcesList: true,
    createResource: false,
    editResource: false
  }

  componentDidMount() {
    this.props.onFetchResources();
  }

  showResourcesListToggler = () => {
    let toggle = this.state.showResourcesList
    this.setState({ showResourcesList: !toggle })
  }

  //********SHOW_RESOURCE form handling**************************
  showResourceClose = () => {
    this.setState({ showResource: false })
  }

  //********CREATE_RESOURCE form handling **************************
  createResourceForm = () => {
    this.setState({ createResource: true })
  }

  createResourceFormCancel = () => {
    this.setState({ createResource: false })
  }

  createResource = (newResourceData) => {
    this.props.onCreateResource(newResourceData)
    this.setState({ createResource: false })
  }

  //********EDIT_RESOURCE form handling**************************
  showEditResourceForm = (id) => {
    let resourceData = this.props.resources.filter(resource => resource.id === id)[0]
    this.setState({
      resource: resourceData,
      editResource: true
    })
  }

  editResourceUpdate = (data) => {
    this.props.onUpdateResource(data)
    this.setState({
      editResource: false,
      resource: null
    })
  }

  closeEditResourceForm = () => {
    this.setState({
      editResource: false,
      resource: null
    })
  }

  render() {
    const { match, resources } = this.props;
    let clickableNames = resources.map((resource, index) => {
      return (
        <Link to={`/resources/${resource.id}`}
          style={{ marginRight: '12px' }}
          key={resource.id}
          onClick={() => this.setState({ showResourcesList: false })}
        >{resource.title}
        </Link>
      )
    })

    return (
      <Container>
        <hr />
        <h4>Resources</h4>
        <button onClick={() => this.showResourcesListToggler()}>Toggle ALL</button>

        {/*********CREATE RESOURCE MODAL********************************************/}
        <button onClick={this.createResourceForm}>Add Resource</button>
        <Modal
          show={this.state.createResource}
          modalClosed={this.createResourceFormCancel}>
          <CreateResource
            createResource={(newResourceData) => this.createResource(newResourceData)}
            createResourceCancel={this.createResourceFormCancel} />
        </Modal>

        {/**********EDIT RESOURCE MODAL**********************************************/}
        <Modal
          show={this.state.editResource}
          modalClosed={this.closeEditResourceForm}>
          {this.state.resource ? <EditResource
            id={this.state.resource.id}
            title={this.state.resource.title}
            category={this.state.resource.category}
            description={this.state.resource.description}
            format={this.state.resource.format}
            location={this.state.resource.location}
            url={this.state.resource.url}
            close={() => this.closeEditResourceForm()}
            updateResource={(data) => this.editResourceUpdate(data)}
          /> : null}
        </Modal>

        {/**********CLICKABLE NAMES**********************************************/}
        <Container>
          <Row>
            <Col>
              {clickableNames}
            </Col>
          </Row>
        </Container>

        {/**********RESOURCES LIST**********************************************/}
        <div>
          {this.state.showResourcesList ? <ResourcesList
            resources={resources}
            show={(id) => this.state.showResource(id)}
            edit={(id) => this.showEditResourceForm(id)}
            delete={(id) => this.props.onDeleteResource(id)}
            close={() => this.showResourcesListToggler()}
          /> : null}
        </div>

        <Switch>
          <Route path={`${match.url}/:id/edit`} exact component={EditResource} />
          <Route path={`${match.url}/new`} exact component={CreateResource} />
          <Route path={`${match.url}/:id`} exact component={Resource} />
          <Route path={match.url} exact render={() => (<p>Toggle ALL or click a Resource from the list.</p>)} />
        </Switch>
        <hr />
      </Container>
    )
  }
};

const mapStateToProps = state => {
  return {
    resources: state.res.resources
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchResources: () => dispatch(actionCreators.fetchResources()),
    onCreateResource: (data) => dispatch(actionCreators.createResource(data)),
    onUpdateResource: (data) => dispatch(actionCreators.updateResource(data)),
    onDeleteResource: (id) => dispatch(actionCreators.deleteResource(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
