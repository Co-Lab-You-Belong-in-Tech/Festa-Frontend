import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API_URL from "../config";
// which component is g-iv-i-ng you problem?,home
export default function useFetch(url, dataKey = "payload") {
  const { token } = useSelector((state) => state.account);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1${url}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText == "OK") {
        setData(response.data[dataKey]);
      } else throw response;
    } catch (error) {
      setError(error.response?.data.message ?? error.message);
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  const mutate = useCallback(async () => {
    await getData();
  }, [getData, url]);

  useEffect(() => {
    getData();
    return () => {
      setData(undefined);
      setLoading(true);
      setError(null);
    };
  }, [url, getData]);

  return [data, loading, error, mutate];
}
