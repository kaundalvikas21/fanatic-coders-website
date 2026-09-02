import axios from 'axios';

export async function swrFetcher<T>(url: string): Promise<T> {
  const response = await axios.get<T>(url);

  return response.data;
}

export const swrConfig = {
  fetcher: swrFetcher,
};
