import createClient from 'openapi-fetch';
import type { paths } from './api-types';

const baseUrl = '/api';
const { GET, POST } = createClient<paths>({ baseUrl });

// Cache configuration
const defaultCacheTime = 1000 * 60 * 5; // 5 minutes
const defaultStaleTime = 1000 * 60 * 2; // 2 minutes

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
    // For sitemap generation, return fallback data if API is unavailable
    if (typeof window === 'undefined') {
      console.log('Using fallback company data for sitemap generation');
      return [
        { wikidataId: 'Q123456', name: 'Volvo' },
        { wikidataId: 'Q234567', name: 'Ericsson' },
        { wikidataId: 'Q345678', name: 'IKEA' },
        { wikidataId: 'Q456789', name: 'H&M' },
        { wikidataId: 'Q567890', name: 'Spotify' }
      ];
    }
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
    // For sitemap generation, return fallback data if API is unavailable
    if (typeof window === 'undefined') {
      console.log('Using fallback municipality data for sitemap generation');
      return [
        { name: 'Stockholm', region: 'Stockholm' },
        { name: 'Göteborg', region: 'Västra Götaland' },
        { name: 'Malmö', region: 'Skåne' },
        { name: 'Uppsala', region: 'Uppsala' },
        { name: 'Västerås', region: 'Västmanland' }
      ].map(m => ({
        ...m,
        id: m.name.toLowerCase()
          .replace(/[åä]/g, "a")
          .replace(/[ö]/g, "o")
          .replace(/[é]/g, "e")
          .replace(/[\s-]+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      }));
    }
    return [];
  }
}

export async function getMunicipalityDetails(id: string) {
  const { data, error } = await GET('/municipalities/{id}', {
    params: {
      path: { id }
    }
  });
  if (error) throw error;
  return data;
}

// Other API endpoints...
export async function getCO2Level() {
  const { data, error } = await GET('/co2', {});
  if (error) throw error;
  return data;
}

export async function getSeaLevel() {
  const { data, error } = await GET('/sea-level', {});
  if (error) throw error;
  return data;
}

export async function getArcticIce() {
  const { data, error } = await GET('/arctic-ice', {});
  if (error) throw error;
  return data;
}
