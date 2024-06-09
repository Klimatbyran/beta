import { Card } from './ui/card'

export function Footer() {
  return (
    <Card>
      <footer className="text-center mt-10">
        <p className="text-lg mb-2">Kontakta oss</p>
        <p className="text-5xl mb-4">hej@klimatkollen.se</p>
        <button className="px-4 py-2 mb-4 bg-gray-700 rounded-md text-white">
          Kopiera mailadress
        </button>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#">
            <i className="fab fa-github"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-discord"></i>
          </a>
        </div>
        <p className="text-sm text-gray-400 mb-2">
          Klimatkollen är en medborgarplattform som tillgängliggör klimatdata
          och är utvecklad med öppen källkod.
        </p>
        <div className="flex justify-center space-x-4 text-gray-400 text-sm">
          <a href="#">Privacy & Terms</a>
          <a href="#">International license</a>
          <a href="#">CC BY-SA - Attribution-ShareAlike 4.0</a>
        </div>
      </footer>
    </Card>
  )
}
