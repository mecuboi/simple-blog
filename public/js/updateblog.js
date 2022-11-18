const updateBlogFunction = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    const blogId = document.querySelector('#blog-id').value;

    if (title && content) {
  
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify({ 
            title,
            content
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {

        document.location.replace('/dashboard');
      } else {
        alert('Please fill in the empty space');
      }
    }
  };

  document
  .querySelector('.update-blog-form')
  .addEventListener('submit', updateBlogFunction);