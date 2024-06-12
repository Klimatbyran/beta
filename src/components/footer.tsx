import React from 'react'
import { Card } from './ui/card'

export function Footer() {
  return (
    <Card className="bg-black text-white">
      <footer className="text-left mt-10 p-6">
        <div className="max-w-4xl ml-auto">
          <p className="text-sm mb-2">Klimatkollen är en medborgarplattform som tillgängliggör klimatdata</p>
          <p className="text-sm text-white-400 mb-4">
            CC BY-SA <a href='http://creativecommons.org/licenses/by-sa/4.0/' className="underline">Attribution-ShareAlike 4.0 International license</a><br />
            Klimatkollen är utvecklad med <a href='https://github.com/Klimatbyran/klimatkollen' className="underline">öppen källkod</a> och drivs av den ideella föreningen Klimatbyrån.
          </p>
          <img src="/klimatkollen_logo.svg" alt="Klimatkollen logotyp" className="mb-4" width={250} />
        </div>
      </footer>
    </Card>
  )
}

export default Footer
