export const isLocalhost = () => {
  const location_host = window.location.hostname;

  return location_host.includes('localhost');
};
