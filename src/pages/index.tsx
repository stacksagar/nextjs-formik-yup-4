import Link from 'next/link'

export default function Homepage() {
  return (
    <div className="w-full h-screen p-10 bg-gray-900 -mt-3 text-white"> 
      <div className="bg-gray-800 mt-3 w-72 mx-auto ring rounded text-white p-5 underline"> <Link href="/form">Go Signup-Form </Link> </div>
      <div className="bg-gray-800 mt-3 w-72 mx-auto ring rounded text-white p-5 underline"> <Link href="/form2">Go FieldArray-Form </Link> </div>
      <div className="bg-gray-800 mt-3 w-72 mx-auto ring rounded text-white p-5 underline"> <Link href="/form3">Go MultiStep-Form </Link> </div>
      <div className="bg-gray-800 mt-3 w-72 mx-auto ring rounded text-white p-5 underline"> <Link href="/form4">Go Upload-Form </Link> </div>
    </div>
  )
}