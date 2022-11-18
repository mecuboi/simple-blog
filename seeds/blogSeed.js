const { Blog } = require('../models');

const savedBlogsArray = [
    {
		title: 'How to excel in your coding bootcamp',
		content: `You must've clicked on this blog thinking that there is an easy way to pass your coding class. Let me tell you a secret, there are no easy way to pass this course. You are stuck with this course until next year and all you gotta do to pass is keep hustling until you make it. Good luck to whoever is reading this blog post`,
		user_id: 1
	},
	{
		title: `Don't bother reading the blog post above`,
		content: `As the title have suggested. Please do not mind the blog post above. But why are you even reading this blog post too? This blog post is even more random than the one above. This is just random writing to make sure that it looks like a legit blog post with educational info, where in actual fact it's just a paragraph of nonsense!`,
		user_id: 2
	},
];

const seedBlogs = () => Blog.bulkCreate(savedBlogsArray);

module.exports = seedBlogs