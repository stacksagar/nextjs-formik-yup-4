import ActiveLink from "tailwindUI/ActiveLink"
import Link from 'next/link'

export default function Header() {
  return (
<>
  <header className={` opacity-95 fixed top-0 left-0 bg-gray-900 w-full h-10 p-3 text-white flex items-center justify-between`}>
  <Link href="/"> LOGO </Link>
  <nav>
    <ul className="flex justify-between">
      <li className="mx-2"> <ActiveLink href={"/"}> Homepage </ActiveLink> </li>
      <li className="mx-2"> <ActiveLink href={"/form"}> Signup-Form </ActiveLink> </li>
      <li className="mx-2"> <ActiveLink href={"/form2"}> FieldArray-Form </ActiveLink> </li>
      <li className="mx-2"> <ActiveLink href={"/form3"}> MultiStep-Form </ActiveLink> </li>
      <li className="mx-2"> <ActiveLink href={"/form4"}> Upload-Form </ActiveLink> </li>
    </ul>
  </nav>
 </header>
  <br />
  <br /> 
</>
 
  )
}