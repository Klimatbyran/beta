
import React, { useEffect, useState } from 'react'
import { Company } from './company'
import type { CompanyData } from '@/data/companyData'

export const Companies = () => {
  const [companies, setCompanies] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching data')
        const response = await fetch('https://api.klimatkollen.se/api/companies')
        const data = await response.json() as CompanyData[]
        console.log('data', data)
        setCompanies(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };

    fetchData()
  }, [])

  return (
    <>
      <h1>Companies</h1>
      {companies.map((company, index) => (
        <Company key={index} company={company} />
      ))}
    </>
  )
}

export default Companies