import { Container, PostForm } from "../components"

function AddPost() {
  return (
    <div className="bg-secondary-100 min-h-screen py-12">
      <Container>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-secondary-900 mb-6 text-center">Create a New Post</h1>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost

