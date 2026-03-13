import Head from "next/head";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";

const DynamicUnityGame = dynamic(() => import("../components/UnityGame"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[80vh] bg-gray-900 flex items-center justify-center text-white rounded-lg">
      Initializing Engine...
    </div>
  ),
});

export default function Simulation() {
  return (
    <Layout>
      <Head>
        <title>LEWAS | Simulation</title>
        <meta name="description" content="Interactive 3D Simulation" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Virtual LEWAS Field Site
        </h1>

        <DynamicUnityGame />

        <div className="mt-4 text-gray-600">
          <p>Controls: Use mouse to look around. Identify any hazards.</p>
        </div>
      </div>
    </Layout>
  );
}