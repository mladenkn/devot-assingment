import React from 'react';
import { useHostsApi } from '../api/hostsApi';
import { SearchHostsForm } from './SearchHostsForm';

export function Root() {

  const hostsApi = useHostsApi()
  const searchFormData = {
    startDate: new Date(),
    endDate: new Date(),
    guests: 5
  }

  hostsApi.get(searchFormData)
    .then(console.log)

  return (
    <div>
      <SearchHostsForm value={searchFormData} />    
    </div>
  );
}