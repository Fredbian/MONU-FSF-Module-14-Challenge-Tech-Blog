const addBlog = async (e) => {
    e.preventDefault()

    const title = document.querySelector('input[name="blog-title"]').value
    
    const blog_body = document.querySelector('textarea[name="blog-body"]').value.trim()

    const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            blog_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    } 
}

document.querySelector('#add-blog-form').addEventListener('submit', addBlog)