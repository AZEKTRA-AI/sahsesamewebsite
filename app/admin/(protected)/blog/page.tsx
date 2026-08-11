import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import ContentEditor from '@/components/admin/ContentEditor'
import BlogPostRowActions from '@/components/admin/BlogPostRowActions'
import { globalFeaturesBlock } from '@/lib/content/blocks'

async function getPosts() {
  return await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function BlogAdmin() {
  const posts = await getPosts()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-sah-charcoal">Blog</h1>
        <Link
          href="/admin/blog/create"
          className="bg-sah-green text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
        >
          + New Post
        </Link>
      </div>

      <div className="max-w-3xl mb-8">
        <ContentEditor block={globalFeaturesBlock} defaultOpen />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Slug</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Updated</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No posts yet. Create one to get started.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">{post.slug}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <BlogPostRowActions id={post.id} title={post.title} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
