import React from 'react';
import { useQuery } from '@orderly.network/hooks';

function OrderlyApi() {
    const { data, error, isLoading } = useQuery("/v1/public/info");
console.log(data,error,isLoading)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>
  
    return (
      <pre className="text-sm">
        {data && <div className="text-slate-500" style={{color:'black'}}>{JSON.stringify(data, null, 2)}</div>}
      </pre>
    );
}

export default OrderlyApi