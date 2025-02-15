"use client"

import { useEffect, useState } from "react"
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components"

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-secondary-900 mb-4">Welcome to our Blog</h1>
            <p className="text-xl text-secondary-700 mb-8">Login to read posts or start writing your own!</p>
            <a
              href="/login"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Login
            </a>
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div className="bg-secondary-100 min-h-screen py-12">
      <Container>
        <h1 className="text-4xl font-bold text-secondary-900 mb-8 text-center">Latest Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="transform hover:scale-105 transition duration-300">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home

