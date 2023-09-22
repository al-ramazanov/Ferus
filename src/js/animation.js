let tl = gsap.timeline({
	scrollTrigger: {
		pin: ".site-container",
		scrub: true,
		pinSpacing: false,
	}
})

tl.to(".first", {
	scale: 0.96,
	opacity: .6,

}),

	tl.to(".wiper-container", {
		yPercent: -120,
		ease: "none",
		start: top, top,
		opacity: .6,

	}),

	tl.to(".wiper", {
		yPercent: -110,
		ease: "none",
	})

let tl2 = gsap.timeline()


tl2.fromTo(".text", { y: 100, opacity: .5, }, { y: 0, opacity: 1, duration: 1, })