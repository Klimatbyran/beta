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
  const { data, error } = await GET('/companies/', {});
  if (error) throw error;
  return data || [];
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
  const { data, error } = await GET('/municipalities/', {});
  if (error) throw error;
  return data || [];
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

export async function updateReportingPeriods(wikidataId: string, body) {
  const {data, error} = await POST('/companies/{wikidataId}/reporting-periods', {
    params: {
      path: {wikidataId}
    },
    body
  });
  if(error) throw error;
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