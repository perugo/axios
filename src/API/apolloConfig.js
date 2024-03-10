import { split } from '@apollo/client';
import { homeApi1, homeApi2, homeApi3, videoApi1, videoApi2 } from './apolloClients';

const chooseLink = ({ getContext }) => {
  const { clientName } = getContext();
  switch (clientName) {
    case 'homeApi1': return homeApi1.link;
    case 'homeApi2': return homeApi2.link;
    case 'homeApi3': return homeApi3.link;
    case 'videoApi1': return videoApi1.link;
    case 'videoApi2': return videoApi2.link;
    default: return homeApi1.link;
  }
};

export const combinedLink = split(chooseLink, homeApi1.link); 