import dynamic from 'next/dynamic';

// Dynamiczne ładowanie komponentu bez SSR
const Map = dynamic(() => import('@/components/map-component'), { ssr: false });

const MapPage = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default MapPage;
