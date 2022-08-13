const dashboardAddBlog = async (e) => {
    e.preventDefault()

    document.location.replace('/dashboard/new')
}

document.querySelector('#new-blog').addEventListener('click', dashboardAddBlog)