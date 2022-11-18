const addNewComment = async (event) => {
    event.preventDefault();

    const body = document.querySelector('#new-comment').value.trim();
    blogId = document.querySelector('#blog-post').value



    if (body) {

        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ body, blog_id: blogId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();


        } else {
            alert(response.statusText);
        }
    } else {
        alert("Please type in your comment")
    }
};

const deletePost = async (event) => {

    const blogId = document.querySelector('#delete-button').value

    const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');


    } else {
        alert(response.statusText);
    }

};

const updatePost = () => {
    document.location.replace('/update')
};


document
    .querySelector('#comment-form')
    .addEventListener('submit', addNewComment);

document
    .querySelector('#delete-button')
    .addEventListener('click', deletePost);

document
    .querySelector('#update-button')
    .addEventListener('click', updatePost);