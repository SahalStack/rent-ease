const Footer = () => {
	return (
		<footer className="bg-surface-container dark:bg-surface-container-high w-full py-stack-lg">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto">
				<div className="flex flex-col gap-4">
					<div className="font-headline-sm text-headline-sm text-primary">RentEase</div>
					<p className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim">Elevating home living
						with premium furniture rentals and modern appliance solutions.</p>
				</div>
				<div className="flex flex-col gap-4">
					<h4 className="font-label-md text-label-md text-primary uppercase tracking-widest">Navigation</h4>
					<ul className="flex flex-col gap-2">
						<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
							href="#">Browse Catalog</a></li>
						<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
							href="#">How it Works</a></li>
						<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
							href="#">Membership</a></li>
						<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
							href="#">Reviews</a></li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h4 className="font-label-md text-label-md text-primary uppercase tracking-widest">Support</h4>
					<ul className="flex flex-col gap-2">
						<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
							href="#">Contact Us</a></li>
						<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
							href="#">Rental Agreement</a></li>
						<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
							href="#">Terms of Service</a></li>
						<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
							href="#">Privacy Policy</a></li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h4 className="font-label-md text-label-md text-primary uppercase tracking-widest">Newsletter</h4>
					<p className="font-caption text-caption text-on-surface-variant">Stay updated with our latest furniture
						arrivals and exclusive rental offers.</p>
					<div className="flex gap-2">
						<input
							className="w-full bg-surface-container-lowest border-outline-variant rounded-lg px-4 py-2 text-body-md focus:ring-primary focus:border-primary"
							placeholder="Email" type="email" />
						<button className="bg-primary text-white p-2 rounded-lg flex items-center justify-center">
							<span className="material-symbols-outlined text-sm" data-icon="send">send</span>
						</button>
					</div>
				</div>
			</div>
			<div
				className="mt-12 pt-8 border-t border-outline-variant/20 px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant opacity-75">
				<p className="font-caption text-caption">© 2024 RentEase. Elevating home living.</p>
				<div className="flex gap-6">
					<span className="material-symbols-outlined cursor-pointer hover:text-primary"
						data-icon="facebook">face_nod</span>
					<span className="material-symbols-outlined cursor-pointer hover:text-primary"
						data-icon="instagram">infrared</span>
					<span className="material-symbols-outlined cursor-pointer hover:text-primary"
						data-icon="twitter">filter</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
