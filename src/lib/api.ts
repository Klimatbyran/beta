import createClient from 'openapi-fetch';
import type { paths } from './api-types';

// Determine the base URL based on the environment
// For sitemap generation (Node.js environment), use the public API
// For browser environment, use the relative path
const baseUrl = typeof window === 'undefined' 
  ? 'https://api.klimatkollen.se/api' 
  : '/api';

const { GET, POST } = createClient<paths>({ baseUrl });

// Auth API
export async function authenticateWithGithub(code: string) {
  const {data, error} = await POST('/auth/github', {
    body: {
      code
    }
  })

  if(error) throw error;

  return data;
}

// Companies API
export async function getCompanies() {
  try {
    const { data, error } = await GET('/companies/', {});
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
}

export async function getCompanyDetails(id: string) {
  const { data, error } = await GET('/companies/{wikidataId}', {
    params: {
      path: {
        wikidataId: id
      }
    }
  });
  if (error) throw error;
  return data;
}

// Municipalities API
export async function getMunicipalities() {
  try {
    const { data, error } = await GET('/municipalities/', {});
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching municipalities:', error);
    return [];
  }
}

export async function getMunicipalityDetails(name: string) {
  const { data, error } = await GET('/municipalities/{name}', {
    params: {
      path: { name }
    }
  });
  if (error) throw error;
  return data;
}


