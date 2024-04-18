import { useState, useEffect } from 'react';

// Type for handling GraphQL error responses
interface GraphQLResponseError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: any;
}

// Type guard to check if an object is an Error
function isError(e: any): e is Error {
  return e && e.message && typeof e.message === 'string';
}

// Custom hook
const useGraphQLData = (query: string, variables: Record<string, any>, url: string = 'https://wordsearchmonkey.outsoar.ph/graphql') => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ query, variables }), 
        });

        const jsonData = await response.json();
        if (!response.ok) {
          const message = jsonData.errors
            ? jsonData.errors.map((e: GraphQLResponseError) => e.message).join('\n')
            : 'Error fetching data';
          throw new Error(message);
        }

        setData(jsonData.data);
      } catch (e) {
        if (isError(e)) {
          setError(e.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, variables, url]);

  return { data, loading, error };
};

export default useGraphQLData;
