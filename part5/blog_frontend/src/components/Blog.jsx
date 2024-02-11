const Blog = ({ blog }) => (
  <div style={{color: "green"}}>
    <span style={{color: "navy"}}>{blog.title}</span> - {blog.author}
  </div>  
)

export default Blog