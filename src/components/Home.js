import React from 'react'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Home = () => {



    const [user, setUser] = useState({});
    console.log(user.email);
    const [show, setShow] = useState(false);

    const [pass, setPass] = useState("");

    function handelCallbackResponse(response) {

        let userObject = jwt_decode(response.credential);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;

    }
    function handelSignOut(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;

    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "943694526017-1nbf1kubtvkl2r203t8g4e0mmtnolmd2.apps.googleusercontent.com",
            callback: handelCallbackResponse

        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" },

        )

        google.accounts.id.prompt();
    }, [])


    const sendEmail = async (e) => {

        e.preventDefault();

        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user, pass
            })
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 401 || !data) {
            console.log("error")
        } else {
            setShow(true);
            setPass("")
            console.log("Email sent")
        }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <div>
                            <div id='signInDiv'></div>

                            {
                                user && <div>
                                    <img className=' rounded-circle' src={user.picture} alt="" />
                                    <span className='text-white px-2'>{user.name}</span>
                                </div>
                            }
                            {
                                Object.keys(user).length !== 0 && <button className='text-primary ms-5 rounded' onClick={handelSignOut}>
                                    Logout
                                </button>
                            }
                        </div>

                    </Nav>
                </Container>
            </Navbar>



            <div className="container m-2">
                <div className='d-flex justify-content-center'>
                    <h2>Send Email With nodemailer </h2>
                    <img src="/gmail.png" alt="gmail img" className='mx-3' style={{ width: "50px" }} />
                </div>
                <div className="d-flex justify-content-center">
                    <Form className='mt-2 col-lg-6'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Your app Password</Form.Label>
                            <Form.Control type="password" name='text' value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter Message" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={sendEmail}>
                            Send
                        </Button>
                    </Form>
                </div>

            </div>


            {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Your Email Succesfully Send
                </Alert> : ""
            }

        </>
    )
}

export default Home