
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params, request, site }) => {

  const blogPost = await getCollection('blog');

  return rss({
    // stylesheet: '/styles/rss.xsl',
    // `<title>` field in output xml
    title: 'Un simple blog sobre mis aventuras con Astro',
    // `<description>` field in output xml
    description: 'A humble Astronaut’s guide to the stars',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: site ?? '',
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPost.map(({ data, slug }) => ({
      title: data.title,
      pubDate: data.date,
      descripcion: data.description,
      link: `/posts/${slug}` 
    })),
    // (optional) inject custom xml
    customData: `<language>es-mx</language>`,
  });
}