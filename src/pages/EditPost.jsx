"use client"

import { useEffect, useState } from "react"
import { Container, PostForm } from "../components"
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from "react-router-dom"

function EditPost() {
  const [post, setPosts] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post)
        }
      })
    } else {
      navigate("/")
    }
  }, [slug, navigate])

  return post ? (
    <div className="bg-secondary-100 min-h-screen py-12">
      <Container>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-secondary-900 mb-6 text-center">Edit Post</h1>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null
}

export default EditPost

