import React from 'react';
import { useHostsApi } from '../api/hostsApi';

export function Root() {

  const hostsApi = useHostsApi()

  hostsApi.get({
    startDate: new Date(),
    endDate: new Date(),
    guests: 5
  })
    .then(console.log)

  return (
    <div>
      App    
    </div>
  );
}