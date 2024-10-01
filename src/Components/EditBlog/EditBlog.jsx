import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { editBlogApi } from '../../Services/allApi';
import { toast } from 'react-toastify';
import { blogChangeContext } from '../../Context/BlogChangeContext';
function EditBlog({ blog: initialBlog }) {


    const [blog, setBlog] = useState({ ...initialBlog })
    const [show, setShow] = useState(false);
    const { changeBlog, setBlogChange } = useContext(blogChangeContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const hanldeEditBlog = async () => {
        const { title, description, content } = blog
        if (!title || !description || !content) {
            toast.warning('fill valid inputs')
        } else {
            const header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const result = await editBlogApi(blog._id, blog, header)
            if (result.status == 200) {
                setBlog({ ...initialBlog })
                handleClose()
                setBlogChange(!changeBlog)
                toast.success('Updated Successfully')
            } else {
                toast.error('internal server error')
                handleClose()
                console.log('update blog error', result)
            }
        }
    }
    return (
        <>
            <button className='btn btn-info w-45' onClick={handleShow}>
                Edit
            </button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
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
                            value={blog.title}
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
                            value={blog.description}
                            onChange={(e) => (setBlog({ ...blog, description: e.target.value }))}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Content"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" placeholder="Content"
                            value={blog.content}
                            onChange={(e) => (setBlog({ ...blog, content: e.target.value }))}
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={hanldeEditBlog}>save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditBlog