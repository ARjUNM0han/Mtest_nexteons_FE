import React, { createContext, useState } from 'react'

export const blogChangeContext = createContext()
function BlogChangeContext({ children }) {
    const [blogChange, setBlogChange] = useState(false)
    return (
        <>
            <blogChangeContext.Provider value={{ blogChange, setBlogChange }}>
                {children}
            </blogChangeContext.Provider>
        </>
    )
}

export default BlogChangeContext