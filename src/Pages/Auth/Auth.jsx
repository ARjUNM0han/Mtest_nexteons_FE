import React, { useState, useContext } from 'react'
import './style.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { register, login } from '../../Services/allApi';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';


function Auth() {

    const [registerStatus, setRegisterStatus] = useState(false)
    const [userDetails, setUserDetails] = useState({
        username: '', password: '', email: ''
    })
    const navigate = useNavigate()
    const { setAuthStatus } = useContext(authContext)


    const changeLoginState = () => {
        setRegisterStatus(!registerStatus)
    }

    const userRegister = async () => {
        // console.log(userDetails)
        const { username, password, email } = userDetails
        if (!username || !password || !email) {
            toast.warning('Fill all valid inputs')
        } else {
            try {
                const result = await register(userDetails);
                if (result.status === 201) {
                    toast.success('User Registration Complete');
                    changeLoginState();
                } else {
                    toast.error(result.response.data);
                    console.log(result, 'user registration');
                }
            } catch (error) {
                toast.error('Registration failed');
                console.log(error, 'user registration');
            } finally {
                setUserDetails({
                    username: '', password: '', email: ''
                });
            }

        }
    }

    const userLogin = async () => {
        const { password, email } = userDetails
        if (!password || !email) {
            toast.warning('Fill all valid inputs')
        } else {
            const result = await login(userDetails)
            // console.log(result)
            if (result.status == 200) {
                setUserDetails({
                    password: '', email: ''
                })
                sessionStorage.setItem('token', result.data.token)
                sessionStorage.setItem('username', result.data.username)
                setAuthStatus(true)
                navigate('/home')
            } else {
                toast.error('login failed')
            }
        }
    }
    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                {registerStatus &&
                                    <div className="form-outline mb-4">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Username"
                                            className="mb-3 "
                                            placeholder="Enter a valid username"
                                            value={userDetails.username}
                                            onChange={(e) => (setUserDetails({ ...userDetails, username: e.target.value }))}
                                        >
                                            <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </div>
                                }


                                <div className="form-outline mb-4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                        className="mb-3 "
                                        placeholder="Enter a valid email address"
                                        value={userDetails.email}
                                        onChange={(e) => (setUserDetails({ ...userDetails, email: e.target.value }))}

                                    >
                                        <Form.Control type="email" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </div>

                                <div className="form-outline mb-3">
                                    <FloatingLabel controlId="floatingPassword" label="Password">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={userDetails.password}
                                            onChange={(e) => (setUserDetails({ ...userDetails, password: e.target.value }))}
                                        />
                                    </FloatingLabel>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    {registerStatus ?
                                        <>
                                            <button
                                                type="button"
                                                data-mdb-button-init=""
                                                data-mdb-ripple-init=""
                                                className="btn btn-primary btn-lg"
                                                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                                onClick={userRegister}
                                            >
                                                Register
                                            </button>
                                            <p className="small fw-bold mt-2 pt-1 mb-0">
                                                Already have an account?{" "}
                                                <a className="link-danger" onClick={changeLoginState}>
                                                    Login
                                                </a>
                                            </p>
                                        </>
                                        :
                                        <>
                                            <button
                                                type="button"
                                                data-mdb-button-init=""
                                                data-mdb-ripple-init=""
                                                className="btn btn-primary btn-lg"
                                                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                                onClick={userLogin}
                                            >
                                                Login
                                            </button>
                                            <p className="small fw-bold mt-2 pt-1 mb-0">
                                                Don't have an account?{" "}
                                                <a className="link-danger" onClick={changeLoginState}>
                                                    Register
                                                </a>
                                            </p>

                                        </>
                                    }

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

export default Auth