import { AppTabs } from "@/components/app-tabs";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl mb-8" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
        William Hill Sports - ASO Dashboard
      </h1>
      <AppTabs />
    </main>
  );
}
