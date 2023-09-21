document.addEventListener('DOMContentLoaded', function () {
	// Пересчет rem в px 
	const rem = function (rem) {
		if (window.innerWidth > 768) {
			return 0.006944444 * window.innerWidth * rem;
		} else {
			// где 375 это ширина моб версии макета
			return (100 / 375) * (0.1 * window.innerWidth) * rem;
		}
	}

	// ГЛАВНАЯ
	if (document.querySelector('.main-products__content')) {
		document.querySelectorAll('.main-products__content').forEach(content => {
			const prev = content.querySelector('.prev');
			const next = content.querySelector('.next');
			const slider = content.querySelector('.swiper-container');
			const mainProductsSwiper = new Swiper(slider, {
				navigation: {
					nextEl: next,
					prevEl: prev,
				},
				breakpoints: {
					320: {
						slidesPerView: 'auto',
						spaceBetween: rem(1.6),
					},
					769: {
						slidesPerView: 3,
						spaceBetween: rem(1.6),
					}
				}
			})
		})

	}

	if (document.querySelector('.main-services__content')) {
		document.querySelectorAll('.main-services__content').forEach(content => {
			const prev = content.querySelector('.prev');
			const next = content.querySelector('.next');
			const slider = content.querySelector('.swiper-container');
			const mainServicesSwiper = new Swiper(slider, {
				navigation: {
					nextEl: next,
					prevEl: prev,
				},
				breakpoints: {
					320: {
						slidesPerView: 'auto',
						spaceBetween: rem(1.6),
					},
					769: {
						slidesPerView: 4,
						spaceBetween: rem(1.6),
					}
				}
			})
		})
	}


	if (document.querySelector('.main-about__content')) {
		document.querySelectorAll('.main-about__content').forEach(content => {
			const prev = content.querySelector('.prev');
			const next = content.querySelector('.next');
			const slider = content.querySelector('.swiper-container');
			const mainAboutSwiper = new Swiper(slider, {
				navigation: {
					nextEl: next,
					prevEl: prev,
				},
				breakpoints: {
					320: {
						slidesPerView: 'auto',
						spaceBetween: rem(1.6),
					},
					769: {
						slidesPerView: 3,
						spaceBetween: rem(1.6),
					}
				}
			})
		})
	}

	const ariclesSwiper = new Swiper('.articles__swiper', {
		navigation: {
			nextEl: '.articles__swiper-container .next',
			prevEl: '.articles__swiper-container .prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 'auto',
				spaceBetween: rem(1.6),
			},
			769: {
				slidesPerView: 3,
				spaceBetween: rem(1.6),
			}
		}
	})

	const specoffer = new Swiper('.specoffer_swiper', {
		direction: 'horizontal',
		slidesPerView: 1,
		spaceBetween: rem(1.6),
		navigation: {
			nextEl: '.specoffer_swiper-btn.next',
			prevEl: '.specoffer_swiper-btn.prev',
		},
		breakpoints: {
			400: {
				slidesPerView: 1.5,
			},
			768: {
				slidesPerView: 2.5,
			},
			992: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 3.5,
			},
			1200: {
				slidesPerView: 4,
			},

		}
	})

	const mySwiper = new Swiper('.opinion-swiper', {
		direction: "horizontal",
		slidesPerView: 1,
		spaceBetween: 16,
		// Navigation arrows
		navigation: {
			nextEl: '.opinion-swiper__next.next',
			prevEl: '.opinion-swiper__next.prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 2.5,
			},
			1024: {
				slidesPerView: 3,
			}
		},

		observer: true,

		observeParents: true,

		observeSlideChildren: true,

	});


	const cartSwiper = new Swiper('.cart-swiper', {

		direction: "horizontal",
		slidesPerView: 1.2,
		spaceBetween: rem(0.6),

		// Navigation arrows

		navigation: {
			nextEl: '.cart-swiper-btn.next',
			prevEl: '.cart-swiper-btn.prev',
		},

		breakpoints: {
			768: {
				slidesPerView: 2.1,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: rem(1.6),
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: rem(1.6),
			}
		},

		on: {
			init: function (cartSwiper) {
			},

			slideChange: function (cartSwiper) {
			}
		}

	});

	const aboutSwiper = new Swiper('.about-swiper', {
		direction: "horizontal",
		slidesPerView: 1.3,
		spaceBetween: 10,
		navigation: {
			nextEl: '.about-swiper-btn.next',
			prevEl: '.about-swiper-btn.prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
			}
		},

		observer: true,

		observeParents: true,

		observeSlideChildren: true,
	});


	const employeesSwiper = new Swiper('.employees-block__swiper', {
		direction: "horizontal",
		slidesPerView: 1.3,
		spaceBetween: rem(1),
		navigation: {
			nextEl: '.about-swiper-btn.next',
			prevEl: '.about-swiper-btn.prev',
		},
		breakpoints: {

			768: {
				slidesPerView: 2,
				spaceBetween: rem(1.6),
			},

			992: {
				slidesPerView: 2.5,
			},

			1024: {
				slidesPerView: 3,
			},
		},

		observer: true,

		observeParents: true,

		observeSlideChildren: true,

	});

	const articleSwiper = new Swiper('.article-swiper', {
		direction: "horizontal",
		slidesPerView: 1.1,
		spaceBetween: 12,

		navigation: {
			nextEl: '.swiper-btn.next',
			prevEl: '.swiper-btn.prev',
		},

	});

})



