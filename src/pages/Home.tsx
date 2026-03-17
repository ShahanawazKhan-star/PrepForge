import { Hero } from '../components/Hero';
import { MainLayout } from '../layouts/MainLayout';
import { CompanyLogos } from '../components/CompanyLogos';
import { PreviewGrid } from '../components/PreviewGrid';

export const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <CompanyLogos />
      <PreviewGrid />
    </MainLayout>
  );
};
