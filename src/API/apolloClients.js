import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const apiKey = 'da2-a2x6x7qvcnfdllzhze27zbmnyy';
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'x-api-key': apiKey
  }
}));

const createClientWithAuth = (uri) => {
    const httpLink = createHttpLink({ uri });
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  };
export const homeApi1 = createClientWithAuth('https://553seergyrcrpi3fxi35mdatye.appsync-api.ap-northeast-1.amazonaws.com/graphql');
export const homeApi2 = createClientWithAuth('https://oucbbm7i3vhshm4b7cxjjcpcrq.appsync-api.ap-northeast-1.amazonaws.com/graphql');
export const homeApi3 = createClientWithAuth('https://oucbbm7i3vhshm4b7cxjjcpcrq.appsync-api.ap-northeast-1.amazonaws.com/graphql');
export const videoApi1 = createClientWithAuth('https://oucbbm7i3vhshm4b7cxjjcpcrq.appsync-api.ap-northeast-1.amazonaws.com/graphql');
export const videoApi2 = createClientWithAuth('https://oucbbm7i3vhshm4b7cxjjcpcrq.appsync-api.ap-northeast-1.amazonaws.com/graphql');