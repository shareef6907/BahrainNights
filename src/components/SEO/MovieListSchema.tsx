interface MovieListSchemaProps {
  movies: Array<{
    title: string;
    poster?: string | null;
    rating?: number | null;
    genres?: string[] | null;
    duration?: string | null;
    releaseDate?: string | null;
    slug?: string | null;
    synopsis?: string | null;
  }>;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
}

export default function MovieListSchema({ movies, pageTitle, pageDescription, pageUrl }: MovieListSchemaProps) {
  if (!movies || movies.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    numberOfItems: movies.length,
    itemListElement: movies.slice(0, 15).map((movie, index) => {
      // Parse duration to ISO format if possible (e.g., "2h 30min" -> "PT2H30M")
      let isoDuration = undefined;
      if (movie.duration) {
        const match = movie.duration.match(/(\d+)h\s*(\d+)?/);
        if (match) {
          const hours = match[1] || '0';
          const mins = match[2] || '0';
          isoDuration = `PT${hours}H${mins}M`;
        }
      }

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Movie',
          name: movie.title,
          image: movie.poster,
          description: movie.synopsis || `${movie.title} - Now showing in Bahrain cinemas`,
          url: movie.slug ? `https://bahrainnights.com/cinema/${movie.slug}` : pageUrl,
          ...(movie.genres && movie.genres.length > 0 && { genre: movie.genres.join(', ') }),
          ...(isoDuration && { duration: isoDuration }),
          ...(movie.rating && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: movie.rating.toString(),
              bestRating: '10',
              ratingCount: '100',
            },
          }),
        },
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
