import React from "react";
import { Alert, Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";
import { useAddStudentMutation } from "../../redux/services/studentform";

export const Registration = () => {
    const objNavigate = useNavigate();

    const [addStudent, {isLoading, isError} ] = useAddStudentMutation();

    const languageList = ["Tamil", "English", "Hindi"];

    const [studentName, setStudentName] = React.useState('');
    const [studentGender, setStudentGender] = React.useState('');
    const [studentDob, setStudentDob] = React.useState(new Date());
    const [studentAddress, setStudentAddress] = React.useState('');
    const [updatedList, setLanguage] = React.useState([]);

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        if (event.target.checked) {
            updatedList.push(event.target.value);
        } else {
            updatedList.splice(updatedList.indexOf(event.target.value), 1);
        }
        setLanguage(updatedList);
    };

    const btnSave = () => {
        addStudent({
            name: studentName,
            gender: studentGender,
            dob: studentDob,
            address: studentAddress,
            languages_known: updatedList.toString() 
            //selectedLanguage.substring(1,selectedLanguage.length - 1)
        }).then(res => {
            if (res.data) {
                alert('New student information added to complete the registration.');
                objNavigate(AppRoutes.students);
            }
        });
    }

    const btnBack = () => {
        objNavigate(AppRoutes.students);
    }

    return (<div style={{margin: "10px"}}>
        <Stack direction="horizontal" gap={3}>
            <h2 className="me-auto">New Student Registration</h2>
            <Button onClick={btnSave} variant="primary" disabled={isLoading}>Save</Button>
            <Button onClick={btnBack} variant="outline-primary">Back</Button>
        </Stack>

        <br/>
        <br/>
        <br/>
    
        <Container className="mt-5 form-container">
            <h6 style={{textDecoration: "underline", fontWeight: "bold"}}>Provide new student details:</h6>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label column sm={4} className="reg-form-lbl">
                        Name
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control required type="text" placeholder="Enter name" maxLength={100}
                                value={studentName} onChange={(e) => { setStudentName(e.target.value)}}/>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} controlId="formHorizontalGender">
                    <Form.Label column sm={4} className="reg-form-lbl">
                        Gender
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Select required placeholder="Select gender"
                            value={studentGender} onChange={(e) => { setStudentGender(e.target.value)}}>
                            <option>Choose...</option>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} controlId="formHorizontalDoB">
                    <Form.Label column sm={4} className="reg-form-lbl">
                        DoB
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control required type="date"
                                value={studentDob} onChange={(e) => { setStudentDob(e.target.value)}}/>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} controlId="formHorizontalAddress">
                    <Form.Label column sm={4} className="reg-form-lbl">
                        Address
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control required type="textarea" placeholder="Enter address" maxLength={1000}
                                value={studentAddress} onChange={(e) => { setStudentAddress(e.target.value)}}/>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} controlId="formHorizontalLanguages">
                    <Form.Label column sm={4} className="reg-form-lbl">
                        Languages Known
                    </Form.Label>
                    <Col sm={6}>
                        {languageList.map((item, index) => (
                            <span key={index}>
                                <input 
                                    value={item} 
                                    type="checkbox" 
                                    onChange={handleCheck}
                                    className="inputCls"
                                    >
                                </input>
                                <label>{item}</label>
                            </span>
                        ))}
                    </Col>
                </Form.Group>
            </Form>
        </Container>

        {isError && <Alert variant={'danger'}>
            Something went wrong. Student details are not registered.</Alert>}

    </div>);
}