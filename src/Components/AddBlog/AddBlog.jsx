import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addBlogApi } from '../../Services/allApi';
import { blogChangeContext } from '../../Context/BlogChangeContext';
function AddBlog() {

    const [blog, setBlog] = useState({
        title: '', content: '', description: ''
    })
    const { blogChange, setBlogChange } = useContext(blogChangeContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddBlog = async () => {

        const { title, description, content } = blog

        if (!title || !description || !content) {
            toast.warning('fill all valid inputs')
        } else {

            const header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }

            const result = await addBlogApi(blog, header)
            if (result.status == 201) {
                toast.success('Blog Created Successfully')
                setBlog({
                    title: '', content: '', description: ''
                })
                setBlogChange(!blogChange)
                handleClose()
            } else {
                toast.error('internal server error')
                setBlog({
                    title: '', content: '', description: ''
                })
                handleClose()
            }
        }

    }

    return (
        <>
            <button className='btn btn-success' onClick={handleShow}>
                Add Blog
            </button>

            <Modal
                show={show}
                size='xl'
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Blog Title"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="blog title"
                            onChange={(e) => (setBlog({ ...blog, title: e.target.value }))}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Description"
                        className="mb-3"
                    >
                        <Form.Control
                            as="textarea" placeholder="A short description for blog"
                            onChange={(e) => (setBlog({ ...blog, description: e.target.value }))}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Content"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" placeholder="Content"
                            onChange={(e) => (setBlog({ ...blog, content: e.target.value }))}
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleAddBlog}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddBlog