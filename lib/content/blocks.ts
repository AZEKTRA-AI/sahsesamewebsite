import type { AnyFieldDef, FieldDef } from './fields'

export interface RevalidateEntry {
  path: string
  /** Passed straight to Next's revalidatePath. 'layout' clears every page that
   *  shares that layout (used for header/footer content); 'page' supports a
   *  bracketed route pattern to clear every match of a dynamic route. */
  type?: 'layout' | 'page'
}

export interface BlockDef<T = Record<string, unknown>> {
  key: string
  title: string
  description?: string
  fields: AnyFieldDef[]
  defaults: T
  revalidate: RevalidateEntry[]
}

function defineBlock<T>(block: BlockDef<T>): BlockDef<T> {
  return block
}

const CLOUD = 'https://res.cloudinary.com/pjhvvbam/image/upload'

// ------------------------------------------------------------------------
// Site-wide
// ------------------------------------------------------------------------

export const globalContactBlock = defineBlock({
  key: 'global.contact',
  title: 'Contact details',
  description:
    'Your phone numbers, email, and address. These appear in the footer, on the Contact page, and on the quote form — change them once here and they update everywhere.',
  revalidate: [{ path: '/', type: 'layout' }],
  fields: [
    { key: 'address', label: 'Business address', type: 'textarea' },
    { key: 'phone1', label: 'Phone number', type: 'text' },
    { key: 'phone2', label: 'Second phone number', type: 'text', required: false },
    {
      key: 'whatsapp',
      label: 'WhatsApp number',
      type: 'text',
      help: 'Include the country code, for example +92 300 0959524. Used for the WhatsApp buttons across the site.',
    },
    { key: 'email', label: 'General email address', type: 'text' },
    {
      key: 'salesEmail',
      label: 'Sales email address',
      type: 'text',
      help: 'Shown on the quote form as the fastest way to reach your sales desk.',
    },
    { key: 'linkedinUrl', label: 'LinkedIn page link', type: 'url', required: false },
    { key: 'facebookUrl', label: 'Facebook page link', type: 'url', required: false },
    {
      key: 'hours',
      label: 'Business hours',
      type: 'list',
      itemLabel: 'time slot',
      minItems: 1,
      maxItems: 7,
      fields: [
        { key: 'day', label: 'Day or days', type: 'text' },
        { key: 'time', label: 'Hours (or "Closed")', type: 'text' },
      ],
    },
    {
      key: 'facilities',
      label: 'Mills & factories',
      type: 'list',
      itemLabel: 'facility',
      minItems: 0,
      maxItems: 8,
      help: 'Shown on the Contact page under "Our facilities."',
      fields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'address', label: 'Address', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    address: 'Office No. 170, New Grain Market, Dijkot Road, Faisalabad, Pakistan',
    phone1: '+92 300 0959524',
    phone2: '+92 300 8663396',
    whatsapp: '+92 300 0959524',
    email: 'info@sainabdulhakim.com',
    salesEmail: 'sales@sainabdulhakim.com',
    linkedinUrl: 'https://linkedin.com',
    facebookUrl: '',
    hours: [
      { day: 'Monday – Friday', time: '9:00 – 18:00 PKT' },
      { day: 'Saturday', time: '10:00 – 16:00 PKT' },
      { day: 'Sunday', time: 'Closed' },
    ],
    facilities: [
      {
        name: 'Hassan Daal Mills',
        address: 'New Sabzi Mandi Road, Jhang Road, Faisalabad, Pakistan',
      },
      {
        name: 'Charagh Rotion Daal Factory',
        address: '64 Puli Stop, Tahir Pura Road, Jhang Road, Faisalabad, Pakistan',
      },
    ],
  },
})

export const globalBrandBlock = defineBlock({
  key: 'global.brand',
  title: 'Company name & description',
  description: 'Shown in the site footer under your logo.',
  revalidate: [{ path: '/', type: 'layout' }],
  fields: [
    { key: 'legalName', label: 'Company name', type: 'text' },
    { key: 'blurb', label: 'Short description', type: 'textarea' },
  ],
  defaults: {
    // Exact legal name per the signed client requirements form ("exactly as
    // it should appear on the website") — "and", not "&".
    legalName: 'Sain Abdul Hakim and Company',
    blurb:
      'A Faisalabad family business supplying sesame seeds, pulses, and rice to buyers worldwide — sourced through our own mills and verified processing partners.',
  },
})

const categoryItemFields: FieldDef[] = [
  { key: 'slug', label: 'Category code — must be exactly "sesame", "pulses", or "rice"', type: 'text' },
  { key: 'name', label: 'Display name', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'meta', label: 'Short tag line', type: 'text', help: 'e.g. the varieties available, shown as a small label on the photo.' },
  { key: 'image', label: 'Photo', type: 'image' },
  { key: 'imageAlt', label: 'Photo description (read aloud by screen readers)', type: 'text' },
]

export const catalogCategoriesBlock = defineBlock({
  key: 'catalog.categories',
  title: 'Product categories',
  description:
    'The photo, description, and tag line for Sesame, Pulses, and Rice. These appear on the homepage, the Products page, and each category page.',
  revalidate: [
    { path: '/' },
    { path: '/products' },
    { path: '/products/[category]', type: 'page' },
    { path: '/products/[category]/[slug]', type: 'page' },
  ],
  fields: [
    {
      key: 'items',
      label: 'Categories',
      type: 'list',
      itemLabel: 'category',
      minItems: 3,
      maxItems: 3,
      fields: categoryItemFields,
    },
  ],
  defaults: {
    // Rice first — it's the lead category across the site (homepage feature
    // tile, Products page grid). Reordering this list is the single place
    // that changes both.
    items: [
      {
        slug: 'rice',
        name: 'Rice',
        description:
          'Basmati and IRRI varieties — raw, sella, and steamed — for wholesale, import, and re-export markets.',
        meta: '1121 · Super Kernel · 1509 · IRRI',
        image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433467/sah-marketing/category-rice-v2.png',
        imageAlt: 'Long-grain Pakistani basmati rice cascading from a linen sack',
      },
      {
        slug: 'sesame',
        name: 'Sesame seeds',
        description:
          'Hulled and natural white sesame, cleaned to buyer purity and moisture specs for tahini, bakery, and oil crushing.',
        meta: 'Hulled · Natural',
        image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433393/sah-marketing/category-sesame.png',
        imageAlt: 'Export-grade Pakistani sesame seeds spilling from a burlap sack',
      },
      {
        slug: 'pulses',
        name: 'Pulses',
        description:
          'Chickpeas, lentils, and moong from our own mills and verified processing partners.',
        meta: 'Chickpeas · Lentils · Moong',
        image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433431/sah-marketing/category-pulses-v2.png',
        imageAlt: 'Assorted Pakistani pulses in ceramic bowls — chickpeas, lentils, and moong',
      },
    ],
  },
})

// ------------------------------------------------------------------------
// Homepage
// ------------------------------------------------------------------------

export const homeHeroBlock = defineBlock({
  key: 'home.hero',
  title: 'Hero banner',
  description: 'The large banner at the top of the homepage.',
  revalidate: [{ path: '/' }],
  fields: [
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
    { key: 'tagline', label: 'Small tag line above the heading', type: 'text' },
    { key: 'headlineLine1', label: 'Heading — first line', type: 'text' },
    { key: 'headlineLine2', label: 'Heading — second line', type: 'text' },
    { key: 'subtext', label: 'Supporting sentence', type: 'textarea' },
    { key: 'primaryButtonLabel', label: 'Main button text', type: 'text' },
    { key: 'secondaryButtonLabel', label: 'Second button text', type: 'text' },
  ],
  defaults: {
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433354/sah-marketing/hero-rice.png',
    imageAlt: 'Premium long-grain basmati rice grown in Punjab, Pakistan',
    tagline: 'Established 1985 · Faisalabad, Pakistan',
    headlineLine1: 'From the Mills of Pakistan',
    headlineLine2: 'to Markets Worldwide',
    subtext: 'Family-run sesame, pulses, and rice — export-grade, since 1985.',
    primaryButtonLabel: 'Request a quotation',
    secondaryButtonLabel: 'See our products',
  },
})

export const homeTradingRootsBlock = defineBlock({
  key: 'home.tradingRoots',
  title: 'Family heritage section',
  revalidate: [{ path: '/' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    { key: 'paragraph', label: 'Paragraph', type: 'textarea' },
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
    { key: 'imageCaption', label: 'Caption printed on the photo', type: 'text' },
    { key: 'badgeLabel', label: 'Caption under the years-trading badge', type: 'text' },
    {
      key: 'pillars',
      label: 'Three highlights',
      type: 'list',
      itemLabel: 'highlight',
      minItems: 3,
      maxItems: 3,
      fields: [
        { key: 'label', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'Est. 1985 · Family tradition',
    title: 'Family trading roots, four decades deep',
    lead: 'For nearly four decades our family has traded on the same terms: consistent quality, honest grading, and relationships that outlast any single shipment.',
    paragraph:
      'From the mills in Faisalabad to a container leaving Karachi Port, every lot passes through the same hands — deep sourcing knowledge, rigorous evaluation, and a supply chain we can answer for.',
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433515/sah-marketing/heritage-rice-field.png',
    imageAlt: 'Golden wheat and sesame fields outside Faisalabad at harvest',
    imageCaption: 'Faisalabad, Punjab',
    badgeLabel: 'Trading without interruption',
    pillars: [
      {
        label: 'Pulses heritage',
        description:
          'Decades in Pakistan’s pulses trade, with two modern mills of our own in Faisalabad.',
      },
      {
        label: 'Global reach',
        description:
          'Pakistani agricultural products moved to international buyers through established supply networks.',
      },
      {
        label: 'Quality first',
        description:
          'Buyer-specific specifications, batch testing, and transparent communication on every contract.',
      },
    ],
  },
})

export const homeCategoriesIntroBlock = defineBlock({
  key: 'home.categoriesIntro',
  title: 'Product categories — heading',
  description: 'The section title above the category cards. Edit the cards themselves under Catalog.',
  revalidate: [{ path: '/' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'linkLabel', label: '"View all" link text', type: 'text' },
  ],
  defaults: {
    tagline: 'What we supply',
    title: 'Our categories, one standard',
    linkLabel: 'Browse the full catalogue',
  },
})

export const homeWhyChooseUsBlock = defineBlock({
  key: 'home.whyChooseUs',
  title: 'Why choose us section',
  revalidate: [{ path: '/' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
    { key: 'linkLabel', label: 'Link text', type: 'text' },
    {
      key: 'reasons',
      label: 'Reasons',
      type: 'list',
      itemLabel: 'reason',
      minItems: 1,
      maxItems: 12,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'Why choose SAH',
    title: 'Eight reasons buyers stay with us',
    lead: 'Agricultural heritage run on modern B2B discipline — from first sample through to the bill of lading.',
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433554/sah-marketing/hands-grain-v2.png',
    imageAlt: 'Hands running through freshly milled grain',
    linkLabel: 'Read our story',
    reasons: [
      { title: 'Family experience', description: 'Decades of commodity trading grounded in real agricultural operations since 1985.' },
      { title: 'Pakistan-based sourcing', description: 'Direct access to the agricultural heartland and long-standing supplier relationships.' },
      { title: 'Verified partners', description: 'We work only with processors whose plants and output we have inspected ourselves.' },
      { title: 'Buyer specifications', description: 'Lots cleaned and graded to your exact purity, moisture, and sizing requirements.' },
      { title: 'Testing & inspection', description: 'Batch analysis and third-party inspection through SGS or Intertek on request.' },
      { title: 'Flexible packaging', description: 'From 25 kg PP woven bags to jumbo bags and fully private-label packing.' },
      { title: 'Export support', description: 'Complete documentation and logistics handled for FOB, CFR, and CIF shipments.' },
      { title: 'Direct communication', description: 'One point of contact from enquiry to bill of lading — no agents in between.' },
    ],
  },
})

export const homeQualityProcessBlock = defineBlock({
  key: 'home.qualityProcess',
  title: 'Quality process section',
  revalidate: [{ path: '/' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    { key: 'backgroundImage', label: 'Background photo', type: 'image' },
    {
      key: 'steps',
      label: 'Process steps',
      type: 'list',
      itemLabel: 'step',
      minItems: 1,
      maxItems: 12,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
    {
      key: 'pillars',
      label: 'Assurance highlights',
      type: 'list',
      itemLabel: 'highlight',
      minItems: 1,
      maxItems: 6,
      fields: [
        { key: 'label', label: 'Title', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'Quality & sourcing',
    title: 'Ten steps between your spec and the vessel',
    lead: 'Every order runs the same route. Nothing ships until each stage is signed off and documented.',
    backgroundImage: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433689/sah-marketing/color-sorting-machine.png',
    steps: [
      { title: 'Buyer specifications', description: 'Your exact grade, purity, and packing requirements.' },
      { title: 'Supplier selection', description: 'Matching the lot to a processor we have vetted.' },
      { title: 'Lot inspection', description: 'Physical assessment of the standing inventory.' },
      { title: 'Sample preparation', description: 'Representative samples drawn and dispatched.' },
      { title: 'Lab testing', description: 'Moisture, FFA, purity, and admixture analysis.' },
      { title: 'Buyer approval', description: 'Your written sign-off before anything moves.' },
      { title: 'Processing', description: 'Cleaning, grading, and packing under supervision.' },
      { title: 'Pre-shipment QA', description: 'Third-party inspection at the loading point.' },
      { title: 'Documentation', description: 'Full export paperwork prepared per destination.' },
      { title: 'Shipment', description: 'Dispatched on your chosen incoterm from Karachi.' },
    ],
    pillars: [
      { label: 'Batch testing', desc: 'Lab analysis matched to each shipment lot' },
      { label: 'Product sampling', desc: 'Representative samples sent for approval' },
      { label: 'Pre-shipment QA', desc: 'Third-party inspection by SGS or Intertek' },
      { label: 'Traceability', desc: 'Complete documentation and audit trail' },
    ],
  },
})

export const homePackagingBlock = defineBlock({
  key: 'home.packaging',
  title: 'Packaging & shipping section',
  revalidate: [{ path: '/' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    { key: 'portImage', label: 'Port photo', type: 'image' },
    { key: 'portImageAlt', label: 'Port photo description', type: 'text' },
    { key: 'portCaptionTitle', label: 'Caption heading on the photo', type: 'text' },
    { key: 'portCaptionText', label: 'Caption text on the photo', type: 'textarea' },
    {
      key: 'packagingOptions',
      label: 'Packaging options',
      type: 'list',
      itemLabel: 'option',
      minItems: 1,
      maxItems: 10,
      fields: [
        { key: 'label', label: 'Title', type: 'text' },
        { key: 'note', label: 'Short note', type: 'text' },
      ],
    },
    {
      key: 'shippingTerms',
      label: 'Shipping terms',
      type: 'list',
      itemLabel: 'term',
      minItems: 1,
      maxItems: 8,
      fields: [
        { key: 'label', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
    { key: 'docs', label: 'Document checklist (one per line)', type: 'stringList' },
  ],
  defaults: {
    tagline: 'Delivery & flexibility',
    title: 'Packed your way, shipped on your terms',
    lead: 'Packing, documentation, and incoterms are set by the contract — not by what happens to be convenient at the mill.',
    portImage: `${CLOUD}/v1785958259/sah-marketing/logistics-port.jpg`,
    portImageAlt: 'Container ship loading at Karachi Port',
    portCaptionTitle: 'From Karachi Port to global markets',
    portCaptionText:
      'Primary loading at Karachi Port, with Port Qasim as an alternative when berth scheduling demands it.',
    packagingOptions: [
      { label: '25 kg PP woven bags', note: 'Standard export unit' },
      { label: '50 kg PP woven bags', note: 'Bulk handling' },
      { label: 'Kraft paper bags', note: 'With inner food-grade liner' },
      { label: 'Jumbo bags', note: '1 MT flexible bulk containers' },
      { label: 'Buyer-branded packing', note: 'Your artwork, our line' },
      { label: 'Custom formats', note: 'Specified per contract' },
    ],
    shippingTerms: [
      { label: 'FOB Karachi', description: 'Free on board, loaded at Karachi Port' },
      { label: 'CFR', description: 'Cost and freight to your named port' },
      { label: 'CIF', description: 'Cost, insurance, and freight covered' },
      { label: 'Sample orders', description: 'Small quantities by courier' },
    ],
    docs: [
      'Commercial invoice',
      'Packing list',
      'Certificate of origin',
      'Phytosanitary certificate',
      'Fumigation certificate',
      'Certificate of analysis',
      'Inspection report',
      'Bill of lading',
      'Insurance certificate',
      'Destination-specific docs',
    ],
  },
})

export const homeIndustriesBlock = defineBlock({
  key: 'home.industries',
  title: 'Industries we serve section',
  revalidate: [{ path: '/' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    { key: 'photoImage', label: 'Photo', type: 'image' },
    { key: 'photoAlt', label: 'Photo description', type: 'text' },
    { key: 'photoCaption', label: 'Caption printed on the photo', type: 'text' },
    { key: 'closingTitle', label: '"Not listed?" title', type: 'text' },
    { key: 'closingText', label: '"Not listed?" text', type: 'textarea' },
    { key: 'closingLinkLabel', label: 'Link text', type: 'text' },
    {
      key: 'industries',
      label: 'Industries',
      type: 'list',
      itemLabel: 'industry',
      minItems: 1,
      maxItems: 16,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' },
      ],
    },
  ],
  defaults: {
    tagline: 'Who we supply',
    title: 'The desks that buy from us',
    lead: 'Our buyers sit across food processing, distribution, retail, and specialty channels — from single-container importers to multi-plant manufacturers.',
    photoImage: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433586/sah-marketing/farmer-field-v2.png',
    photoAlt: 'A grower inspecting the standing crop before harvest',
    photoCaption: 'Sourced at origin, not from a warehouse',
    closingTitle: 'Not listed?',
    closingText: 'Tell us the spec and the destination. If we can source it properly, we will quote it.',
    closingLinkLabel: 'Start an enquiry',
    industries: [
      { title: 'Sesame processors', description: 'Tahini lines and oil crushing plants' },
      { title: 'Bakeries', description: 'Topping and dough-inclusion sesame' },
      { title: 'Confectionery', description: 'Halva, brittle, and coated products' },
      { title: 'Food ingredient firms', description: 'Contracted commodity sourcing' },
      { title: 'Pulse importers', description: 'Wholesale import and distribution' },
      { title: 'Food wholesalers', description: 'Retail and food-service supply' },
      { title: 'Commodity traders', description: 'B2B trading and re-export' },
      { title: 'Supermarket suppliers', description: 'Private-label and branded packs' },
      { title: 'Ethnic food distributors', description: 'South Asian specialty channels' },
      { title: 'Private-label producers', description: 'OEM and ODM manufacturing' },
    ],
  },
})

export const homeRfqIntroBlock = defineBlock({
  key: 'home.rfqIntro',
  title: 'Request a quote section',
  description: 'Your phone/email contact cards here come from Contact Details, not this block.',
  revalidate: [{ path: '/' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
  ],
  defaults: {
    tagline: 'Get a quote',
    title: 'Tell us what you need shipped',
    lead: 'Send the specification and destination. You will have grades, packing options, and a price back within 24–48 hours.',
  },
})

// ------------------------------------------------------------------------
// About page
// ------------------------------------------------------------------------

export const aboutHeroBlock = defineBlock({
  key: 'about.hero',
  title: 'About page — banner',
  revalidate: [{ path: '/about' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Supporting sentence', type: 'textarea' },
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
  ],
  defaults: {
    tagline: 'Established 1985 · Faisalabad, Pakistan',
    title: 'A family name on every container',
    subtitle:
      'Four decades of grading, milling, and shipping Pakistani agricultural commodities — run by the same family that started it.',
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433515/sah-marketing/heritage-rice-field.png',
    imageAlt: 'Golden fields of the Punjab at harvest',
  },
})

export const aboutHeritageBlock = defineBlock({
  key: 'about.heritage',
  title: 'About page — our heritage',
  revalidate: [{ path: '/about' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'paragraph1', label: 'First paragraph', type: 'textarea' },
    { key: 'paragraph2', label: 'Second paragraph', type: 'textarea' },
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
    {
      key: 'stats',
      label: 'Highlight numbers (shown after "Years trading", which is calculated automatically)',
      type: 'list',
      itemLabel: 'number',
      minItems: 0,
      maxItems: 4,
      fields: [
        { key: 'value', label: 'Number', type: 'number' },
        { key: 'label', label: 'Label', type: 'text' },
      ],
    },
  ],
  defaults: {
    tagline: 'Our heritage',
    title: 'Four decades of trust, one family name',
    paragraph1:
      'Sain Abdul Hakim and Company has traded agricultural commodities for nearly forty years. What began in the pulses business in 1985 now combines old-fashioned grading judgement with the documentation and inspection standards international buyers expect.',
    paragraph2:
      'We sit in Faisalabad, in the middle of Pakistan’s agricultural belt. That proximity is the whole point: we see the lots, we know the processors, and we can answer for what goes into the bag.',
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433554/sah-marketing/hands-grain-v2.png',
    imageAlt: 'Hands running through freshly milled grain',
    stats: [
      { value: 2, label: 'Own mills' },
      { value: 10, label: 'Export products' },
    ],
  },
})

export const aboutMilestonesBlock = defineBlock({
  key: 'about.milestones',
  title: 'About page — timeline',
  revalidate: [{ path: '/about' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    {
      key: 'items',
      label: 'Milestones',
      type: 'list',
      itemLabel: 'milestone',
      minItems: 1,
      maxItems: 8,
      fields: [
        { key: 'year', label: 'Year (or label, e.g. "Today")', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'How we got here',
    title: 'From a market stall to a shipping line',
    lead: 'No sudden pivot, no rebrand — just the same trade, done at a larger scale each decade.',
    items: [
      {
        year: '1985',
        title: 'The family enters the pulses trade',
        description:
          'Trading begins at the New Grain Market in Faisalabad, buying and grading pulses for the domestic wholesale trade.',
      },
      {
        year: '1990s',
        title: 'Milling brought in-house',
        description:
          'Two mills come under family ownership, moving cleaning and grading out of third-party hands and under our own supervision.',
      },
      {
        year: '2000s',
        title: 'First export contracts',
        description:
          'Relationships with importers across the Middle East and South Asia turn a domestic trading house into an exporter.',
      },
      {
        year: 'Today',
        title: 'Sesame, pulses, and rice — one desk',
        description:
          'Our full range supplied to processors, wholesalers, and private-label producers worldwide.',
      },
    ],
  },
})

export const aboutFactsBlock = defineBlock({
  key: 'about.facts',
  title: 'About page — what buyers get',
  revalidate: [{ path: '/about' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    {
      key: 'items',
      label: 'Points',
      type: 'list',
      itemLabel: 'point',
      minItems: 1,
      maxItems: 6,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'Why we’re different',
    title: 'What buyers actually get',
    items: [
      {
        title: '41 years in the trade',
        description:
          'Family trading roots in the pulses business since 1985, later extended into sesame and rice for export.',
      },
      {
        title: 'Sourced at origin',
        description:
          'Supplier relationships built over decades in Faisalabad give us first call on quality lots and honest pricing.',
      },
      {
        title: 'Terms that fit you',
        description:
          'Shipments arranged FOB, CFR, or CIF, with documentation prepared for your destination’s requirements.',
      },
    ],
  },
})

export const aboutBannerBlock = defineBlock({
  key: 'about.banner',
  title: 'About page — full-width photo banner',
  revalidate: [{ path: '/about' }],
  fields: [
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
    { key: 'title', label: 'Heading printed on the photo', type: 'text' },
    { key: 'text', label: 'Text printed on the photo', type: 'textarea' },
    { key: 'linkLabel', label: 'Link text', type: 'text' },
  ],
  defaults: {
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433586/sah-marketing/farmer-field-v2.png',
    imageAlt: 'A grower walking the crop rows before harvest',
    title: 'Everything starts in the Punjab',
    text: 'Sesame from the central belt, rice from Gujranwala and Sheikhupura, pulses milled in Faisalabad — all within a day’s drive of our office.',
    linkLabel: 'See how we grade and test',
  },
})

export const aboutCtaBlock = defineBlock({
  key: 'about.cta',
  title: 'About page — closing call to action',
  revalidate: [{ path: '/about' }],
  fields: [
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
  ],
  defaults: {
    title: 'Ready to work together?',
    subtitle: 'Send us a specification and we will come back with grades, packing options, and a price.',
  },
})

// ------------------------------------------------------------------------
// Quality & Process page
// ------------------------------------------------------------------------

export const qualityHeroBlock = defineBlock({
  key: 'quality.hero',
  title: 'Quality page — banner',
  revalidate: [{ path: '/quality-process' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Supporting sentence', type: 'textarea' },
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
  ],
  defaults: {
    tagline: 'Quality & sourcing',
    title: 'Ten checkpoints between the field and your warehouse',
    subtitle:
      'Nothing leaves Pakistan on our account until every stage below has been signed off and documented.',
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433689/sah-marketing/color-sorting-machine.png',
    imageAlt: 'Laboratory technician testing a grain sample',
  },
})

export const qualityStepsBlock = defineBlock({
  key: 'quality.steps',
  title: 'Quality page — process steps',
  revalidate: [{ path: '/quality-process' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    {
      key: 'items',
      label: 'Steps',
      type: 'list',
      itemLabel: 'step',
      minItems: 1,
      maxItems: 14,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'The process',
    title: 'How a lot becomes a shipment',
    lead: 'Same route every time, regardless of product or destination.',
    items: [
      { title: 'Supplier verification', description: 'We buy only from processors whose plants we have walked and whose output we have graded ourselves.' },
      { title: 'Batch inspection', description: 'Each lot is checked for quality, origin authenticity, and the condition of the packaging it arrives in.' },
      { title: 'Lab testing', description: 'Moisture, purity, oil content, free fatty acids, and contaminant screening against your ceiling values.' },
      { title: 'Grading & sorting', description: 'Sortex cleaning and grading to international standards or to whatever the contract specifies.' },
      { title: 'Third-party inspection', description: 'Independent verification through SGS or Intertek arranged at the loading point on request.' },
      { title: 'Customised packaging', description: 'Bag size, liner, and artwork set by the buyer — including full private-label runs.' },
      { title: 'Documentation', description: 'Certificates of analysis and origin, phytosanitary and fumigation papers, prepared per destination.' },
      { title: 'Storage & handling', description: 'Controlled storage between processing and loading so moisture does not creep back into the lot.' },
      { title: 'Logistics coordination', description: 'Booking, inland haulage, and vessel scheduling under FOB, CFR, or CIF terms.' },
      { title: 'Delivery confirmation', description: 'We stay on the file after discharge — discrepancies get answered, not deflected.' },
    ],
  },
})

export const qualityBannerBlock = defineBlock({
  key: 'quality.banner',
  title: 'Quality page — photo banner',
  revalidate: [{ path: '/quality-process' }],
  fields: [
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
    { key: 'text', label: 'Text printed on the photo', type: 'textarea' },
  ],
  defaults: {
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433689/sah-marketing/color-sorting-machine.png',
    imageAlt: 'Grain samples prepared for laboratory analysis',
    text: 'Every batch tested. Every shipment verified.',
  },
})

export const qualityCommitmentsBlock = defineBlock({
  key: 'quality.commitments',
  title: 'Quality page — our commitments',
  revalidate: [{ path: '/quality-process' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    { key: 'footnote', label: 'Footnote below the three items', type: 'textarea' },
    {
      key: 'items',
      label: 'Commitments',
      type: 'list',
      itemLabel: 'commitment',
      minItems: 1,
      maxItems: 6,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'Our commitments',
    title: 'Principles we hold to',
    lead: 'These are not marketing lines — they are the terms we expect to be held to on a claim.',
    footnote:
      'Independent inspection is arranged through SGS or Intertek at the buyer’s election. Where a destination market requires additional certification, we obtain it before loading rather than after.',
    items: [
      { title: 'Transparency', description: 'Every batch carries its specification, test results, and origin certificate. Nothing is asserted without paper behind it.' },
      { title: 'Consistency', description: 'The same grading discipline on the tenth container as on the first, whether the market is tight or long.' },
      { title: 'Compliance', description: 'Products meet international food safety requirements and the export regulations of the destination market.' },
    ],
  },
})

export const qualityCtaBlock = defineBlock({
  key: 'quality.cta',
  title: 'Quality page — closing call to action',
  revalidate: [{ path: '/quality-process' }],
  fields: [
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
  ],
  defaults: {
    title: 'Want the full specification sheet?',
    subtitle: 'We will send typical analysis ranges for any product, plus a sample if you need one.',
  },
})

// ------------------------------------------------------------------------
// Packaging & Logistics page
// ------------------------------------------------------------------------

export const packagingHeroBlock = defineBlock({
  key: 'packaging.hero',
  title: 'Packaging page — banner',
  revalidate: [{ path: '/packaging-logistics' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Supporting sentence', type: 'textarea' },
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
  ],
  defaults: {
    tagline: 'Delivery & flexibility',
    title: 'Packed to your spec, shipped on your terms',
    subtitle:
      'Packing format, incoterm, and paperwork are set by the contract — not by whatever is easiest at the mill.',
    image: 'https://res.cloudinary.com/pjhvvbam/image/upload/v1786433650/sah-marketing/packaging-warehouse-v2.png',
    imageAlt: 'Palletised export bags stacked in a warehouse',
  },
})

export const packagingOptionsBlock = defineBlock({
  key: 'packaging.options',
  title: 'Packaging page — packing formats',
  revalidate: [{ path: '/packaging-logistics' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    {
      key: 'items',
      label: 'Formats',
      type: 'list',
      itemLabel: 'format',
      minItems: 1,
      maxItems: 10,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'Packing formats',
    title: 'Six ways we can bag your order',
    lead: 'Standard export units through to fully private-label runs — priced per format at quotation.',
    items: [
      { title: 'Bags & sacks', description: 'PP woven, jute, or cotton in 25 kg, 50 kg, or bulk fills.' },
      { title: 'Jumbo bags', description: 'One-tonne flexible bulk containers for high-volume contracts.' },
      { title: 'Custom labelling', description: 'Your artwork, language, and barcodes applied on our line.' },
      { title: 'Sealed packaging', description: 'Food-grade inner liners and heat sealing to hold moisture out.' },
      { title: 'Custom sizing', description: 'Any fill weight your distribution or retail channel requires.' },
      { title: 'Recyclable options', description: 'Kraft and recyclable substrates where the market demands them.' },
    ],
  },
})

export const packagingIncotermsBlock = defineBlock({
  key: 'packaging.incoterms',
  title: 'Packaging page — shipping terms',
  revalidate: [{ path: '/packaging-logistics' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    {
      key: 'items',
      label: 'Incoterms',
      type: 'list',
      itemLabel: 'incoterm',
      minItems: 1,
      maxItems: 6,
      fields: [
        { key: 'term', label: 'Short code (e.g. FOB)', type: 'text' },
        { key: 'full', label: 'Full name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'Shipping terms',
    title: 'Where our responsibility ends',
    lead: 'Pick the incoterm that suits your freight arrangements. We quote against all three.',
    items: [
      { term: 'FOB', full: 'Free on board', description: 'We cover the goods, inland haulage, and loading at Karachi Port. You take the freight from the rail.' },
      { term: 'CFR', full: 'Cost and freight', description: 'We cover goods and ocean freight to your named destination port. Insurance stays with you.' },
      { term: 'CIF', full: 'Cost, insurance and freight', description: 'We cover goods, freight, and marine insurance through to the destination port.' },
    ],
  },
})

export const packagingBannerBlock = defineBlock({
  key: 'packaging.banner',
  title: 'Packaging page — photo banner',
  revalidate: [{ path: '/packaging-logistics' }],
  fields: [
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
    { key: 'text', label: 'Text printed on the photo', type: 'textarea' },
  ],
  defaults: {
    image: `${CLOUD}/v1785958259/sah-marketing/logistics-port.jpg`,
    imageAlt: 'Container vessel loading at Karachi Port',
    text: 'Booked, loaded, and documented from Karachi',
  },
})

export const packagingProcessBlock = defineBlock({
  key: 'packaging.process',
  title: 'Packaging page — how it moves',
  revalidate: [{ path: '/packaging-logistics' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    {
      key: 'steps',
      label: 'Stages',
      type: 'list',
      itemLabel: 'stage',
      minItems: 1,
      maxItems: 6,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' },
      ],
    },
    {
      key: 'freight',
      label: 'Freight modes',
      type: 'list',
      itemLabel: 'mode',
      minItems: 1,
      maxItems: 4,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'detail', label: 'Transit time note', type: 'text' },
      ],
    },
  ],
  defaults: {
    tagline: 'How it moves',
    title: 'Four stages, one file',
    lead: 'One coordinator stays on the shipment from packing instruction to discharge.',
    steps: [
      { title: 'Preparation', description: 'Cleaned, graded, packed, and marked' },
      { title: 'Transport', description: 'Inland haulage to Karachi Port' },
      { title: 'Shipment', description: 'Ocean freight, or air for samples' },
      { title: 'Delivery', description: 'Discharge and documentation release' },
    ],
    freight: [
      {
        title: 'Container shipment',
        description: 'Full container load or LCL consolidation, loaded at Karachi Port with Port Qasim as an alternative.',
        detail: 'Transit 15–30 days depending on destination',
      },
      {
        title: 'Air freight',
        description: 'Expedited movement for samples, pre-shipment approvals, and small urgent quantities.',
        detail: 'Transit 3–7 days depending on destination',
      },
    ],
  },
})

export const packagingDocsBlock = defineBlock({
  key: 'packaging.docs',
  title: 'Packaging page — documentation',
  revalidate: [{ path: '/packaging-logistics' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'lead', label: 'Intro sentence', type: 'textarea' },
    { key: 'footnote', label: 'Footnote', type: 'textarea' },
    {
      key: 'groups',
      label: 'Document groups',
      type: 'list',
      itemLabel: 'group',
      minItems: 1,
      maxItems: 6,
      fields: [
        { key: 'title', label: 'Group title', type: 'text' },
        { key: 'items', label: 'Documents (one per line)', type: 'stringList' },
      ],
    },
  ],
  defaults: {
    tagline: 'Paperwork',
    title: 'Documentation prepared before the seal goes on',
    lead: 'Checked against the destination’s import requirements, not assembled after the vessel sails.',
    footnote:
      'Additional destination-specific documents are arranged on request — tell us the port of discharge and we will confirm what your customs authority expects.',
    groups: [
      { title: 'Certificates', items: ['Certificate of origin', 'Certificate of analysis', 'Phytosanitary certificate', 'Fumigation certificate'] },
      { title: 'Commercial documents', items: ['Commercial invoice', 'Packing list', 'Bill of lading', 'Insurance certificate'] },
      { title: 'Compliance', items: ['Destination regulatory papers', 'Quality assurance records', 'Third-party inspection report'] },
    ],
  },
})

export const packagingCtaBlock = defineBlock({
  key: 'packaging.cta',
  title: 'Packaging page — closing call to action',
  revalidate: [{ path: '/packaging-logistics' }],
  fields: [
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
  ],
  defaults: {
    title: 'Need specific shipping details?',
    subtitle: 'Send the destination port and packing format, and we will come back with terms and transit.',
  },
})

// ------------------------------------------------------------------------
// Contact page
// ------------------------------------------------------------------------

export const contactHeroBlock = defineBlock({
  key: 'contact.hero',
  title: 'Contact page — banner',
  description: 'Phone, email, address, and hours come from Contact Details, not this block.',
  revalidate: [{ path: '/contact' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Supporting sentence', type: 'textarea' },
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'imageAlt', label: 'Photo description', type: 'text' },
  ],
  defaults: {
    tagline: 'Talk to the export desk',
    title: 'Get in touch',
    subtitle:
      'Questions on grades, quantities, or shipping terms — you will be answered by someone who has seen the lot.',
    image: `${CLOUD}/v1785958254/sah-marketing/contact-handshake.jpg`,
    imageAlt: 'Two people shaking hands to close a trade agreement',
  },
})

export const contactCtaBlock = defineBlock({
  key: 'contact.cta',
  title: 'Contact page — closing call to action',
  revalidate: [{ path: '/contact' }],
  fields: [
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'primaryLabel', label: 'Button text', type: 'text' },
  ],
  defaults: {
    title: 'Need a detailed quotation?',
    subtitle: 'The full RFQ form captures grades, quantities, packing, and incoterms in one pass.',
    primaryLabel: 'Open the RFQ form',
  },
})

// ------------------------------------------------------------------------
// Products / Catalog pages
// ------------------------------------------------------------------------

export const catalogHeroBlock = defineBlock({
  key: 'catalog.hero',
  title: 'Products page — banner',
  revalidate: [{ path: '/products' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Supporting sentence', type: 'textarea' },
  ],
  defaults: {
    tagline: 'What we supply',
    title: 'Our full range of export products',
    subtitle:
      'Everything below is sourced in Punjab, processed to contract specification, and shipped from Karachi.',
  },
})

export const catalogStandardsBlock = defineBlock({
  key: 'catalog.standards',
  title: 'Products page — quality standards',
  revalidate: [{ path: '/products' }],
  fields: [
    { key: 'tagline', label: 'Small tag line', type: 'text' },
    { key: 'title', label: 'Heading', type: 'text' },
    {
      key: 'items',
      label: 'Standards',
      type: 'list',
      itemLabel: 'standard',
      minItems: 1,
      maxItems: 6,
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
  defaults: {
    tagline: 'Our promise',
    title: 'What holds across every product',
    items: [
      { title: 'Verified quality', description: 'Batch lab analysis and third-party inspection through SGS or Intertek on request.' },
      { title: 'Flexible packaging', description: 'From 25 kg PP woven bags to 1 MT jumbo bags and full private-label packing.' },
      { title: 'Global shipping', description: 'FOB Karachi, CFR, and CIF, with documentation prepared per destination.' },
    ],
  },
})

export const catalogCtaBlock = defineBlock({
  key: 'catalog.cta',
  title: 'Products page — closing call to action',
  revalidate: [{ path: '/products' }],
  fields: [
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'primaryLabel', label: 'Button text', type: 'text' },
  ],
  defaults: {
    title: 'Need a custom quote?',
    subtitle: 'Contact us for detailed specifications, samples, or volume quotations.',
    primaryLabel: 'Request a quotation',
  },
})

export const catalogProductCtaBlock = defineBlock({
  key: 'catalog.productCta',
  title: 'Product detail pages — closing call to action',
  description: 'Shown at the bottom of every individual product page.',
  revalidate: [{ path: '/products/[category]/[slug]', type: 'page' }],
  fields: [
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
  ],
  defaults: {
    title: 'Ready to place an order?',
    subtitle: 'Quotations, samples, and bulk contracts — talk to the export desk directly.',
  },
})

// ------------------------------------------------------------------------
// Registry
// ------------------------------------------------------------------------

export const CONTENT_BLOCKS: Record<string, BlockDef<any>> = {
  [globalContactBlock.key]: globalContactBlock,
  [globalBrandBlock.key]: globalBrandBlock,
  [catalogCategoriesBlock.key]: catalogCategoriesBlock,
  [homeHeroBlock.key]: homeHeroBlock,
  [homeTradingRootsBlock.key]: homeTradingRootsBlock,
  [homeCategoriesIntroBlock.key]: homeCategoriesIntroBlock,
  [homeWhyChooseUsBlock.key]: homeWhyChooseUsBlock,
  [homeQualityProcessBlock.key]: homeQualityProcessBlock,
  [homePackagingBlock.key]: homePackagingBlock,
  [homeIndustriesBlock.key]: homeIndustriesBlock,
  [homeRfqIntroBlock.key]: homeRfqIntroBlock,
  [aboutHeroBlock.key]: aboutHeroBlock,
  [aboutHeritageBlock.key]: aboutHeritageBlock,
  [aboutMilestonesBlock.key]: aboutMilestonesBlock,
  [aboutFactsBlock.key]: aboutFactsBlock,
  [aboutBannerBlock.key]: aboutBannerBlock,
  [aboutCtaBlock.key]: aboutCtaBlock,
  [qualityHeroBlock.key]: qualityHeroBlock,
  [qualityStepsBlock.key]: qualityStepsBlock,
  [qualityBannerBlock.key]: qualityBannerBlock,
  [qualityCommitmentsBlock.key]: qualityCommitmentsBlock,
  [qualityCtaBlock.key]: qualityCtaBlock,
  [packagingHeroBlock.key]: packagingHeroBlock,
  [packagingOptionsBlock.key]: packagingOptionsBlock,
  [packagingIncotermsBlock.key]: packagingIncotermsBlock,
  [packagingBannerBlock.key]: packagingBannerBlock,
  [packagingProcessBlock.key]: packagingProcessBlock,
  [packagingDocsBlock.key]: packagingDocsBlock,
  [packagingCtaBlock.key]: packagingCtaBlock,
  [contactHeroBlock.key]: contactHeroBlock,
  [contactCtaBlock.key]: contactCtaBlock,
  [catalogHeroBlock.key]: catalogHeroBlock,
  [catalogStandardsBlock.key]: catalogStandardsBlock,
  [catalogCtaBlock.key]: catalogCtaBlock,
  [catalogProductCtaBlock.key]: catalogProductCtaBlock,
}
