import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import BlogPostForm from '@/components/admin/forms/BlogPostForm'

async function getPost(id: string) {
  return await prisma.blogPost.findUnique({ where: { id } })
}

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  if (!post) notFound()

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-2">{post.title}</h1>
      <p className="mb-8 text-gray-600">
        Created {new Date(post.createdAt).toLocaleDateString()}
        {post.publishedAt && ` · Published ${new Date(post.publishedAt).toLocaleDateString()}`}
      </p>
      <BlogPostForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? '',
          content: post.content,
          coverImage: post.coverImage ?? '',
          coverImageAlt: post.coverImageAlt ?? '',
          status: post.status,
        }}
      />
    </div>
  )
}
