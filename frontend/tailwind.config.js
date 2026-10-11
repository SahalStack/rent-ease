/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: [
		"./*.html",
		"./src/**/*.{html,js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			colors: {
				"tertiary-container": "#955f54",
				"on-tertiary-fixed-variant": "#693a31",
				"error": "#ba1a1a",
				"on-primary-fixed-variant": "#194f46",
				"surface": "#f9faf8",
				"inverse-primary": "#9cd1c5",
				"on-error": "#ffffff",
				"on-tertiary-fixed": "#341009",
				"on-secondary-fixed-variant": "#594325",
				"surface-tint": "#34675e",
				"on-surface-variant": "#404946",
				"primary-fixed-dim": "#9cd1c5",
				"primary-fixed": "#b7ede1",
				"surface-container": "#edeeec",
				"background": "#f9faf8",
				"on-primary": "#ffffff",
				"tertiary-fixed-dim": "#f9b6a9",
				"inverse-surface": "#2e3130",
				"outline-variant": "#bfc8c5",
				"on-secondary-container": "#775e3e",
				"outline": "#707976",
				"surface-dim": "#d9dad8",
				"secondary-container": "#fcdab2",
				"secondary-fixed": "#ffddb5",
				"surface-container-low": "#f3f4f2",
				"error-container": "#ffdad6",
				"tertiary-fixed": "#ffdad3",
				"secondary-fixed-dim": "#e1c19a",
				"on-primary-container": "#c5fbee",
				"surface-container-lowest": "#ffffff",
				"on-surface": "#191c1b",
				"surface-variant": "#e1e3e1",
				"surface-container-highest": "#e1e3e1",
				"on-background": "#191c1b",
				"on-error-container": "#93000a",
				"secondary": "#725a3a",
				"primary": "#295d54",
				"tertiary": "#79473d",
				"surface-bright": "#f9faf8",
				"on-secondary": "#ffffff",
				"surface-container-high": "#e7e8e6",
				"on-tertiary": "#ffffff",
				"on-secondary-fixed": "#291801",
				"inverse-on-surface": "#f0f1ef",
				"primary-container": "#43766c",
				"on-primary-fixed": "#00201b",
				"on-tertiary-container": "#ffece8"
			},
			borderRadius: {
				DEFAULT: "0.25rem",
				lg: "0.5rem",
				xl: "0.75rem",
				full: "9999px"
			},
			spacing: {
				"stack-lg": "48px",
				"container-max": "1280px",
				"section-padding": "80px",
				gutter: "24px",
				"stack-sm": "12px",
				"margin-desktop": "40px",
				"stack-md": "24px",
				unit: "8px",
				"margin-mobile": "16px"
			},
			fontFamily: {
				"display-lg": ["Outfit"],
				"headline-md": ["Outfit"],
				"headline-sm": ["Outfit"],
				"body-lg": ["Outfit"],
				"body-md": ["Outfit"],
				"label-md": ["Outfit"],
				"caption": ["Outfit"]
			},
			fontSize: {
				"display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
				"headline-md": ["32px", { lineHeight: "1.2", fontWeight: "500" }],
				"headline-sm": ["24px", { lineHeight: "1.3", fontWeight: "500" }],
				"body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
				"body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
				"label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
				"caption": ["12px", { lineHeight: "1.4", fontWeight: "400" }]
			},
			keyframes: {
				fadeUp: {
					"0%": {
						opacity: "0",
						transform: "translateY(30px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},

				float: {
					"0%, 100%": {
						transform: "translateY(0px)",
					},
					"50%": {
						transform: "translateY(-10px)",
					},
				},
				heroFloat: {
					"0%, 100%": {
						transform: "translateY(0px) rotate(0deg)",
					},
					"25%": {
						transform: "translateY(-8px) rotate(1deg)",
					},
					"50%": {
						transform: "translateY(-12px) rotate(0deg)",
					},
					"75%": {
						transform: "translateY(-8px) rotate(-1deg)",
					},
				},
			},
			animation: {
				fadeUp: "fadeUp 0.8s ease-out forwards",
				float: "float 2s ease-in-out infinite",
				heroFloat: "heroFloat 5s ease-in-out infinite",
			},
		},

	},
	plugins: []
}