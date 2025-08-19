import { notFound } from 'next/navigation';
import { getSubdomain } from '@/lib/subdomains';
import Dashboard from './dashboard';
import type { Metadata } from 'next';
import { rootDomain } from '@/lib/utils';

export async function generateMetadata({ 
  params,
 }: {
  params: { subdomain: string };
 }): Promise<Metadata> {
  const subdomain = await getSubdomain(params.subdomain);

  if (!subdomain) {
    return {
      title: rootDomain,
    };
  }

  return {
    title: `${subdomain.name}.${rootDomain}`,
    description: `Subdomain page for ${subdomain.name}.${rootDomain}`,
  };
}

export default async function Page({ 
  params,
 }: { 
  params: { subdomain: string };
 }) {
  const subdomain = await getSubdomain(params.subdomain);

  if (!subdomain) {
    notFound();
  }

  return <Dashboard subdomain={subdomain} />;
}
