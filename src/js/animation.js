
document.addEventListener('DOMContentLoaded', () => {
	let tl = gsap.timeline()


	tl.fromTo(".text", { y: 100, opacity: 0, }, { delay: 1, y: 0, opacity: 1, duration: 1, })

	tl.to(".catalog-hero", {

		scrollTrigger: {
			pin: ".catalog-hero",
			scrub: true,
			pinSpacing: false,
		},
		scale: 0.982,
		opacity: 0,
		start: top, top,
	})

})




let tl = gsap.timeline({

	scrollTrigger: {
		pin: ".site-container",
		scrub: true,
		pinSpacing: false,
	},

})

tl.to(".first", {
	scale: 0.982,
	opacity: .6,
	start: top, top,
})

tl.to(".wiper-container", {
	yPercent: -100,
	ease: "none",
	start: top, top,
}),

	tl.to(".wiper", {
		yPercent: -100,
		ease: "none",
	})


