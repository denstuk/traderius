import { useEffect, useState } from "react"
import axios, { AxiosRequestConfig } from "axios";

export function useApi<T>(config: AxiosRequestConfig<any>) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>(null)

  const fetchApi = () => {
    axios(config).then(response => {
        console.log(response.data);
        setLoading(false);
        setData(response.data);
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data: data as T }
}
