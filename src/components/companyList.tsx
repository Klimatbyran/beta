import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { CompanyData } from '@/data/companyData'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'

const Logo = () => <></>

export function CompanyList(props: any) {
  console.log('props', props)
  const companies = props?.companies as CompanyData[]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hur går det för företagen?</CardTitle>
        <CardDescription>Utsläpp från 2023.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Namn</TableHead>
              <TableHead>Industri</TableHead>
              <TableHead className="hidden md:table-cell">
                Egna utsläpp
              </TableHead>
              <TableHead className="hidden md:table-cell">
                I värdekedjan
              </TableHead>
              <TableHead>Wikidata?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company, i) => (
              <a
                href={
                  '/companies/' +
                  company.companyName.toLowerCase().replace(/ /g, '-')
                }
                key={i}
              >
                <TableRow>
                  <TableCell className="font-bold">
                    <a
                      href={`/companies/${company.companyName.replaceAll(' ', '-')}`}
                    >
                      {company.companyName}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {company.industryGics.sector.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {company.emissions['2023']?.scope1.emissions +
                        company.emissions['2023']?.scope2.emissions || null}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {company.emissions['2023']?.scope3.emissions}
                    </Badge>
                  </TableCell>
                  {company.wikidata?.url && (
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-400 text-black"
                      >
                        OK
                      </Badge>
                    </TableCell>
                  )}
                </TableRow>
              </a>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Listan är baserad på data inhämtad från vårt AI och visar senaste data
          för 2023.
        </div>
      </CardFooter>
    </Card>
  )
}
