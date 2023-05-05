import LocalStore from '../../store/localStore';

export const getPublicMemory = async (API_URL, id) => {
  const response = await fetch(`${API_URL}/api/v1/memories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${LocalStore.get('token')}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getPublicMemories = async (API_URL) => {
  const response = await fetch(`${API_URL}/api/v1/memories/public`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${LocalStore.get('token')}`,
    },
  });
  const data = await response.json();
  return data;
};
