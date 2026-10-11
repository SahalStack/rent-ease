import usePageTitle from '../hooks/usePageTitle';

const ContactUs = () => {
	usePageTitle('Contact');

	return (
		<main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-section-padding space-y-stack-lg animate-fadeUp">
			<header className="text-center max-w-2xl mx-auto">
				<span className="inline-block bg-primary-fixed text-on-primary-fixed-variant px-4 py-1 rounded-full font-label-md text-label-md uppercase tracking-widest mb-4">
					Contact Us
				</span>
				<h1 className="font-display-lg text-display-lg text-on-surface mb-4">We're Here to Help</h1>
				<p className="font-body-lg text-body-lg text-on-surface-variant">
					Have questions about rentals, orders, or support? Get in touch with us and our dedicated team will assist you shortly.
				</p>
			</header>
			<div className="flex justify-center py-unit">
				<img alt="Minimalist telephone icon" className="w-32 h-32 md:w-40 md:h-40 opacity-90 transition-transform duration-500 hover:scale-105" src="/images/teleIcon.png" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
				<div className="text-center space-y-2 p-6 rounded-xl hover:bg-surface-container-low transition-colors duration-300">
					<div className="bg-primary-container text-on-primary-container w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
						<span className="material-symbols-outlined">phone</span>
					</div>
					<h3 className="font-headline-sm text-headline-sm text-on-surface">Call Us</h3>
					<p className="font-body-md text-body-md text-on-surface-variant">Mon-Fri 8am to 6pm</p>
					<a className="font-label-md text-label-md text-primary hover:underline block pt-1" href="tel:+1555000000">+1 (555) 000-0000</a>
				</div>
				<div className="text-center space-y-2 p-6 rounded-xl hover:bg-surface-container-low transition-colors duration-300">
					<div className="bg-primary-container text-on-primary-container w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
						<span className="material-symbols-outlined">mail</span>
					</div>
					<h3 className="font-headline-sm text-headline-sm text-on-surface">Email Us</h3>
					<p className="font-body-md text-body-md text-on-surface-variant">Friendly support team</p>
					<a className="font-label-md text-label-md text-primary hover:underline block pt-1" href="mailto:support@rentease.com">support@rentease.com</a>
				</div>
				<div className="text-center space-y-2 p-6 rounded-xl hover:bg-surface-container-low transition-colors duration-300">
					<div className="bg-primary-container text-on-primary-container w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
						<span className="material-symbols-outlined">location_on</span>
					</div>
					<h3 className="font-headline-sm text-headline-sm text-on-surface">Visit Us</h3>
					<p className="font-body-md text-body-md text-on-surface-variant">San Francisco, CA 94103</p>
					<p className="font-label-md text-label-md text-on-surface pt-1">123 Design Avenue, Ste 400</p>
				</div>
			</div>
			<div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl card-shadow border border-surface-container-high transition-shadow duration-300 hover-card-shadow max-w-2xl mx-auto w-full">
				<form className="space-y-6" id="contactForm">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="font-label-md text-label-md text-on-surface-variant" for="name">Full Name</label>
							<input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/50" id="name" name="name" placeholder="John Doe" required="" type="text" />
						</div>
						<div className="space-y-2">
							<label className="font-label-md text-label-md text-on-surface-variant" for="email">Email Address</label>
							<input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/50" id="email" name="email" placeholder="john@example.com" required="" type="email" />
						</div>
					</div>
					<div className="space-y-2">
						<label className="font-label-md text-label-md text-on-surface-variant" for="subject">Subject</label>
						<select className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" id="subject" name="subject" required="">
							<option disabled="" selected="" value="">Select a subject</option>
							<option value="rental">Rental Inquiry</option>
							<option value="billing">Billing &amp; Orders</option>
							<option value="support">Technical Support</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div className="space-y-2">
						<label className="font-label-md text-label-md text-on-surface-variant" for="message">Message</label>
						<textarea className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/50 resize-none" id="message" name="message" placeholder="How can we help you?" required="" rows="5"></textarea>
					</div>
					<button className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-4 rounded-lg font-bold tracking-wider hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
						<span>Send Message</span>
						<span className="material-symbols-outlined text-[18px]">send</span>
					</button>
				</form>
			</div>
			<section className="pt-stack-lg">
				<div className="bg-surface-container-low p-8 rounded-2xl flex flex-col items-center justify-center gap-6 text-center transition-all duration-300 hover:bg-surface-container">
					<div className="max-w-lg">
						<h2 className="font-headline-md text-headline-md text-on-surface mb-2">Need Quick Answers?</h2>
						<p className="font-body-md text-body-md text-on-surface-variant">
							Browse our frequently asked questions to find immediate solutions regarding delivery, returns, and assembly.
						</p>
					</div>
					<button className="bg-surface-container-lowest text-primary border border-primary px-10 py-3 rounded-lg font-label-md text-label-md font-bold hover:bg-primary-fixed transition-colors active:scale-95 duration-200">
						View FAQs
					</button>
				</div>
			</section>
		</main>
	)
}
export default ContactUs
