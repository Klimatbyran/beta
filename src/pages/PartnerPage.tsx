import { useState } from 'react'
import { Building2 } from 'lucide-react'
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

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  return (
    <div className="max-w-[800px] mx-auto space-y-16 p-8">
      <Text variant="display">Bli vår partner</Text>
      <Text variant="large" className="text-grey">
        Vi erbjuder två typer av partnerskap: API-kund för vår kommersiella API och vänföretag där ni kan få vår logotyp och er placering i er sektorsindustri.
        <br /><br />
        <strong>API Access:</strong> Som API-kund får ni tillgång till vår omfattande databas med klimatdata, vilket möjliggör integration av våra data i era egna system och applikationer. Detta inkluderar realtidsdata om utsläpp, klimatmål och trender.
        <br /><br />
        <strong>Vänföretag:</strong> Som vänföretag får ni möjlighet att använda vår logotyp i ert marknadsföringsmaterial och på er webbplats. Ni kommer också att listas som en partner på vår webbplats, vilket ger er ökad synlighet inom er sektorsindustri.
      </Text>

      <div className="bg-black-2 rounded-level-2 p-8 mb-8">
        <Text variant="h3" className="mb-4">
          Exempel på partnerföretag
        </Text>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-2 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <Text variant="large" className="text-white">
              Företag AB
              <span className="ml-2 text-grey-500" style={{ opacity: 0.5 }}>
                ...
              </span>
            </Text>
            <Text variant="muted" className="text-sm">
              Vänföretag
            </Text>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="bg-green-2 text-white p-4 rounded">
          Tack för din förfrågan! Vi kommer att kontakta dig snart.
        </div>
      ) : (
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
      )}
    </div>
  )
}
