import { permanentRedirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VenuesPage({ searchParams }: Props) {
  const params = await searchParams
  const queryString = Object.entries(params)
    .map(([key, value]) => {
      const val = Array.isArray(value) ? value.join(',') : value ?? ''
      return val ? `${encodeURIComponent(key)}=${encodeURIComponent(val)}` : null
    })
    .filter(Boolean)
    .join('&')

  const destination = queryString ? `/places?${queryString}` : '/places'
  permanentRedirect(destination)
}
