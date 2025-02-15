"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/config"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from "react-redux"

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate("/")
      })
    } else navigate("/")
  }, [slug, navigate])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate("/")
      }
    })
  }

  return post ? (
    <div className="bg-secondary-100 min-h-screen py-12">
      <Container>
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={appwriteService.getFilePreview(post.featuredImage) || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            {isAuthor && (
              <div className="absolute right-4 top-4 space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-primary-500 hover:bg-primary-600">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500 hover:bg-red-600" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-4">{post.title}</h1>
            <div className="prose max-w-none text-secondary-700">{parse(post.content)}</div>
          </div>
        </article>
      </Container>
    </div>
  ) : null
}

