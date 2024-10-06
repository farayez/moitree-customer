import { HttpMethod } from '@/utils/constants/HttpMethods';
import { useEffect, useState } from 'react';

const useFetch = (url: string, method?: HttpMethod, headers?: Record<string, string>) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await fetch(url, {
          method: method?.name ?? 'GET',
          headers: headers ?? {
            'Access-Control-Allow-Origin': 'http://localhost:3001',
            'Access-Control-Allow-Credentials': 'true',
          },
        });

        if (!response.ok) {
          let responseData = await response.json();

          throw new Error('Network response failed (' + response.status + ')', {
            cause: responseData,
          });
        }
        const json = await response.json();
        console.log(json);

        setData(json);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message, err.cause);
        }

        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, headers]);

  return { data, error, loading };
};

export default useFetch;
