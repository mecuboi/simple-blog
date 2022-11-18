
const postBlogFunction = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    

    if (title && content) {
  
      const response = await fetch(`/api/blogs/`, {
        method: 'POST',
        body: JSON.stringify({ 
            title,
            content
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        //redirect to upload image page
        document.location.replace('/dashboard');
      } else {
        alert('Please fill in the empty space');
      }
    }
  };



  document
  .querySelector('.post-blog-form')
  .addEventListener('submit', postBlogFunction);

