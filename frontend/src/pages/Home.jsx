import Benefit from "../features/Home/Benefit"
import FeaturedCategory from "../features/Home/FeaturedCategory"
import FeaturedSection from "../features/Home/FeaturedSection"
import Hero from "../features/Home/Hero"
import HowItWorks from "../features/Home/HowItWorks"
import Testimonials from "../features/Home/Testimonials"
import usePageTitle from "../hooks/usePageTitle"

const Home = () => {

	usePageTitle('Premium Furniture & Appliance Rentals');

	return (
		<>
			<Hero />

			<section className="home-section">
				<FeaturedCategory />
			</section>

			<section className="home-section">
				<FeaturedSection />
			</section>

			<section className="home-section">
				<HowItWorks />
			</section>

			<section className="home-section">
				<Benefit />
			</section>

			<section className="home-section">
				<Testimonials />
			</section>
		</>
	)
}

export default Home
