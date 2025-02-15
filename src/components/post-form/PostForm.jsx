"use client"

import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, RTE, Select } from ".."
import appwriteService from "../../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    try {
      data.content = typeof data.content === "string" ? data.content.slice(0, 300) : ""

      if (post) {
        const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

        if (file) {
          await appwriteService.deleteFile(post.featuredImage)
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      } else {
        const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

        if (file) {
          const fileId = file.$id
          data.featuredImage = fileId
          const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id })

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
          }
        }
      }
    } catch (error) {
      console.error("Error in submit function:", error)
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")

    return ""
  }, [])

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Input label="Title" placeholder="Enter post title" {...register("title", { required: true })} />
          <Input
            label="Slug"
            placeholder="post-slug"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
            }}
          />
          <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="space-y-4">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && post.featuredImage && (
            <div className="w-full">
              <img
                src={appwriteService.getFilePreview(post.featuredImage) || "/placeholder.svg"}
                alt={post.title}
                className="rounded-lg object-cover w-full h-48"
              />
            </div>
          )}
          <Select options={["active", "inactive"]} label="Status" {...register("status", { required: true })} />
          <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full">
            {post ? "Update" : "Create"} Post
          </Button>
        </div>
      </div>
    </form>
  )
}

