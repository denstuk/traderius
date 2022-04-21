import { useEffect, useState } from "react"
import axios, { AxiosRequestConfig } from "axios";

export function useApi<T>(config: AxiosRequestConfig<any>) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T | undefined>(undefined)

  const fetchApi = async () => {
      const response = await axios({
          ...config,

      });
      setLoading(false);
      setData(response.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data: data as T }
}
