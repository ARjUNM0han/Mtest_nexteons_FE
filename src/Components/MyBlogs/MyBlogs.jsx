import React, { useEffect, useState, useContext } from 'react'
import AddBlog from '../AddBlog/AddBlog'
import { getUserBlogsApi, deleteBlogApi } from '../../Services/allApi'
import EditBlog from '../EditBlog/EditBlog'
import { toast } from 'react-toastify'
import { blogChangeContext } from '../../Context/BlogChangeContext'
function MyBlogs() {

    const [userBlogs, setUserBlogs] = useState([])
    const { blogChange } = useContext(blogChangeContext)
    useEffect(() => {
        handleUserBlogs()
    }, [blogChange])
    const handleUserBlogs = async () => {
        const header = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
        const result = await getUserBlogsApi(header)
        if (result.status == 200) {
            setUserBlogs(result.data)
        } else {
            console.log('user blogs retrival', result)
        }
    }

    const handleBlogDeleteion = async (id) => {
        const header = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }

        const result = await deleteBlogApi(id, header)
        if (result.status == 200) {
            toast.success('blog deleted successfully')
            handleUserBlogs()
        } else {
            toast.error('internal server error')
        }
    }
    return (
        <div>
            <div className='d-flex justify-content-between p-2'>
                <h4>
                    My Blogs
                </h4>
                <AddBlog />
            </div>



            <div className='p-3'>
                {userBlogs && userBlogs.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {userBlogs.map((blog) => (
                            <div className="col" key={blog._id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{blog?.title}</h5>
                                        <p className="card-text">{blog?.content}</p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between ">
                                        <EditBlog blog={blog} />
                                        <button className='btn btn-danger w-45' onClick={() => (handleBlogDeleteion(blog._id))}>
                                            <small> delete</small>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center'>
                        <h5>No Blogs Added Yet!!</h5>
                    </div>
                )}
            </div>

        </div>
    )
}

export default MyBlogs