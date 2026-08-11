import PageRenderer from '@/components/PageRenderer'

// Belt-and-suspenders alongside the admin's explicit revalidatePath calls:
// this page is otherwise statically generated with no time-based refresh, so
// any content change made outside that flow (a script, a direct DB edit)
// would only ever show up after the next full deploy without this.
export const revalidate = 60

// Title/description are inherited from the root layout's default — this
// only needs to pin the canonical URL so the homepage never gets treated as
// a duplicate of a query-string or trailing-slash variant.
export const metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return <PageRenderer slug="home" />
}
