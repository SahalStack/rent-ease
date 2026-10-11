/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"on-error-container": "#93000a",
				"inverse-on-surface": "#f0f1ef",
				primary: "#295d54",
				"on-error": "#ffffff",
				"error-container": "#ffdad6",
				"on-tertiary-fixed-variant": "#693a31",
				"on-secondary": "#ffffff",
				"secondary-fixed-dim": "#e1c19a",
				"surface-container": "#edeeec",
				"secondary-fixed": "#ffddb5",
				"surface-container-high": "#e7e8e6",
				background: "#f9faf8",
				"inverse-primary": "#9cd1c5",
				"secondary-container": "#fcdab2",
				"surface-dim": "#d9dad8",
				"surface-container-lowest": "#ffffff",
				"on-background": "#191c1b",
				"primary-container": "#43766c",
				"on-tertiary-fixed": "#341009",
				"tertiary-container": "#955f54",
				"surface-variant": "#e1e3e1",
				"surface-container-highest": "#e1e3e1",
				"surface-bright": "#f9faf8",
				"surface-tint": "#34675e",
				"on-secondary-fixed-variant": "#594325",
				"tertiary-fixed-dim": "#f9b6a9",
				"on-secondary-fixed": "#291801",
				"on-primary-fixed-variant": "#194f46",
				"on-tertiary": "#ffffff",
				error: "#ba1a1a",
				outline: "#707976",
				"on-primary-fixed": "#00201b",
				"inverse-surface": "#2e3130",
				tertiary: "#79473d",
				"on-surface-variant": "#404946",
				"on-surface": "#191c1b",
				"on-secondary-container": "#775e3e",
				secondary: "#725a3a",
				"on-primary-container": "#c5fbee",
				"on-primary": "#ffffff",
				"primary-fixed-dim": "#9cd1c5",
				"primary-fixed": "#b7ede1",
				"surface-container-low": "#f3f4f2",
				"outline-variant": "#bfc8c5",
				"on-tertiary-container": "#ffece8",
				"tertiary-fixed": "#ffdad3",
				surface: "#f9faf8",
			},

			borderRadius: {
				DEFAULT: "0.25rem",
				lg: "0.5rem",
				xl: "0.75rem",
				full: "9999px",
			},

			spacing: {
				unit: "8px",
				"stack-md": "24px",
				"stack-lg": "48px",
				"section-padding": "80px",
				"container-max": "1280px",
				"margin-mobile": "16px",
				"stack-sm": "12px",
				"margin-desktop": "40px",
				gutter: "24px",
			},

			fontFamily: {
				"headline-sm": ["Outfit"],
				caption: ["Outfit"],
				"body-md": ["Outfit"],
				"body-lg": ["Outfit"],
				"display-lg-mobile": ["Outfit"],
				"label-md": ["Outfit"],
				"headline-md": ["Outfit"],
				"display-lg": ["Outfit"],
			},

			fontSize: {
				"headline-sm": [
					"24px",
					{
						lineHeight: "1.3",
						fontWeight: "500",
					},
				],

				caption: [
					"12px",
					{
						lineHeight: "1.4",
						fontWeight: "400",
					},
				],

				"body-md": [
					"16px",
					{
						lineHeight: "1.6",
						fontWeight: "400",
					},
				],

				"body-lg": [
					"18px",
					{
						lineHeight: "1.6",
						fontWeight: "400",
					},
				],

				"display-lg-mobile": [
					"36px",
					{
						lineHeight: "1.2",
						letterSpacing: "-0.02em",
						fontWeight: "600",
					},
				],

				"label-md": [
					"14px",
					{
						lineHeight: "1.4",
						letterSpacing: "0.05em",
						fontWeight: "600",
					},
				],

				"headline-md": [
					"32px",
					{
						lineHeight: "1.2",
						fontWeight: "500",
					},
				],

				"display-lg": [
					"48px",
					{
						lineHeight: "1.1",
						letterSpacing: "-0.02em",
						fontWeight: "600",
					},
				],
			},
		},
	},
};