import createClient from 'openapi-fetch';
import type { paths } from './api-types';

const baseUrl = '/api';
const { GET } = createClient<paths>({ baseUrl });

export async function getEmissionsBySector() {
  const { data, error } = await GET('/emissions/sectors', {});
  if (error) throw error;
  return data || [];
}

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