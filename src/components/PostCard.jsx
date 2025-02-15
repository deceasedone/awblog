import appwriteService from "../appwrite/config"
import { Link } from "react-router-dom"

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={appwriteService.getFilePreview(featuredImage) || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard

