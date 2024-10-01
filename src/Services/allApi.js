import base_url from './base_url'
import commonApi from './commonApi'

export const register = async (data) => {
    return await commonApi("POST", `${base_url}/register`, data, '')
}
export const login = async (data) => {
    return await commonApi("POST", `${base_url}/login`, data, '')
}

export const allBlogs = async () => {
    return await commonApi('GET', `${base_url}/all-blogs`, '', '')
}
export const getUserBlogsApi = async (header) => {
    return await commonApi('GET', `${base_url}/get-user-blogs`, '', header)
}


export const addBlogApi = async (data, header) => {
    return await commonApi("POST", `${base_url}/add-blog`, data, header)
}

export const editBlogApi = async (id, data, header) => {
    return await commonApi("PATCH", `${base_url}/edit-blog/${id}`, data, header)
}
export const deleteBlogApi = async (id,  header) => {
    return await commonApi("DELETE", `${base_url}/delete-blog/${id}`, '', header)
}