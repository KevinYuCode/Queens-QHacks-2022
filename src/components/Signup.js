import React, { useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import "../styles/Signup.css"

function Signup() {

const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()
const {signup, currentUser} = useAuth()
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
const history = useNavigate()

async function handleSubmit(e){
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value)
    {
        return setError('Passwords do not match')
    }

    try {
        setError('')
        setLoading(true)
        await signup(emailRef.current.value,passwordRef.current.value)
        history("/")
    } catch {
        setError('Failed to create an account')
    }

    setLoading(false)
}


    return (
        <>
            <Card className="Signup-card">
                <Card.Body>
                    <h2 className="text-center mb-4"> Sign Up</h2>
                   {currentUser && currentUser.password}
                    {error && <Alert variant="danger"> {error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password (6 characters or longer)</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type = "password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled = {loading} className = "w-100 Signup-button" type = "submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login" className="Signup-link">Log In</Link>

            </div>
        </>
    )
}

export default Signup
