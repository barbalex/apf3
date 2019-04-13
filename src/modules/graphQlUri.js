export default () => {
  if (typeof window === 'undefined') {
    return 'https://apflora.ch/graphql'
  }
  const hostnameWithoutWww = window.location.hostname.replace('www.', '')
  const isLocalhost = hostnameWithoutWww === 'localhost'

  return isLocalhost
    ? 'http://localhost:5000/graphql'
    : 'https://apflora.ch/graphql'
  //: 'https://${window.location.hostname}/graphql'
}
