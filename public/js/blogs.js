const addNewComment = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector('#new-comment').value.trim();
    const urlSplit = window.location.pathname.split('/')
    const blogId = urlSplit[2]

    if (body) {
  
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ body, blog_id: blogId}),
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
  
  document
    .querySelector('#comment-form')
    .addEventListener('submit', addNewComment);

