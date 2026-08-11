/**
 * Renders a structured-data script tag. Search engines read this regardless
 * of where it sits in the DOM — it doesn't need to be in <head>.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
