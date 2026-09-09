import { AUTHOR_NAME, SITE_URL, absoluteUrl } from "./site"

export const AUTHOR_JSONLD = {
  "@type": "Person",
  name: AUTHOR_NAME,
  url: SITE_URL,
  image: absoluteUrl("/assets/images/profile.jpg"),
}

export const PUBLISHER_JSONLD = {
  ...AUTHOR_JSONLD,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/assets/images/profile.jpg"),
  },
}

export const PROFILE_IMAGE_URL = absoluteUrl("/assets/images/profile.jpg")
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function buildWebPageSchema(opts: {
  path: string
  name: string
  description: string
  primaryImage?: string
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${opts.path}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    ...(opts.primaryImage ? { primaryImageOfPage: opts.primaryImage } : {}),
  }
}
