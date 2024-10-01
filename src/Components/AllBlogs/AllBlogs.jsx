import React, { useEffect, useState, useContext } from 'react'
import { allBlogs } from '../../Services/allApi'
import { blogChangeContext } from '../../Context/BlogChangeContext'
function AllBlogs() {

    const [blogs, setBlogs] = useState([])
    const { changeBlog } = useContext(blogChangeContext)
    useEffect(() => {
        getAllBLogs()
    }, [changeBlog])

    const getAllBLogs = async () => {
        const result = await allBlogs()
        if (result.status == 200) {
            setBlogs(result.data)
        } else {
            console.log(result)
        }
    }
    return (
        <>
            <div className='p-3'>
                {blogs && blogs.length > 0 ?
                    <div>
                        <div className="row row-cols-1 row-cols-md-3 g-4" >
                            {blogs.map((blog) => (
                                <div className="col" key={blog._id}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{blog?.title}</h5>
                                            <p className="card-text">
                                                {blog?.content}
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Author :{blog?.author?.username} </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <div className='text-center'>
                        <h5>No Blogs Added Yet!!</h5>
                    </div>
                }


            </div>
        </>
    )
}

export default AllBlogs