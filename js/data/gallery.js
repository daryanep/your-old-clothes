/**
 * Gallery Data Module — Your Old Clothes
 * Schema: { id, src, alt, caption, span }
 * span: 'tall' | 'wide' | null — controls masonry layout sizing
 */

const gallery = [
  {
    id: 'gal-01',
    src: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Band performing on stage under warm spotlight lighting',
    caption: 'Our very first headline show — Echo Lounge, 2024',
    span: 'wide',
  },
  {
    id: 'gal-02',
    src: 'https://images.pexels.com/photos/1677476/pexels-photo-1677476.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Guitarist tuning an acoustic guitar backstage',
    caption: 'Backstage warm-up, Bandung sessions',
    span: 'tall',
  },
  {
    id: 'gal-03',
    src: 'https://images.pexels.com/photos/1239151/pexels-photo-1239151.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Vinyl record spinning on a turntable close-up',
    caption: 'Laundry Day on wax — first pressing test',
    span: null,
  },
  {
    id: 'gal-04',
    src: 'https://images.pexels.com/photos/1676284/pexels-photo-1676284.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Drummer playing a vintage drum kit during recording',
    caption: 'Studio day three — the take that made the album',
    span: null,
  },
  {
    id: 'gal-05',
    src: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Band members sitting together on a rooftop at golden hour',
    caption: 'Rookie rooftop session — the photo that started it all',
    span: 'tall',
  },
  {
    id: 'gal-06',
    src: 'https://images.pexels.com/photos/1676215/pexels-photo-1676215.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Close-up of cassette tape being inserted into a player',
    caption: 'Hand-dubbed cassettes for the first 50 fans',
    span: 'wide',
  },
];

export default gallery;
