import { useEffect, useState } from 'react';

export const MOBILE_BREAKPOINT = 960;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`;

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = (event) => setIsMobile(event.matches);

    setIsMobile(media.matches);
    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
