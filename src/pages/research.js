import Layout from '../components/Layout';
import Link from 'next/link';

export default function Research() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mt-8">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ marginBottom: '24px' }}>
            <Link href="/research/nsf-projects" className="block" style={{ marginRight: '16px' }}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  1) Ongoing NSF Projects
                </h2>
                <p className="text-gray-600">
                  Current NSF-funded initiatives, including the RET Site on Interdisciplinary Water Science and Engineering and the NSF/IUSE data science project
                </p>
              </div>
            </Link>

            <Link href="/research/ongoing-studies" className="block" style={{ marginLeft: '16px' }}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  2) Ongoing Studies
                </h2>
                <p className="text-gray-600">
                  Active research studies and investigations
                </p>
              </div>
            </Link>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Link href="/research/past-projects" className="block" style={{ marginRight: '16px' }}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  3) Past Projects
                </h2>
                <p className="text-gray-600">
                  Completed research projects and their outcomes
                </p>
              </div>
            </Link>

            <Link href="/research/publications" className="block" style={{ marginLeft: '16px' }}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  4) Publications
                </h2>
                <p className="text-gray-600">
                  Research papers, reports, and publications
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
