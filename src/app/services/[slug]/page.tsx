import { services } from "@/lib/utils";
import { ServiceDetailClient } from "@/components/ServiceDetail/ServiceDetailClient";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient />;
}
