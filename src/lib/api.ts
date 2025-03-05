import createClient from 'openapi-fetch';
import type { paths } from './api-types';
import { authMiddleware } from './auth-middleware';

const baseUrl = '/api';
const client = createClient<paths>({ baseUrl });
client.use(authMiddleware);

// Cache configuration
const defaultCacheTime = 1000 * 60 * 5; // 5 minutes
const defaultStaleTime = 1000 * 60 * 2; // 2 minutes

// Auth API
export async function authenticateWithGithub(code: string) {
  const {data, error} = await client.POST('/auth/github', {
    body: {
      code
    }
  })

  if(error) throw error;

  return data;
}

// Companies API
export async function getCompanies() {
  const { data, error } = await client.GET('/companies/', {});
  if (error) throw error;
  return data || [];
}

export async function getCompanyDetails(id: string) {
  const { data, error } = await client.GET('/companies/{wikidataId}', {
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
  const { data, error } = await client.GET('/municipalities/', {});
  if (error) throw error;
  return data || [];
}

export async function getMunicipalityDetails(id: string) {
  const { data, error } = await client.GET('/municipalities/{id}', {
    params: {
      path: { id }
    }
  });
  if (error) throw error;
  return data;
}

export async function updateReportingPeriods(wikidataId: string, body) {
  const {data, error} = await client.POST('/companies/{wikidataId}/reporting-periods', {
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
  const { data, error } = await client.GET('/co2', {});
  if (error) throw error;
  return data;
}

export async function getSeaLevel() {
  const { data, error } = await client.GET('/sea-level', {});
  if (error) throw error;
  return data;
}

export async function getArcticIce() {
  const { data, error } = await client.GET('/arctic-ice', {});
  if (error) throw error;
  return data;
}