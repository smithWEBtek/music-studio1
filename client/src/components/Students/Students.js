import React, { Component } from 'react';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

import { Table } from 'reactstrap';
import AddStudent from './AddStudent/AddStudent';
import Student from './Student/Student';
import StudentService from './StudentService';
import classes from './Students.css';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../UI/Modal/Modal';

class Students extends Component {
  state = {
    // students: [],
    student: {},
    showStudent: false,
    addingStudent: false
  }

  // componentDidMount() {
  //   console.log('[Students]DidMount this.props.stu', this.props.stu)
  //   //   StudentService.fetchStudents()
  //   //     .then(response => this.setState({ students: response }))
  // }

  // deleteStudentHandler = (id) => {
  //   StudentService.deleteStudent(id);
  //   let students = [...this.state.students];
  //   students = students.filter(student => student.id !== id);
  //   this.setState({ students: students });
  // };

  addStudentHandler = (student) => {
    if (student.name !== "") {
      this.setState({ addingStudent: true })
      StudentService.createStudent(student)
        .then(student => this.setState({
          students: this.props.stu.concat(student)
        })
        )
    }
    this.setState({ addingStudent: false });
  }

  addStudentCancelHandler = () => {
    this.setState({
      addingStudent: false
    });
  }

  showAddStudentModal = () => {
    this.setState({ addingStudent: true });
  }

  showStudentHandler = (id) => {
    StudentService.fetchStudent(id)
      .then(response => this.setState({
        student: response,
        showStudent: true
      })
      );
  }

  showStudentCancelHandler = () => {
    this.setState({
      showStudent: false
    });
  }

  render() {
    const studentsList = this.props.stu.map(student => {
      return (
        <Aux key={student.id}>
          <tr>
            <td>{student.id}</td>
            <td>{student.firstname}</td>
            <td>{student.lastname}</td>
            <td>{student.email}</td>
            <td><button onClick={() => this.showStudentHandler(student.id)}>Show</button></td>
            <td><button>*Edit</button></td>
            <td><button onClick={() => this.props.onStudentRemoved(student.id)}>X</button></td>
          </tr>
        </Aux>
      )
    });

    return (

      <Aux>
        <div style={{ margin: '30px' }}>
          <button onClick={this.showAddStudentModal}>Add Student</button>
          <Modal
            show={this.state.addingStudent}
            modalClosed={this.addStudentCancelHandler}>
            {/* <AddStudent
              addStudent={this.props.onStudentAdded(this.state.student)}
              addStudentCancel={this.addStudentCancelHandler} /> */}
          </Modal>
          <Table className={classes.Students}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
                <th>Show</th>
                <th>Edit</th>
                <th>Del</th>
              </tr>
            </thead>
            <tbody>
              {studentsList}
            </tbody>
          </Table>
        </div>
        <Modal
          show={this.state.showStudent}
          modalClosed={this.showStudentCancelHandler}>
          <Aux>
            <Student
              firstname={this.state.student.firstname}
              lastname={this.state.student.lastname}
              email={this.state.student.email}
              level={this.state.student.level}
              teacher_id={this.state.student.teacher_id}
              close={this.showStudentCancelHandler} />
          </Aux>
        </Modal>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    stu: state.stu.students
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStudentAdded: (data) => dispatch({ type: actionTypes.ADD_STUDENT, studentData: data }),
    onStudentRemoved: (id) => dispatch({ type: actionTypes.REMOVE_STUDENT, studentId: id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);
