import { useState } from 'react'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function PartnerPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    partnershipType: 'api',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="max-w-[800px] mx-auto space-y-16 p-8">
      <Text variant="display">Bli vår partner</Text>
      <Text variant="large" className="text-grey">
        Vi erbjuder två typer av partnerskap: API-kund för vår kommersiella API och vänföretag där ni kan få vår logotyp och er placering i er sektorsindustri.
      </Text>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-grey">
            Företagsnamn
          </label>
          <Input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-grey">
            Kontakt E-post
          </label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-grey">Typ av partnerskap</label>
          <div className="mt-1 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="partnershipType"
                value="api"
                checked={formData.partnershipType === 'api'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">API-kund</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="partnershipType"
                value="friend"
                checked={formData.partnershipType === 'friend'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Vänföretag</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-grey">
            Meddelande
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full">
          Skicka förfrågan
        </Button>
      </form>
    </div>
  )
}
