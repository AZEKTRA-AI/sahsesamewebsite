import BlogPostForm from '@/components/admin/forms/BlogPostForm'

export default function CreateBlogPostPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-sah-charcoal mb-8">New post</h1>
      <BlogPostForm />
    </div>
  )
}
