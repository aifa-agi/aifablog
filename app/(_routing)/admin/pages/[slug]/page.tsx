// @/app/admin/pages/[slug]/page.tsx

import FakeAuthSelector from "@/app/(_service)/components/fake-auth-selector";



export default async function AdminPageDetails() {
  

  

    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-6 pb-4 border-b">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Page Administration
            </h1>
            <p className="text-gray-600">
              Managing page content and settings
            </p>
            <FakeAuthSelector />
          </div>

          
        </div>
      </div>)
  
}
