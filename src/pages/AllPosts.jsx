"use client"

import { useState, useEffect } from "react"
import { Container, PostCard } from "../components"
import appwriteService from "../appwrite/config"

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className="bg-secondary-100 min-h-screen py-12">
      <Container>
        <h1 className="text-4xl font-bold text-secondary-900 mb-8 text-center">All Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

export default AllPosts

