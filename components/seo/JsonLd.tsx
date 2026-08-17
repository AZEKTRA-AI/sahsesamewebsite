/**
 * Renders a structured-data script tag. Search engines read this regardless
 * of where it sits in the DOM — it doesn't need to be in <head>.
 *
 * JSON.stringify does not escape "<", ">", or "&", so a raw string value
 * (e.g. </script><script>...) could break out of the script tag. Escape
 * those to their unicode equivalents, which JSON parsers treat identically.
 */
function escapeJsonLd(json: string) {
  return json.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(data)) }}
    />
  )
}
