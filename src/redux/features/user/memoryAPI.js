import LocalStore from '../../store/localStore';

export const getAllMemories = async (API_URL) => {
  const response = await fetch(`${API_URL}/api/v1/memories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${LocalStore.get('token')}`,
    },
  });
  const data = await response.json();
  return data;
};

export const createMemory = async (API_URL, memory) => {
  const response = await fetch(`${API_URL}/api/v1/memories`, {
    method: 'POST',
    headers: {
      Authorization: `${LocalStore.get('token')}`,
    },
    body: memory,
  });
  const data = await response.json();
  return data;
};

export const updateMemory = async (API_URL, id, memory) => {
  const response = await fetch(`${API_URL}/api/v1/memories/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `${LocalStore.get('token')}`,
    },
    body: memory,
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
