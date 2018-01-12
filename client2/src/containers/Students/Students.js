import React, { Component } from 'react'
import * as actionCreators from '../../store/actions/index'
import { connect } from 'react-redux'

import { Table } from 'reactstrap'
import styles from './Students.css'
import Aux from '../../hoc/Aux/Aux'
import Modal from '../../UI/Modal/Modal'

import Student from './Student'
import CreateStudent from './CreateStudent'
import EditStudent from './EditStudent'
// import StudentStats from './StudentStats/StudentStats'

class Students extends Component {
  state = {
    student: null,
    showStudent: false,

    studentDetail: null,
    showStudentDetail: false,

    createStudent: false,
    editStudent: false
  }

  componentDidMount() {
    this.props.onFetchStudents()
  }

  //********CREATE_STUDENT form handling **************************
  createStudentForm = () => {
    this.setState({ createStudent: true })
  }

  createStudentFormCancel = () => {
    this.setState({ createStudent: false })
  }

  createStudent = (newStudentData) => {
    this.props.onStudentCreate(newStudentData)
    this.setState({ createStudent: false })
  }

  //********SHOW_STUDENT form handling**************************
  showStudent = (id) => {
    let student = this.props.students.filter(student => student.id === id)[0]
    this.setState({
      student: student,
      showStudent: true
    })
  }

  showStudentClose = () => {
    this.setState({ showStudent: false })
  }

  //********EDIT_STUDENT form handling**************************
  showEditStudentForm = (id) => {
    let student = this.props.students.filter(student => student.id === id)[0]
    this.setState({
      student: student,
      editStudent: true
    })
  }

  editStudentFalse = () => {
    this.setState({ editStudent: false })
  }

  editStudentUpdate = (data) => {
    this.props.onStudentUpdate(data)
    this.setState({ student: null, editStudent: false })
  }

  render() {
    let studentsList = this.props.students.map(student => {
      return (
        <Aux key={student.id}>
          <tr>
            <td>{student.id}</td>
            <td>{student.firstname}</td>
            <td>{student.lastname}</td>
            <td>{student.email}</td>
            <td><button
              onClick={() => this.showStudent(student.id)}
              className={styles.Success}>Show</button></td>
            <td><button
              onClick={() => this.showEditStudentForm(student.id)}
              className={styles.Edit}>Edit</button></td>
            <td><button
              onClick={() => this.props.onStudentDelete(student.id)}
              className={styles.Danger}>X</button></td>
          </tr>
        </Aux>
      )
    })

    return (
      <Aux>
        <div style={{ margin: '30px' }}>

          {/*********CREATE STUDENT MODAL********************************************/}
          <button onClick={this.createStudentForm}>Add Student</button>
          <Modal
            show={this.state.createStudent}
            modalClosed={this.createStudentFormCancel}>
            <CreateStudent
              createStudent={(newStudentData) => this.createStudent(newStudentData)}
              createStudentCancel={this.createStudentFormCancel} />
          </Modal>

          {/**********SHOW STUDENT MODAL**********************************************/}
          <Modal
            show={this.state.showStudent}
            modalClosed={this.showStudentClose}>
            <Aux>
              {this.state.student ? <Student
                id={this.state.student.id}
                firstname={this.state.student.firstname}
                lastname={this.state.student.lastname}
                email={this.state.student.email}
                level={this.state.student.level}
                teacher_id={this.state.student.teacher_id}
                close={this.showStudentClose}
              /> : <p> No data for student show</p>}
            </Aux>
          </Modal>

          {/**********EDIT STUDENT MODAL**********************************************/}
          <Modal
            show={this.state.editStudent}
            modalClosed={this.editStudentCancelHandler}>
            <Aux>
              {this.state.student ? <EditStudent
                id={this.state.student.id}
                firstname={this.state.student.firstname}
                lastname={this.state.student.lastname}
                email={this.state.student.email}
                level={this.state.student.level}
                teacher_id={this.state.student.teacher_id}
                close={this.editStudentFalse}
                updateStudent={(data) => this.editStudentUpdate(data)}
              /> : <p>no student data yet...</p>}
            </Aux>
          </Modal>

          {/**********STUDENTS INDEX TABLE*************************************/}
          <legend>All Students</legend>
          <Table className={styles.Students}>
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
        {/**********STUDENTS StudentStats*************************************/}
        {/* <StudentStats students={this.props.students} /> */}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    students: state.stu.students
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStudentCreate: (newStudentData) => dispatch(actionCreators.createStudent(newStudentData)),
    onStudentUpdate: (data) => dispatch(actionCreators.updateStudent(data)),
    onStudentDelete: (id) => dispatch(actionCreators.deleteStudent(id)),
    onFetchStudents: () => dispatch(actionCreators.fetchStudents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)