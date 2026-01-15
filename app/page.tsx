import Banner from '@/components/Banner'
import WhyTrueAutoCheck from '@/components/WhyTrueAutoCheck'
import FeaturesGrid from '@/components/FeaturesGrid'
import HowItWorks from '@/components/HowItWorks'
import Statistics from '@/components/Statistics'
import Testimonials from '@/components/Testimonials'
import VinChecker from '@/components/VinChecker'
import Support from '@/components/Support'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <>
      <Banner />
      <WhyTrueAutoCheck />
      <FeaturesGrid />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <VinChecker />
      <Support />
      <ChatWidget position="right" />
    </>
  );
}
