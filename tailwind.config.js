module.exports = {
	content: ["./dist/**/*.{html,js}"],
	container: {
		center: true,
		padding: "1rem",
	},
	theme: {
		extend: {
			fontFamily: {
				kumbh: ["Kumbh Sans"],
			},
			colors: {
				orange: "hsl(26, 100%, 55%)",
				"pale-orange": "hsl(25, 100%, 94%)",
				"very-dark": "hsl(220, 13%, 13%)",
				"dark-grayish": "hsl(219, 9%, 45%)",
				grayish: "hsl(220, 14%, 75%)",
				light: "hsl(223, 64%, 98%)",
			},
			animation: {
				change: "change .3s linear 1",
				lightChange: "lightbox .3s linear 1",
				lightReverse: "lightbox .3s linear 1 forwards reverse",
			},
			keyframes: {
				change: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				lightbox: {
					"0%": { opacity: "0" },
					"100%": { opacity: "0.75" },
				},
			},
			screens: {
				"2xl": "1320px",
			},
		},
	},
	plugins: [],
};
