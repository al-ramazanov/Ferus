document.addEventListener('DOMContentLoaded', function () {

	// хедер при скролле
	const header = document.querySelector('header');
	const body = document.body;
	const html = document.documentElement;

	window.addEventListener("scroll", function () {
		header.classList.toggle("scroll", window.scrollY > 150);
	});

	// функция клика вне элемента

	function clickOutside(elem, needToClose) {
		document.addEventListener('click', function (e) {
			if (e.target !== elem && !elem.contains(e.target)) {
				needToClose.classList.remove('active');
			}
		})
	}

	// функция открытия попапа

	function openPopupElement(element) {
		if (window.innerWidth > 768) {
			let scrollWidth = (window.innerWidth - body.clientWidth);
			body.style.paddingRight = `${scrollWidth}px`;
			header.style.paddingRight = `${scrollWidth}px`
		}
		body.classList.add('lock', 'dark');
		html.classList.add('lock');
		element.classList.add('active');
	}

	// функция закрытия попапа

	function closePopupElement(element) {
		body.classList.remove('lock');
		body.classList.remove('dark');
		html.classList.remove('lock');
		element.classList.remove('active');
		if (window.innerWidth > 768) {
			body.style.paddingRight = '0';
			header.style.paddingRight = '0';
		}
		if (document.querySelector('.choose-city').classList.contains('active')) {
			document.body.classList.add('dark', 'lock')
			document.documentElement.classList.add('lock')
		}
	}

	const headerContacts = header.querySelectorAll('.header-contacts');
	const starDay = 8;
	const finishDay = 18;

	function checkTime() {
		const now = new Date();
		var offset = 3;
		if (now.getUTCHours() + offset >= starDay && now.getUTCHours() + offset < finishDay) {
			headerContacts.forEach(item => {
				item.querySelector('.header-contacts__online').classList.add('active');
				item.querySelector('.header-contacts__offline').classList.remove('active');
			})

		} else {
			headerContacts.forEach(item => {
				item.querySelector('.header-contacts__online').classList.remove('active');
				item.querySelector('.header-contacts__offline').classList.add('active');
			})
		}

		setTimeout(() => {
			checkTime()
		}, 60000);
	}

	checkTime();


	const contactsBtns = header.querySelectorAll('.contacts');

	contactsBtns.forEach(btn => {
		btn.addEventListener('click', function (e) {
			e.stopPropagation()
			document.querySelector('.header-contacts').classList.toggle('active');
		})

		document.addEventListener('click', (e) => {

			if (e.target !== btn) {
				document.querySelector('.header-contacts').classList.remove('active');
			}

		})
	})



	if (window.innerWidth <= 768) {
		const headerContactsMobile = header.querySelector('.header__top + .header-contacts');
		const headerContactsMobileOpen = document.querySelector('.header__bottom-contacts');
		const headerContactsMobileClose = headerContactsMobile.querySelector('.header-contacts__close');
		headerContactsMobileOpen.addEventListener('click', function () {
			headerContactsMobile.classList.add('active');
		})

		headerContactsMobileClose.addEventListener('click', function () {
			headerContactsMobile.classList.remove('active');
		})
	}

	// определение города

	const locationBlock = document.querySelector('.header__top-location');
	const locationBlockOk = locationBlock.querySelector('.header__top-location__ok');
	setTimeout(() => {
		locationBlock.classList.add('active');
		locationBlockOk.classList.add('active');
	}, 200);
	setTimeout(() => locationBlock.classList.remove('active'), 3000);

	locationBlockOk.addEventListener('click', function () {
		locationBlock.classList.remove('active');
	})

	const chooseLocationBlock = document.querySelector('.choose-city');

	const locationBlockChange = locationBlock.querySelector('.header__top-location__change');

	locationBlockChange.addEventListener('click', function (e) {
		e.stopPropagation()
		locationBlock.classList.remove('active');
		chooseLocationBlock.classList.add('active');
		let scrollWidth = (window.innerWidth - document.body.clientWidth);
		header.style.paddingRight = `${scrollWidth}px`
		document.body.style.paddingRight = `${scrollWidth}px`;
		document.body.classList.add('lock');
		document.documentElement.classList.add('lock');

	})
	document.addEventListener('click', (e) => {
		if (e.target == document.body) {
			header.style.paddingRight = null
			document.body.style.paddingRight = null
			document.body.classList.remove('lock');
			document.body.classList.remove('dark');
			document.documentElement.classList.remove('lock');
			chooseLocationBlock.classList.remove('active');

		}
	})


	const mobileLocationBtn = document.querySelector('.header__bottom-location');
	mobileLocationBtn.addEventListener('click', function () {
		locationBlock.classList.remove('active');
		chooseLocationBlock.classList.add('active');
		document.body.classList.add('lock');
		document.documentElement.classList.add('lock');
	})

	if (document.querySelector('.choose-city__close')) {
		const locationBlockChangeClose = document.querySelector('.choose-city__close');
		locationBlockChangeClose.addEventListener('click', function () {
			chooseLocationBlock.classList.remove('active');
			setTimeout(() => {
				if (window.innerWidth > 768) {
					header.style.paddingRight = '0';
					document.body.style.paddingRight = '0';
				}
				document.body.classList.remove('dark');
				document.body.classList.remove('lock');
				document.documentElement.classList.remove('lock');
			}, 200);

		})
	}

	// const headerLocation = document.querySelectorAll('.header__top-city');
	// headerLocation.addEventListener('click', function () {
	// 	if (window.innerWidth > 768) {
	// 		let scrollWidth = (window.innerWidth - document.body.clientWidth);
	// 		header.style.paddingRight = `${scrollWidth}px`
	// 		document.body.style.paddingRight = `${scrollWidth}px`;
	// 	}
	// 	document.body.classList.add('dark');
	// 	document.body.classList.add('lock');
	// 	document.documentElement.classList.add('lock');
	// 	locationBlock.classList.remove('active');
	// 	chooseLocationBlock.classList.add('active');
	// })


	const headerLocation = document.querySelectorAll('.header__top-city');
	for (const item of headerLocation) {
		item.addEventListener('click', function () {
			if (window.innerWidth > 768) {
				let scrollWidth = (window.innerWidth - document.body.clientWidth);
				header.style.paddingRight = `${scrollWidth}px`
				document.body.style.paddingRight = `${scrollWidth}px`;
			}
			document.body.classList.add('dark');
			document.body.classList.add('lock');
			document.documentElement.classList.add('lock');
			locationBlock.classList.remove('active');
			chooseLocationBlock.classList.add('active');
		})
	}


	const cityList = ['Москва', 'Архангельск', 'Благовещенск', 'Братск', 'Брянск', 'Челябинск', 'Чита', 'Тольятти', 'Иркутск', 'Ижевск', 'Калининград', 'Калуга', 'Казань', 'Кемерово'];

	const inputSearchCity = document.querySelector('.choose-city__right-form__input');
	const searchList = document.querySelector('.choose-city__right-list');
	const searchResultBlock = document.querySelector('.choose-city__right-result');
	const searchResultList = document.querySelector('.choose-city__right-result__list');
	const searchNoResultBlock = document.querySelector('.choose-city__right-noresult');
	const searchBtn = document.querySelector('.choose-city__right-form__btn');
	const clearBtn = document.querySelector('.choose-city__right-form__clear');

	clearBtn.addEventListener('click', function (e) {
		e.preventDefault();
		inputSearchCity.value = '';
		searchResultBlock.classList.remove('active');
		searchList.classList.remove('inactive');
		searchNoResultBlock.classList.remove('active');
		searchBtn.classList.remove('inactive');
		clearBtn.classList.remove('active');
	})


	let matchList = [];

	inputSearchCity.addEventListener('input', function (e) {

		if (!e.target.value) {
			searchResultBlock.classList.remove('active');
			searchList.classList.remove('inactive');
			searchNoResultBlock.classList.remove('active');
			searchBtn.classList.remove('inactive');
			clearBtn.classList.remove('active');
			return;
		}

		searchBtn.classList.add('inactive');
		clearBtn.classList.add('active');
		matchList = [];
		searchResultList.innerHTML = "";

		searchList.classList.add('inactive');
		searchResultBlock.classList.add('active');

		cityList.forEach(city => {

			if (matchList.includes(city)) {
				return;
			}

			if (city.toLowerCase().startsWith(e.target.value.toLowerCase())) {
				matchList.push(city);
			}
		})

		if (!matchList.length) {
			searchResultBlock.classList.remove('active');
			searchNoResultBlock.classList.add('active');
			return;
		}

		searchNoResultBlock.classList.remove('active');

		matchList.forEach(el => {
			const item = document.createElement('li');
			const cityElement = document.createElement('p');
			cityElement.innerText = el;
			cityElement.addEventListener('click', function () {
				headerLocation.querySelector('span').innerText = item.innerText;
				cityPopup.innerText = item.innerText;
				chooseLocationBlock.classList.remove('active');
			})
			item.append(cityElement);
			item.classList.add('choose-city__right-result__list-item');
			searchResultList.append(item);
		})
	})

	const cityPopup = chooseLocationBlock.querySelector('.choose-city__left-heading');
	const citiesItems = searchList.querySelectorAll('li>p');
	citiesItems.forEach(item => {
		item.addEventListener('click', function () {
			headerLocation.querySelector('span').innerText = item.innerText;
			cityPopup.innerText = item.innerText;
			chooseLocationBlock.classList.remove('active');
			setTimeout(() => {
				if (window.innerWidth > 768) {
					header.style.paddingRight = '0';
					document.body.style.paddingRight = '0';
				}
				document.body.classList.remove('dark');
				document.body.classList.remove('lock');
				document.documentElement.classList.remove('lock');
			}, 200);
		})
	})

	const popupShowContactsMobile = document.querySelector('.choose-city__left-showmore');
	popupShowContactsMobile.addEventListener('click', function () {
		popupShowContactsMobile.classList.toggle('active');
		if (popupShowContactsMobile.classList.contains('active')) {
			popupShowContactsMobile.querySelector('span').innerText = 'Скрыть'
		} else popupShowContactsMobile.querySelector('span').innerText = 'Показать контакты';

		let content = popupShowContactsMobile.previousElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null
		} else {
			content.style.maxHeight = content.scrollHeight / 5 + "rem";
		}

	})

	// coockie

	const cookiePopup = document.querySelector('.cookie');
	setTimeout(() => cookiePopup.classList.add('active'), 200);
	cookieClose = cookiePopup.querySelector('.cookie__btn');
	cookieClose.addEventListener('click', function () {
		cookiePopup.classList.remove('active');
	})

	document.addEventListener('click', (e) => {
		cookiePopup.classList.remove('active')
	})

	// меню в хедере (каталог)

	const catalog = document.querySelector('.catalog-menu');
	const menuBtn = document.querySelector('.header__bottom-catalog');
	menuBtn.addEventListener('click', function () {
		document.body.classList.toggle('lock');

		if (window.innerWidth > 768) {
			if (document.body.classList.contains('lock')) {
				let scrollWidth = (window.innerWidth - document.body.clientWidth);
				header.style.paddingRight = `${scrollWidth}px`
				document.body.style.paddingRight = `${scrollWidth}px`;
			} else {
				document.body.style.paddingRight = '0';
				header.style.paddingRight = '0';
			}
		}

		document.documentElement.classList.toggle('lock');
		menuBtn.classList.toggle('active');
		catalog.classList.toggle('active');
	})


	// каталог на мобилке

	function openMenu() {
		const mobMenuBtn = document.querySelector('.header__menu-mobile__item.menu')
		const mobCatalogBtn = document.querySelector('.header__menu-mobile__item.catalog')

		mobMenuBtn.addEventListener('click', () => {
			if (mobCatalogBtn.classList.contains('active')) {

				mobCatalogBtn.classList.remove('active')
				mobCatalogBtn.nextElementSibling.classList.remove('active')
				document.documentElement.classList.remove('lock')
				document.body.classList.remove('lock')

			}
			mobMenuBtn.classList.toggle('active')
			if (mobMenuBtn.classList.contains('active')) {
				mobMenuBtn.nextElementSibling.classList.add('active')
				document.documentElement.classList.add('lock')
				document.body.classList.add('lock')

			}
			else {
				mobMenuBtn.nextElementSibling.classList.remove('active')
				document.documentElement.classList.remove('lock')
				document.body.classList.remove('lock')

			}
		})

		mobCatalogBtn.addEventListener('click', () => {
			if (mobMenuBtn.classList.contains('active')) {
				mobMenuBtn.classList.remove('active')
				mobMenuBtn.nextElementSibling.classList.remove('active')
				document.documentElement.classList.remove('lock')
				document.body.classList.remove('lock')
			}
			mobCatalogBtn.classList.toggle('active')
			if (mobCatalogBtn.classList.contains('active')) {
				mobCatalogBtn.nextElementSibling.classList.add('active')
				document.documentElement.classList.add('lock')
				document.body.classList.add('lock')
			}
			else {
				mobCatalogBtn.nextElementSibling.classList.remove('active')
				document.documentElement.classList.remove('lock')
				document.body.classList.remove('lock')
			}
		})
	}
	openMenu()

	/* mobileMenuBtns.forEach(btn => {

		btn.addEventListener('click', () => {
			mobileMenuBtns.forEach(el => {
				el.classList.remove('active')
			})
			if (btn.classList.contains('catalog')) {
				btn.classList.toggle('active');
				if (btn.classList.contains('active')) {
					btn.nextElementSibling.classList.add('active');
					document.documentElement.classList.add('lock')
					document.body.classList.add('lock')
				}
				else {
					btn.nextElementSibling.classList.remove('active');
					document.documentElement.classList.remove('lock')
					document.body.classList.remove('lock')
				}
			}

			if (btn.classList.contains('menu')) {
				btn.classList.toggle('active');
				if (btn.classList.contains('active')) {
					btn.nextElementSibling.classList.add('active');
					document.documentElement.classList.add('lock')
					document.body.classList.add('lock')
				}
				else {
					btn.nextElementSibling.classList.remove('active');
					document.documentElement.classList.remove('lock')
					document.body.classList.remove('lock')
				}
			}
			else if (!mobileCatalogBtn.classList.contains('active')) {
				mobileCatalogBtn.classList.add('active')
				mobileCatalogBtn.nextElementSibling.classList.toggle('active');
				document.documentElement.classList.add('lock')
				document.body.classList.add('lock')
			}
			if (!mobileCatalogBtn.nextElementSibling.classList.contains('active')) {
				document.documentElement.classList.remove('lock')
				document.body.classList.remove('lock')
			}

		})
	}) */


	const fastSearhBlock = document.querySelector('.catalog-menu__content-right__search');
	const catalogMenuCard = document.querySelector('.catalog-menu__content-right__card');
	const catalogMenuDescription = document.querySelector('.catalog-menu__content-right__description');

	const catalogMenuBtns = document.querySelectorAll('.header__catalog-mobile__menu-btn');
	catalogMenuBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			btn.nextElementSibling.classList.add('active');
		})
	});

	const catalogSubMenuBackBtns = document.querySelectorAll('.header__catalog-mobile__submenu-back');
	catalogSubMenuBackBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			btn.parentElement.classList.remove('active');
		})
	})

	const catalogSubMenuBtns = document.querySelectorAll('.header__catalog-mobile__submenu-item');
	catalogSubMenuBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			btn.nextElementSibling.classList.add('active');
		})
	});

	const catalogSubSubMenuBackBtns = document.querySelectorAll('.header__catalog-mobile__subsubmenu-back');
	catalogSubSubMenuBackBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			btn.parentElement.classList.remove('active');
		})
	})

	const catalogSubMenus = document.querySelectorAll('.catalog-menu__submenu');
	catalogSubMenus.forEach(menu => {
		menu.addEventListener('mouseenter', function () {
			menu.parentElement.previousElementSibling.classList.add('active');
		})

		const subMenuBtns = menu.querySelectorAll('.catalog-menu__sublist-item>button');
		subMenuBtns.forEach(btn => {
			btn.addEventListener('mouseenter', function () {
				subMenuBtns.forEach(el => el.parentElement.classList.remove('active'));
				fastSearhBlock.classList.remove('active');
				catalogMenuCard.classList.add('active');
				catalogMenuDescription.classList.add('active');
			})
		})
	})

	const catalogSubSubmenus = document.querySelectorAll('.catalog-menu__sublist-submenu');

	catalogSubSubmenus.forEach(submenu => {

		submenu.addEventListener('mouseenter', function (e) {

			submenu.parentElement.previousElementSibling.classList.add('active');
			submenu.classList.add('show')

			fastSearhBlock.classList.add('active');
			catalogMenuCard.classList.remove('active');
			catalogMenuDescription.classList.remove('active');
		})

	})


	const catalogBtns = document.querySelectorAll('.catalog-menu__list-item');
	catalogBtns.forEach(btn => {

		btn.addEventListener('mouseenter', function () {
			catalogBtns.forEach(el => {
				el.classList.remove('active');
				fastSearhBlock.classList.remove('active');
				catalogMenuCard.classList.add('active');
				catalogMenuDescription.classList.add('active');

			})
		})
	})

	// переключалка кнопок

	if (document.querySelector('.categories')) {

		const categoriesBtns = document.querySelectorAll('.categories__btn:not(.categories__btn--js)');

		categoriesBtns.forEach(btn => {

			btn.addEventListener('click', function (e) {
				const currentBtns = btn.parentElement.querySelectorAll('.categories__btn');
				currentBtns.forEach(el => el.classList.remove('active', 'blue-btn'));
				btn.classList.add('active', 'blue-btn');

				const path = e.target.dataset.path;
				if (path) {
					e.target.parentElement.parentElement.nextElementSibling.querySelectorAll('[class*="__content"]').forEach(div => {
						div.classList.remove('active');
					})
					if (e.target.parentElement.parentElement.nextElementSibling.querySelector(`[data-target=${path}]`)) {

						e.target.parentElement.parentElement.nextElementSibling.querySelector(`[data-target=${path}]`).classList.add('active');
					}
				}

			})
		})

		const categoriesBtnMore = document.querySelector('.categories__btn:last-child')

		if (categoriesBtnMore) {

			let categoriesBtnMoreText = document.querySelector('.categories__btn--js > p')

			let categoriesList = categoriesBtnMore.querySelector('.categories__btn-sublist')

			let categoriesListItems = categoriesBtnMore.querySelectorAll('.categories__btn-sublist-items > li > a')

			categoriesBtnMore.addEventListener('click', (e) => {
				e.preventDefault()
				e.stopPropagation()
				categoriesBtnMore.classList.toggle('open')


				if (categoriesBtnMore.classList.contains('open')) {
					categoriesList.classList.add('active')
					categoriesBtnMore.querySelector('.arrow-ico').style.transform = `rotate(180deg)`

				}
				else {
					categoriesList.classList.remove('active')
					categoriesBtnMore.querySelector('.arrow-ico').style.transform = null;
				}

			})

			for (const item of categoriesListItems) {

				item.addEventListener('click', (e) => {

					e.preventDefault();
					categoriesListItems.forEach(el => el.classList.remove('active'))

					item.classList.add('active')

					categoriesBtnMoreText.innerText = item.innerText;

					categoriesBtnMore.classList.add('active')

					categoriesBtnMore.setAttribute('data-path', `${item.innerText.toLowerCase()}`)

					categoriesBtns.forEach(el => el.classList.remove('active'))

				})
			}

			document.addEventListener('click', (e) => {
				categoriesBtnMore.classList.remove('open')
				categoriesList.classList.remove('active')
				categoriesBtnMore.querySelector('.arrow-ico').style.transform = null

			})
		}

		const categoriesBtn = document.querySelector('.categories__btn').click();
		const categoriesBtn2 = document.querySelector('[data-path="services"]').click();
	}

	// ГЛАВНАЯ 

	// имя файла в кнопку

	if (document.querySelector('input[type="file"]')) {
		const inputFile = document.querySelector('input[type="file"]');
		inputFile.addEventListener('change', function (e) {
			const file = e.target.files[0];
			e.target.parentElement.querySelector('span>span').innerHTML = file.name;
		})
	}

	// развернуть (свернуть) текст отзыва

	if (document.querySelector('.main-reviews__list-item__right-text')) {
		const reviewsTexts = document.querySelectorAll('.main-reviews__list-item__right-text');
		const reviewsButtons = document.querySelectorAll('.main-reviews__list-item__right-btn');
		reviewsButtons.forEach(btn => {
			const reviewsButtonsText = btn.querySelector('.main-reviews__list-item__right-btn > span')

			const text = btn.parentElement.querySelector('p');

			btn.addEventListener('click', function (e) {
				const button = e.target;
				text.classList.toggle('active');

				if (text.classList.contains('active')) {
					reviewsButtonsText.textContent = 'Свернуть';
				} else {
					reviewsButtonsText.textContent = 'Показать полностью';
				}
			})
		})
	}

	// аккордеоны

	if (document.querySelector('.acc-item')) {
		const accItems = document.querySelectorAll('.acc-item');
		accItems.forEach(item => {
			let accContainer = item.parentElement;
			let accHead = item.querySelector('.acc-head');
			if (accHead.querySelector('.reset')) {
				let resetBtn = accHead.querySelector('.reset');
				accHead.addEventListener('click', function (e) {
					e.preventDefault();

					if (e.target === resetBtn || e.target.parentElement === resetBtn) {
						return
					} else {
						accItems.forEach(el => {
							if (el !== item && el.parentElement === item.parentElement) {
								el.classList.remove('active');
								let content = el.querySelector('.acc-content');
								if (content.style.maxHeight) {
									content.style.maxHeight = null
								}
							}
						})
						item.classList.toggle('active');
						let content = item.querySelector('.acc-content');
						if (content.style.maxHeight) {
							content.style.maxHeight = null
						} else {
							content.style.maxHeight = content.scrollHeight / 5 + "rem";
						}
					}
				})
			} else {
				accHead.addEventListener('click', function (e) {
					e.preventDefault();
					accItems.forEach(el => {
						if (el !== item && el.parentElement === item.parentElement) {
							el.classList.remove('active');
							let content = el.querySelector('.acc-content');
							if (content.style.maxHeight) {
								content.style.maxHeight = null
							}
						}
					})
					item.classList.toggle('active');
					let content = item.querySelector('.acc-content');
					if (content.style.maxHeight) {
						content.style.maxHeight = null
					} else {
						content.style.maxHeight = content.scrollHeight / 5 + "rem";
					}
				})
			}
		})
	}

	// ЛИСТИНГ

	// открытие списка в хлебных крошках

	if (document.querySelector('.breadcrumbs-list__item')) {
		const breadcrumbsItems = document.querySelectorAll('.breadcrumbs-list__item');
		breadcrumbsItems.forEach(item => {
			let breadcrumbsBtn = item.querySelector('.breadcrumbs-list__item-btn');
			let breadcrumbsDropdown = item.querySelector('.breadcrumbs__sublist');
			if (breadcrumbsBtn) {
				breadcrumbsBtn.addEventListener('click', function () {
					item.classList.toggle('active');
					clickOutside(item, item);

					if (window.innerWidth <= 768) {
						breadcrumbsDropdown.style.top = `${item.offsetTop + item.scrollHeight + 20}px`
						breadcrumbsDropdown.style.left = `${item.getBoundingClientRect().left}px`

						if (item.getBoundingClientRect().left + breadcrumbsDropdown.offsetWidth > window.innerWidth) {
							console.log(1);
							breadcrumbsDropdown.style.left = `${(window.innerWidth - breadcrumbsDropdown.offsetWidth) / 2}px`

						}

					}
				})
			}
		})

	}

	// открытие/закрытие категорий

	if (document.querySelector('.section-tags__list-item > button.show-more')) {
		const sectionTagsMoreBtn = document.querySelector('.section-tags__list-item > button.show-more');
		sectionTagsMoreBtn.addEventListener('click', function (e) {
			e.stopPropagation()
			sectionTagsMoreBtn.classList.toggle('open');

			if (sectionTagsMoreBtn.classList.contains('open')) {
				sectionTagsMoreBtn.nextElementSibling.classList.add('active');
			} else {
				sectionTagsMoreBtn.nextElementSibling.classList.remove('active');
			}

		})
		document.addEventListener('click', (e) => {
			sectionTagsMoreBtn.classList.remove('open')
			sectionTagsMoreBtn.nextElementSibling.classList.remove('active');
		})

	}

	// переключение категорий

	if (document.querySelector('.section-tags')) {

		const sectionTagsBtns = document.querySelectorAll('.section-tags__list-item:not(:last-child) > button');

		const sectionTagsSublistBtns = document.querySelectorAll('.section-tags__sublist-item > button');

		sectionTagsBtns.forEach(item => {
			item.addEventListener('click', function () {
				sectionTagsBtns.forEach(el => {
					el.classList.remove('active');
				})
				sectionTagsSublistBtns.forEach(el => {
					el.classList.remove('active');
				})
				document.querySelector('.section-tags__list-item:last-child > button').classList.remove('active');
				item.classList.add('active');
				const listHeader = document.querySelector('.standarts-list__title')
				if (listHeader) {
					listHeader.innerText = item.innerText
					const moreCategories = document.querySelector('.standarts-list__title-wrapper > a')

					if (moreCategories && listHeader.innerText !== 'Все категории') {
						moreCategories.classList.add('active')
					}
					else {
						moreCategories.classList.remove('active')

					}
				}
			})
		})

		sectionTagsSublistBtns.forEach(item => {
			item.addEventListener('click', function () {
				sectionTagsBtns.forEach(el => {
					el.classList.remove('active');
				})
				sectionTagsSublistBtns.forEach(el => {
					el.classList.remove('active');
				})
				item.classList.add('active');
				const listHeader = document.querySelector('.standarts-list__title')
				if (listHeader) {
					listHeader.innerText = item.innerText
					console.log(1);
				}
				document.querySelector('.section-tags__list-item:last-child > button span').innerText = item.innerText;
				document.querySelector('.section-tags__list-item:last-child > button').classList.add('active');
				document.querySelector('.section-tags__list-item:last-child > button').classList.remove('open');
				document.querySelector('.section-tags__sublist').classList.remove('active');

			})
		})
	}

	// открытие фмльтров в верху списка (размеры, марка, стандарт)

	if (document.querySelector('.products-listing__filters-open > button')) {
		const catalogFilterBtns = document.querySelectorAll('.products-listing__filters-open > button');
		catalogFilterBtns.forEach(btn => {
			btn.addEventListener('click', function () {

				catalogFilterBtns.forEach(item => {
					if (item !== btn) {
						item.parentElement.classList.remove('active');
						item.nextElementSibling.classList.remove('active');
					}
				})
				btn.parentElement.classList.toggle('active');
				btn.nextElementSibling.classList.toggle('active');
				clickOutside(btn.parentElement, btn.parentElement);
				clickOutside(btn.parentElement, btn.nextElementSibling);

				let applyBtn = btn.nextElementSibling.querySelector('.products-listing__filters-btns__apply')

				applyBtn.addEventListener('click', () => {
					btn.parentElement.classList.remove('active');
					btn.nextElementSibling.classList.remove('active');
				})
				let reset = btn.nextElementSibling.querySelector('.products-listing__filters-btns__reset')

				reset.addEventListener('click', () => {
					const checkboxes = btn.nextElementSibling.querySelectorAll('.filter-label__input')
					checkboxes.forEach(checkbox => {
						if (checkbox.checked) {
							checkbox.checked = false
							btn.parentElement.classList.remove('checked');
							// btn.nextElementSibling.classList.remove('active');
						}
						return
					})
				})
			})
		})
	}


	// аккордеон фильтра размеров

	if (document.querySelector('.products-listing__filters-open .parameter-btn')) {
		const parameterBtns = document.querySelectorAll('.products-listing__filters-open .parameter-btn');
		parameterBtns.forEach(btn => {
			btn.addEventListener('click', function (e) {
				if (e.target !== btn.querySelector('.parameter-btn__clear') && e.target.parentElement !== btn.querySelector('.parameter-btn__clear')) {
					btn.classList.toggle('active');
					let content = btn.nextElementSibling;
					if (content.style.maxHeight) {
						content.style.maxHeight = null
					} else {
						content.style.maxHeight = content.scrollHeight / 10 + "rem";
					}
				}

			})
		})
	}

	/* if (document.querySelector('.products__list-item__units')) {
		const unitsOpenBtns = document.querySelectorAll('.products__list-item__units > div > button');
		unitsOpenBtns.forEach(btn => {
			btn.addEventListener('click', function () {
				unitsOpenBtns.forEach(el => {
					if (el !== btn) {
						el.classList.remove('active');
						el.nextElementSibling.classList.remove('active');
					}
				})
				btn.classList.toggle('active');
				btn.nextElementSibling.classList.toggle('active');
				clickOutside(btn, btn);
				clickOutside(btn, btn.nextElementSibling)
			})
		})
	
		const unitsSublistBtns = document.querySelectorAll('.products__list-item__units-sublist > li > button');
		unitsSublistBtns.forEach(btn => {
			btn.addEventListener('click', function () {
				const parentBtn = btn.parentElement.parentElement.previousElementSibling;
				unitsSublistBtns.forEach(el => el.classList.remove('active'));
				btn.classList.add('active');
				btn.parentElement.parentElement.classList.remove('active');
				parentBtn.classList.remove('active');
	
				if (btn.innerText === 'киллограмм') {
					parentBtn.querySelector('span').innerText = 'кг';
				} else if (btn.innerText === 'тонна') {
					parentBtn.querySelector('span').innerText = 'т';
				} else if (btn.innerText === 'штука') {
					parentBtn.querySelector('span').innerText = 'шт';
				}
			})
		})
	
		const unitsSublistBtn = document.querySelector('.products__list-item__units-sublist > li > button').click();
	} */


	const unitsSet = document.querySelectorAll('.products__list-item__units')

	if (unitsSet) {
		for (const unit of unitsSet) {
			const unitBtn = unit.querySelector('div:first-child > button')
			const unitSublist = unit.querySelector('.products__list-item__units-sublist')
			const unitBtnText = unitBtn.querySelector('span')
			unitBtn.addEventListener('click', (e) => {
				e.preventDefault()
				e.stopPropagation()
				unitBtn.classList.toggle('active')
				if (unitBtn.classList.contains('active')) {
					unitSublist.classList.add('active')
				} else {
					unitSublist.classList.remove('active')
				}
			})

			const sublistItems = unitSublist.querySelectorAll('button')

			for (const item of sublistItems) {
				const itemDataset = item.querySelector('span').dataset.unit

				item.addEventListener('click', () => {
					sublistItems.forEach(el => el.classList.remove('active'))

					item.classList.add('active')

					unitBtnText.innerHTML = itemDataset

				})
			}
			document.addEventListener('click', (e) => {
				unitBtn.classList.remove('active')
				unitSublist.classList.remove('active')
			})
		}

	}

	// при чекбоксах в фильтрах

	if (document.querySelector('.products-listing__filters-open .filter-label')) {
		let catalogFilterItems = document.querySelectorAll('.products-listing__filters-open');
		catalogFilterItems.forEach(item => {
			let counter = 0;
			let checkboxes = item.querySelectorAll('.filter-label__input[type=checkbox]');
			checkboxes.forEach(cb => {
				cb.addEventListener('change', function () {
					if (cb.checked) {
						counter++;
					} else counter--;
					if (counter) item.classList.add('checked');
					else item.classList.remove('checked');
				})
			})

		})
	}

	// каунтер при выборе размеров

	if (document.querySelector('.products-listing__filters-size')) {
		const sizeFilterForms = document.querySelectorAll('.products-listing__filters-size__form');
		sizeFilterForms.forEach(form => {
			let counter = 0;
			let formCheckboxes = form.querySelectorAll('input[type="checkbox"]');
			formCheckboxes.forEach(cbox => {
				cbox.addEventListener('change', function () {
					if (cbox.checked) counter++;
					else counter--;
					if (counter > 0) {
						form.parentElement.previousElementSibling.querySelector('.counter').classList.add('active');
						form.parentElement.previousElementSibling.querySelector('.counter').innerText = counter;
						form.parentElement.previousElementSibling.querySelector('.parameter-btn__clear').classList.add('active');
					} else {
						form.parentElement.previousElementSibling.querySelector('.counter').classList.remove('active');
						form.parentElement.previousElementSibling.querySelector('.counter').innerText = counter;
						form.parentElement.previousElementSibling.querySelector('.parameter-btn__clear').classList.remove('active');
					}

				})
			})
		})
	}


	if (document.querySelector('.listing-info__left-showmore')) {

		const listingInfoBtn = document.querySelector('.listing-info__left-showmore');

		listingInfoBtn.addEventListener('click', function () {

			listingInfoBtn.classList.toggle('active');

			let content = listingInfoBtn.previousElementSibling;

			if (listingInfoBtn.classList.contains('active')) {
				listingInfoBtn.querySelector('span').innerText = 'Скрыть'
				content.style.maxHeight = `${content.scrollHeight}px`

			}
			else {
				listingInfoBtn.querySelector('span').innerText = 'Показать полностью'

				content.style.maxHeight = null

			}


		})
	}




	// открытие/закрытие модалки заявки

	if (document.querySelector('.banner1__left-btn') && document.querySelector('.callback-popup')) {
		const callbackPopup = document.querySelector('.callback-popup');
		const callbackPopupOpen = document.querySelector('.banner1__left-btn');
		const callbackPopupClose = callbackPopup.querySelector('.popup__close');

		callbackPopupOpen.addEventListener('click', function (e) {
			e.preventDefault()
			openPopupElement(callbackPopup);
		})

		callbackPopupClose.addEventListener('click', function () {
			closePopupElement(callbackPopup)
		})
	}


	const banner5Popup = document.querySelector('.banner5__left-btn')

	if (banner5Popup) {
		const callbackPopup = document.querySelector('.callback-popup');

		banner5Popup.addEventListener('click', function (e) {
			e.preventDefault()
			openPopupElement(callbackPopup);
		})
	}

	// открытие/закрытие модалки обратного звонка


	if (document.querySelector('.choose-city__left-call') && document.querySelector('.callback-popup2')) {

		const callbackBtn = document.querySelectorAll('.header-contacts__btn')
		const callback2Popup = document.querySelector('.callback-popup2');
		const submitCallback = callback2Popup.querySelector('.popup__form-btn')
		const callback2PopupOpen = document.querySelector('.choose-city__left-call');
		const callback2PopupClose = callback2Popup.querySelector('.popup__close');

		callback2PopupOpen.addEventListener('click', function () {
			callback2Popup.classList.add('active');
		})

		callback2PopupClose.addEventListener('click', function () {
			callback2Popup.classList.remove('active');
			closePopupElement(callback2Popup)
		})


		callbackBtn.forEach(btn => {
			btn.addEventListener('click', (e) => {
				openPopupElement(callback2Popup);
			})
		})


		submitCallback.addEventListener('click', (e) => {
			e.preventDefault()
			closePopupElement(callback2Popup)
			openPopupElement(document.querySelector('.empty-popup'))
		})
		if (document.querySelector('.empty-popup__btn')) {
			document.querySelector('.empty-popup__btn').addEventListener('click', (e) => {
				e.preventDefault()
				closePopupElement(document.querySelector('.empty-popup'))
				if (document.querySelector('.resume-popup')) {
					closePopupElement(document.querySelector('.resume-popup'))
				}
			})

			document.addEventListener('click', (e) => {
				if (e.target == document.querySelector('.empty-popup')) {
					closePopupElement(document.querySelector('.empty-popup'))
				}
			})

			document.querySelector('.empty-popup  .popup__close').addEventListener('click', (e) => {
				e.preventDefault()
				closePopupElement(document.querySelector('.empty-popup'))
			})


		}



		const orderBtn = document.querySelector('.request__right-form__btn')
		if (orderBtn) {
			orderBtn.addEventListener('click', succesSubmit)
			function succesSubmit(e) {
				e.preventDefault()
				openPopupElement(document.querySelector('.empty-popup'))
			}
		}



		document.addEventListener('click', (e) => {
			if (e.target == callback2Popup) {
				closePopupElement(callback2Popup)
			}
		})
	}



	if (document.querySelector('.products-listing__top-sorting')) {
		const sortingBtn = document.querySelector('.products-listing__top-sorting');
		const sortingBlock = document.querySelector('.section-menu');
		if (sortingBlock) {
			sortingBtn.addEventListener('click', function (e) {
				e.preventDefault()
				e.stopPropagation()
				document.body.classList.add('lock', 'dark');
				document.documentElement.classList.add('lock');
				sortingBlock.classList.add('active');
			})

			const sortingBlockClose = sortingBlock.querySelector('.section-menu__close');
			sortingBlockClose.addEventListener('click', function () {
				document.body.classList.remove('lock', 'dark');
				document.documentElement.classList.remove('lock');
				sortingBlock.classList.remove('active');
			})

			document.addEventListener('click', (e) => {
				if (e.target !== sortingBlock && !e.target.closest('.section-menu') && sortingBlock.classList.contains('active')) {
					document.body.classList.remove('lock', 'dark');
					document.documentElement.classList.remove('lock');
					sortingBlock.classList.remove('active');
				}

			})
		}

	}



	if (document.querySelector('.products-listing__top-filters')) {
		const filterOpenBtn = document.querySelector('.products-listing__top-filters');
		const filterBlock = document.querySelector('.section-mobile__filters');
		filterOpenBtn.addEventListener('click', function () {
			document.body.classList.add('lock', 'dark');
			document.documentElement.classList.add('lock');
			filterBlock.classList.add('active');
		})
		const filterBlockClose = filterBlock.querySelector('.section-mobile__filters-close');
		filterBlockClose.addEventListener('click', function () {
			document.body.classList.remove('lock', 'dark');
			document.documentElement.classList.remove('lock');
			filterBlock.classList.remove('active');
		})

		const applyBtn = document.querySelector('.filters-apply-btn')

		if (applyBtn) {
			applyBtn.addEventListener('click', () => {
				filterBlockClose.click()
			})
		}

		const filterMoreBtns = filterBlock.querySelectorAll('.section-mobile__filters-item div:first-child > button:last-of-type');
		filterMoreBtns.forEach(btn => {
			btn.addEventListener('click', function () {
				btn.nextElementSibling.classList.add('active');
			})

		})
		const closeFilterMoreBtns = document.querySelectorAll('.section-mobile__filters-block > button');
		closeFilterMoreBtns.forEach(btn => {
			btn.addEventListener('click', function () {
				btn.parentElement.classList.remove('active')
			})

		})

		let itemsList = filterBlock.querySelectorAll('.section-mobile__filters-item')

		itemsList.forEach(list => {

			let resetBtn = list.querySelector('.section-mobile__filters-item__reset')

			const allResetBtn = document.querySelector('.filters-reset-btn')

			let listItems = list.querySelectorAll('.section-mobile__filters-item li:not(.section-mobile__filters-categories__list-item)')

			let count = 0;

			let countBlock = list.querySelector('.counter')

			if (countBlock) {

				countBlock.style.display = 'none'
			}

			if (resetBtn) {

				resetBtn.style.display = 'none'

			}

			listItems.forEach(el => {

				el.addEventListener('click', () => {

					el.classList.toggle('active')


					if (el.classList.contains('active')) {

						count++

						countBlock.innerText = count

					} else {

						count--

						countBlock.innerText = count
					}


					if (resetBtn) {

						resetBtn.addEventListener('click', () => {

							el.classList.remove('active')

							count = 0;

							countBlock.innerText = count;

							countBlock.style.display = 'none'

							resetBtn.style.display = 'none';

						})
					}

					if (allResetBtn) {
						allResetBtn.addEventListener('click', () => {
							el.classList.remove('active')
							count = 0;
							countBlock.innerText = count;
							countBlock.style.display = 'none'
							resetBtn.style.display = 'none';
						})
					}

					if (count > 0) {
						countBlock.style.display = 'flex';
						resetBtn.style.display = 'flex';

					} else {
						countBlock.style.display = 'none'
						resetBtn.style.display = 'none';

					}



				})


			})
		})

		/* const filterCategory = document.querySelectorAll('.section-mobile__filters-categories__list-item')
		if (filterCategory) {
			filterCategory.forEach(category => {
				category.addEventListener('click', (e) => {
					e.currentTarget.classList.add('active')
				})
			})
		} */

	}

	// ЛИСТИНГ

	if (document.querySelector('.section-filters__select')) {
		const filtersSelects = document.querySelectorAll('.section-filters__select');
		filtersSelects.forEach(select => {
			let selectName = select.querySelector('.section-filters__select-name');
			let selectDrowdown = select.querySelector('.section-filters__select-dropdown');
			selectName.addEventListener('click', function () {
				select.classList.toggle('active')
				selectDrowdown.classList.toggle('active');
				clickOutside(select, select)
				clickOutside(select, selectDrowdown)
			})
			let counterEl = select.querySelector('.counter');
			let counter = 0;
			let selectChoices = select.querySelectorAll('input[type=checkbox]')
			selectChoices.forEach(el => {
				el.addEventListener('change', function (e) {
					if (el.checked) {
						counter++;
					} else counter--;
					if (counter) {
						counterEl.innerText = counter;
						counterEl.classList.add('active');
					} else {
						counterEl.classList.remove('active');
					}
				})
			})
		})
	}

	if (document.querySelector('.section-filters__tags-item__btn.show-more')) {
		let showMoreTagsBtn = document.querySelector('.section-filters__tags-item__btn.show-more');
		let hideMoreTagsBtn = document.querySelector('.section-filters__tags-item__btn.hide-more');
		let sublistingTagList = document.querySelector('.section-filters__tags');
		showMoreTagsBtn.addEventListener('click', function () {
			showMoreTagsBtn.parentElement.classList.add('disabled')
			hideMoreTagsBtn.parentElement.classList.remove('disabled');
			sublistingTagList.style.maxHeight = sublistingTagList.scrollHeight / 10 + "rem";
		})

		hideMoreTagsBtn.addEventListener('click', function () {
			showMoreTagsBtn.parentElement.classList.remove('disabled')
			hideMoreTagsBtn.parentElement.classList.add('disabled');
			sublistingTagList.style.maxHeight = null
		})
	}

	// МОДАЛКИ В САБЛИСТИНГЕ

	// вопрос по товару
	if (document.querySelector('.product-ask') && document.querySelector('.ask-btn')) {

		let askBtn = document.querySelector('.ask-btn');

		let productAsk = document.querySelector('.product-ask');

		askBtn.addEventListener('click', function () {
			openPopupElement(productAsk);
		})

		let productAskClose = productAsk.querySelector('.popup__close');

		productAskClose.addEventListener('click', function () {
			closePopupElement(productAsk);
		})

		const askSubmit = productAsk.querySelector('.popup__form-btn')

		askSubmit.addEventListener('click', (e) => {
			e.preventDefault()
			closePopupElement(productAsk)
			openPopupElement(document.querySelector('.empty-popup'))
		})
		document.addEventListener('click', (e) => {
			if (e.target == productAsk) {
				closePopupElement(productAsk)
			}
		})
	}

	// фильтры

	if (document.querySelector('.filters-popup') && document.querySelector('.filters-open')) {
		let filtersOpen = document.querySelector('.filters-open');
		let filtersPopup = document.querySelector('.filters-popup');
		filtersOpen.addEventListener('click', function (e) {
			e.preventDefault();
			openPopupElement(filtersPopup);
		})
		let filtersPopupClose = filtersPopup.querySelector('.popup__close');
		filtersPopupClose.addEventListener('click', function () {
			closePopupElement(filtersPopup);
		})

		// чекбоксы, counter и reset
		let filtersPopupForms = filtersPopup.querySelectorAll('.filters-popup__form');
		filtersPopupForms.forEach(form => {
			let counter = 0;
			let filtersPopupCheckboxes = form.querySelectorAll('input[type=checkbox]');
			filtersPopupCheckboxes.forEach(cb => {
				cb.addEventListener('change', function () {
					if (cb.checked) counter++;
					else counter--;

					if (counter > 0) {
						form.parentElement.parentElement.querySelector('.counter').innerText = counter;
						form.parentElement.parentElement.classList.add('checked');
					} else {
						form.parentElement.parentElement.querySelector('.counter').innerText = counter;
						form.parentElement.parentElement.classList.remove('checked');
					}

				})
			})
		})
	}

	// КАТАЛОГ

	// раскрытие карточек в мобилке

	if (document.querySelector('.catalog-main__list-item') && document.querySelector('.catalog-main__list-item__btn')) {
		let catalogMainItems = document.querySelectorAll('.catalog-main__list-item');
		catalogMainItems.forEach(item => {
			let openBtn = item.querySelector('.catalog-main__list-item__btn');
			let sublist = item.querySelector('.catalog-main__list-item__sublist');
			openBtn.addEventListener('click', function () {
				catalogMainItems.forEach(el => {
					if (item !== el) {
						el.querySelector('.catalog-main__list-item__btn').classList.remove('active');
						let content = el.querySelector('.catalog-main__list-item__sublist');
						content.classList.remove('active');
						content.style.maxHeight = null
					}
				})

				openBtn.classList.toggle('active');
				sublist.classList.toggle('active');
				if (sublist.style.maxHeight) {
					sublist.style.maxHeight = null
				} else {
					// sublist.style.maxHeight = sublist.scrollHeight / 5 + "rem";
					sublist.style.maxHeight = `${sublist.scrollHeight}px`;
				}
			})
		})
	}

	// раскрытие карточек в desktop


	function openCatalogCards() {
		const catalogCards = document.querySelectorAll('.catalog-main__list-item')

		if (catalogCards) {
			for (const card of catalogCards) {

				let cardBody = card.querySelector('.catalog-main__list-item__sublist')
				let cardBodyItems = cardBody.querySelectorAll('.catalog-main__list-item__sublist-item')

				cardBody.addEventListener('mouseover', () => {

					if (cardBodyItems.length > 4) {
						cardBody.style.maxHeight = `${cardBody.scrollHeight}px`;
						card.style.overflowY = 'scroll';
					}

				})

				cardBody.addEventListener('mouseleave', () => {
					cardBody.style.maxHeight = null
					card.querySelector('.catalog-main__list-item__img-container').style.display = 'block'
					card.style.overflowY = null;

				})



			}
		}
	}
	openCatalogCards()




	// раскрытие карточек в desktop


	const place = document.querySelector('.listing-info__left-heading');
	if (place) {
		if (place && document.documentElement.clientWidth <= 768) {
			const target = document.querySelector('.target-js')
			place.append(target)
		}

		const place2 = document.querySelector('.product-hero__action-item')
		if (place2 && document.documentElement.clientWidth <= 768) {
			const target = document.querySelector('.product-hero__cart-btn')
			place2.append(target)
		}
	}



	const infoBlock = document.querySelector('.contacts-hero__info')

	if (infoBlock) {
		const moovedEl = document.querySelector('.contacts-hero__map')
		if (moovedEl && document.documentElement.clientWidth <= 992) {
			const target = document.querySelector('.contacts-hero__mob')
			target.append(infoBlock, moovedEl)
		}
	}


	const reqTypes = document.querySelectorAll('[data-dropdown]')

	if (reqTypes) {

		let svgIco = `<svg>
		<use xlink:href='./src/images/svgicons/icons.svg#check-ico'></use>
		</svg>`;


		/* reqTypes.forEach((el) => {
	
			const dropdownItem = document.querySelectorAll('.dropdown-body li')
			dropdownItem.forEach(item => {
				if (item.classList.contains('selected')) {
					el.value = item.textContent;
				}
				item.addEventListener('click', () => {
					dropdownItem.forEach(el => {
						el.classList.remove('active')
						let svg = el.querySelector('svg')
						if (svg) {
							svg.remove()
						}
					})
					item.insertAdjacentHTML('beforeend', svgIco)
					item.classList.add('active')
					el.value = item.innerText;
				})
			})
	
			let dropdownBody;
	
			el.addEventListener('focus', () => {
				dropdownBody = document.querySelector('.dropdown-body')
				dropdownBody.classList.add('active')
	
				el.parentElement.classList.add('active')
			})
			el.addEventListener('blur', () => {
				dropdownBody.classList.remove('active')
				el.parentElement.classList.remove('active')
			})
	
		}) */

	}


	const contactsPopup = document.querySelector('.contacts-popup');

	if (contactsPopup) {

		let popupCloseBtn = contactsPopup.querySelector('.popup__close');

		const contactsBtn = document.querySelector('.contact__item-text button');

		contactsBtn.addEventListener('click', () => {

			openPopupElement(contactsPopup)
		})

		popupCloseBtn.addEventListener('click', () => {
			closePopupElement(contactsPopup);
		})

		document.addEventListener('click', (e) => {
			if (e.target == contactsPopup) {
				closePopupElement(contactsPopup);
			}
		})
	}

	let productPopup = document.querySelector('.product-popup')

	if (productPopup) {

		const popupCloseBtn = productPopup.querySelector('.popup__close')
		const productPopupBtn = document.querySelectorAll('.product-hero__action-text')
		for (const item of productPopupBtn) {
			item.addEventListener('click', () => {
				openPopupElement(productPopup)
			})
		}

		popupCloseBtn.addEventListener('click', () => {
			closePopupElement(productPopup);
		})

		document.addEventListener('click', (e) => {
			if (e.target == productPopup) {
				closePopupElement(productPopup);
			}
		})
		const submit = productPopup.querySelector('.product-popup__submit')
		submit.addEventListener('click', () => {
			closePopupElement(productPopup)
		})

		let popupItems = productPopup.querySelectorAll('.product-popup__item')
		if (popupItems) {

			let count = 0;

			let svgPlus = `<svg><use xlink:href="./src/images/svgicons/icons.svg#plus-big-ico"></use></svg>`;

			let svgCheck = `<svg><use xlink:href="./src/images/svgicons/icons.svg#check-ico"></use></svg>`

			for (const item of popupItems) {

				let itemChooseBtn = item.querySelector('.product-popup__btn')

				let itemChooseBtnIco = item.querySelector('.product-popup__btn-ico')

				let itemChooseBtnText = itemChooseBtn.querySelector('p')

				const counters = document.querySelectorAll('.counter-js')

				itemChooseBtn.addEventListener('click', () => {

					itemChooseBtn.classList.toggle('selected')

					if (itemChooseBtn.classList.contains('selected')) {

						itemChooseBtnText.textContent = 'Добавлено';

						itemChooseBtnIco.innerHTML = '';

						itemChooseBtnIco.insertAdjacentHTML("beforeend", svgCheck)

						count++
					}
					else {
						itemChooseBtnText.textContent = 'Добавить';

						itemChooseBtnIco.innerHTML = '';

						itemChooseBtnIco.insertAdjacentHTML("beforeend", svgPlus)

						count--
					}

					for (const counter of counters) {
						counter.innerText = count
					}
				})


				let resetBtn = document.querySelector('.product-popup__submit.reset')

				resetBtn.addEventListener('click', () => {

					count = 0

					for (const counter of counters) {
						counter.innerText = count;
					}

					if (count == 0) {

						itemChooseBtn.classList.remove('selected')

						itemChooseBtnText.textContent = 'Добавить';

						itemChooseBtnIco.innerHTML = '';

						itemChooseBtnIco.insertAdjacentHTML("beforeend", svgPlus)
					}
				})
			}

		}
	}

	function showPrice() {

		let showPriceBtn = document.querySelector('.showPriceBtn');

		if (showPriceBtn) {

			showPriceBtn.addEventListener('click', (e) => {
				openPopupElement(document.querySelector('.callback-popup'))
			})
		}
	}
	showPrice()

	function addToCard() {
		let cartBtn = document.querySelector('.product-hero__cart-btn')

		if (cartBtn) {

			let productInput = document.querySelector("body > section.product-hero.section-hero > div.container > div > div.product-hero__content > div.product-hero__action > div:nth-child(1) > div.product-hero__cart > div > div > input[type=number]")

			let btnInner = `В корзине
		<svg id="check-ico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
		<path fill-rule="evenodd" clip-rule="evenodd"
			d="M17.2559 4.41083C17.5814 4.73626 17.5814 5.2639 17.2559 5.58934L8.08926 14.756C7.76382 15.0814 7.23618 15.0814 6.91074 14.756L2.74408 10.5893C2.41864 10.2639 2.41864 9.73626 2.74408 9.41083C3.06951 9.08539 3.59715 9.08539 3.92259 9.41083L7.5 12.9882L16.0774 4.41083C16.4028 4.08539 16.9305 4.08539 17.2559 4.41083Z"
			fill="#fff" />
		</svg>`;

			cartBtn.addEventListener('click', () => {
				// if (!productInput.value) {
				// 	document.querySelector(".products__list-item__units.desktop").style.boxShadow = '0px 0px 3px 3px red'
				// } else {
				// 	cartBtn.innerHTML = btnInner;
				// 	document.querySelector(".products__list-item__units.desktop").style.boxShadow = null;

				// }
				cartBtn.innerHTML = btnInner;
			})
		}
	}

	addToCard()

	function cartSubmit() {

		let submitPopup = document.querySelector('.cart-submit__popup');

		if (submitPopup) {

			let submit = document.querySelector('.cart-form__submit');

			let closePopup = submitPopup.querySelector('.popup__close');

			if (submit) {
				submit.addEventListener('click', (e) => {
					e.preventDefault()
					openPopupElement(submitPopup)

				})
			}


			closePopup.addEventListener('click', closePopupElement(submitPopup))

			submitPopup.addEventListener('click', () => {
				closePopupElement(submitPopup)
			})

		}
	}

	cartSubmit()


	function asideMenu() {

		const asideSpace = document.querySelector('.aside-space')
		if (asideSpace) {
			const container = asideSpace.querySelector('.container')

			const asideMenu = document.querySelector('.aside-absolute')

			asideMenu.style.left = `${window.getComputedStyle(container).marginLeft
				} `
			window.addEventListener('resize', () => {
				asideMenu.style.left = `${window.getComputedStyle(container).marginLeft}`
			})

		}

	}
	asideMenu()



	// Открыть попап резвезитов

	const requisitesPopup = document.querySelector('.requisites-popup');

	if (requisitesPopup) {

		const closePopup = requisitesPopup.querySelector('.popup__close')
		const requisitesBtn = document.querySelector('.requisites-popup__open')
		const download = requisitesPopup.querySelector('.requisites__card-btn')

		requisitesBtn.addEventListener('click', () => openPopupElement(requisitesPopup))

		closePopup.addEventListener('click', () => closePopupElement(requisitesPopup))

		download.addEventListener('click', () => console.log(1))

		document.addEventListener('click', (e) => {
			if (e.target == requisitesPopup)
				closePopupElement(requisitesPopup)
		})

	}

	// Открыть попап реквизитов


	function tabs() {

		const tabsBlocks = document.querySelectorAll('[data-tabs]')

		if (tabsBlocks) {

			for (const block of tabsBlocks) {

				let tabButtons = block.querySelectorAll('[data-parent]')

				if (tabButtons) {
					for (const button of tabButtons) {

						button.addEventListener('click', (e) => {

							let targetId = e.target.dataset.parent;

							let targetBlock = block.querySelector(`[data-child="${targetId}"]`);

							let tabsBody = block.querySelectorAll('[data-child]')

							tabsBody.forEach(item => item.classList.remove('active'))

							tabButtons.forEach(item => {
								item.classList.remove('active')
							})

							e.target.classList.add('active')

							targetBlock.classList.add('active')

						});

						let tabButton = block.querySelector('[data-parent]').click()
					};

				}
			}


		}

	}

	tabs()



	const vacancyPopup = document.querySelector('.vacancy-popup')

	if (vacancyPopup) {

		const resumePopup = document.querySelector('.resume-popup')

		const vacancyBtn = document.querySelectorAll('.vacancy-card__apply')

		for (const btn of vacancyBtn) {
			btn.addEventListener('click', () => openPopupElement(vacancyPopup))

		}
		const closePopup = document.querySelectorAll('.popup__close')

		closePopup.forEach((el) => {
			el.addEventListener('click', () => closePopupElement(vacancyPopup))

			el.addEventListener('click', () => closePopupElement(resumePopup))

		})


		document.addEventListener('click', (e) => {
			if (e.target == vacancyPopup)
				closePopupElement(vacancyPopup)
		})

		const vacancySubmit = vacancyPopup.querySelector('.vacancy-form__submit')

		vacancySubmit.addEventListener('click', (e) => {

			e.preventDefault()

			closePopupElement(vacancyPopup)

			openPopupElement(resumePopup)

		})
	}

	// фильр даты новостей

	let btns = document.querySelectorAll('.news-materials__action-btn');

	if (btns) {

		let yearBtn = document.querySelector('.news-materials__action-btn.year');

		if (yearBtn) {

			yearBtn.addEventListener('click', (e) => {

				e.preventDefault()

				e.stopPropagation()

				if (monthBtn.classList.contains('active')) {

					btns.forEach(el => el.classList.remove('active'))
				}

				yearBtn.classList.toggle('active')

				const sublist = yearBtn.querySelector('.news-materials__action-sublist');

				const sublistItem = sublist.querySelectorAll('a')

				const yearBtnText = yearBtn.querySelector('.btn-text')

				sublistItem.forEach(item => {

					item.addEventListener('click', (e) => {

						sublistItem.forEach(el => el.classList.remove('check'))

						e.preventDefault()

						item.classList.add('check')

						yearBtnText.textContent = (item.textContent == "Все года" ? item.textContent : item.textContent + ' ' + 'год')

					})
				})

				document.addEventListener('click', (e) => {
					if (e.target !== yearBtn) {
						yearBtn.classList.remove('active')
					}
				})

				document.addEventListener('keydown', (e) => {
					if (e.key === "Escape") {
						yearBtn.classList.remove('active')
					}
				})

			})
		}

		let monthBtn = document.querySelector('.news-materials__action-btn.month')

		if (monthBtn) {

			monthBtn.addEventListener('click', (e) => {

				e.preventDefault()

				e.stopPropagation()


				if (yearBtn.classList.contains('active')) {

					btns.forEach(el => el.classList.remove('active'))
				}
				monthBtn.classList.toggle('active')

				const sublist = monthBtn.querySelector('.news-materials__action-sublist');

				const sublistItem = sublist.querySelectorAll('a')

				const monthBtnText = monthBtn.querySelector('.btn-text')

				sublistItem.forEach(item => {

					item.addEventListener('click', (e) => {

						sublistItem.forEach(el => el.classList.remove('check'))

						e.preventDefault()

						item.classList.add('check')

						monthBtnText.textContent = (item.textContent == "Все месяца" ? item.textContent : 'за' + ' ' + item.textContent)

					})
				})

				document.addEventListener('click', (e) => {
					if (e.target !== monthBtn) {
						monthBtn.classList.remove('active')
					}
				})

				document.addEventListener('keydown', (e) => {
					if (e.key === "Escape") {
						monthBtn.classList.remove('active')
					}
				})

			})
		}

	}



	// фильр даты новостей

	function addToCartListing() {

		const toCartBtn = document.querySelectorAll('.products__list-item__price > button')

		if (toCartBtn) {
			toCartBtn.forEach(btn => {
				btn.addEventListener('click', (e) => {
					e.preventDefault()
					const popupAddToCart = document.querySelector('.cart-popup')
					if (popupAddToCart) {
						openPopupElement(popupAddToCart)
					}

					const closePopup = popupAddToCart.querySelector('.popup__close')
					closePopup.addEventListener('click', () => {
						closePopupElement(popupAddToCart)
					})

					document.addEventListener('click', e => {
						if (e.target == popupAddToCart) {
							closePopupElement(popupAddToCart)
						}
						if (e.target == document.querySelector('.cart-popup__item-btn')) {
							closePopupElement(popupAddToCart)
						}
					})
				})
			})
		}

	}
	addToCartListing()

	function showTips() {

		const tipsElements = document.querySelectorAll('.tool-tip')

		if (tipsElements) {

			for (const el of tipsElements) {

				let title = el.querySelector('.title')

				let titles = document.querySelectorAll('.title')

				el.addEventListener('click', (e) => {

					titles.forEach(el => el.classList.remove('active'))

					title.classList.add('active')

					title.style.top = `- ${title.scrollHeight + 10} px`

					setTimeout(() => {

						title.classList.remove('active')

					}, 5000);

					function findParent(element, needParent) {

						let parent = element.parentElement;

						while (!parent.classList.contains(needParent)) {

							parent = parent.parentElement;

						}
						return parent
					}
					let mainOffset = document.querySelector('.main-offset').getBoundingClientRect().left;

					let titleParent = findParent(title, 'product-popup__body')

					if (title.getBoundingClientRect().left < mainOffset) {

						let titleArrow = title.querySelector('svg')

						title.style.left = 0;


						title.style.transform = `translateX(0)`

						titleArrow.style.left = 0;


						titleArrow.style.transform = `translate(67 %, 96 %)`

					}
				})
			}
		}
	}

	showTips()

	function addCartNavbar() {
		const cartNavbar = document.querySelector('.cart-navbar')
		if (cartNavbar) {
			let mobileMenu = document.querySelector('.header__menu-mobile.mobile')

			mobileMenu.prepend(cartNavbar)

			mobileMenu.style.rowGap = `40px`;

			mobileMenu.style.flexWrap = `wrap`;

			cartNavbar.style.width = `100 % `


		}
	}

	addCartNavbar()

	function vacanciesBar() {

		const bar = document.querySelector('.vacancies-bar')
		if (bar) {

			const mobMenu = document.querySelector('.header__bottom')

			if (document.documentElement.clientWidth <= 768) {
				bar.style.top = `${mobMenu.scrollHeight + 20} px`
				console.log(mobMenu.scrollHeight);

				window.addEventListener('scroll', () => {
					if (document.documentElement.scrollTop >= (document.querySelector('.vacancy-info__item').offsetTop + document.documentElement.clientHeight)) {
						bar.classList.add('show')
					} else {
						bar.classList.remove('show')
					}
				})
			}
		}
	}
	vacanciesBar()

	const form = document.querySelector('.cart-form__form')

	function checkInput() {

		const inputs = document.querySelectorAll('.request__right-form__input')

		if (inputs) {

			let error = 0

			inputs.forEach(input => {

				input.addEventListener('blur', () => {
					if (input.validity.valid == false) {
						error++
						input.parentElement.classList.add('invalid')
					}

					if (error > 0) {
						input.parentElement.classList.add('invalid')
					}

					if (input.validity.valid == true) {
						error = 0
						input.parentElement.classList.remove('invalid')
					}
				})

			})

		}
	}
	checkInput()

	function openQaPopup() {
		const qaPopup = document.querySelector('.qa-popup')

		if (qaPopup) {

			const btn = document.querySelectorAll('.qa__left-btn')
			btn.forEach(el => {
				el.addEventListener('click', (e) => {
					e.preventDefault()
					openPopupElement(qaPopup)
				})
			})


			const close = qaPopup.querySelector('.popup__close')

			close.addEventListener('click', () => {
				closePopupElement(qaPopup)
			})

			document.addEventListener('click', (e) => {
				if (e.target == qaPopup) {
					closePopupElement(qaPopup)
				}
			})
			const submit = qaPopup.querySelector('.popup__form-btn')

			submit.addEventListener('click', (e) => {
				e.preventDefault()
				closePopupElement(qaPopup)
				openPopupElement(document.querySelector('.empty-popup'))
			})
		}
	}

	openQaPopup()


	const addToCartProduct = document.querySelectorAll('.specoffer__card-btn')
	if (addToCartProduct) {
		for (const btn of addToCartProduct) {
			btn.addEventListener('click', (e) => {
				e.preventDefault()
				openPopupElement(document.querySelector('.cart-popup'))
			})
		}
	}


	function openSearch() {
		const searchBtn = document.querySelector('.header__bottom-search')
		if (searchBtn) {

			const svgClose = `<svg xmlns = "http://www.w3.org/2000/svg" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" >
			<path fill-rule="evenodd" clip-rule="evenodd" d="M4.4107 4.41058C4.73614 4.08514 5.26378 4.08514 5.58921 4.41058L9.99996 8.82133L14.4107 4.41058C14.7361 4.08514 15.2638 4.08514 15.5892 4.41058C15.9147 4.73602 15.9147 5.26366 15.5892 5.58909L11.1785 9.99984L15.5892 14.4106C15.9147 14.736 15.9147 15.2637 15.5892 15.5891C15.2638 15.9145 14.7361 15.9145 14.4107 15.5891L9.99996 11.1783L5.58921 15.5891C5.26378 15.9145 4.73614 15.9145 4.4107 15.5891C4.08527 15.2637 4.08527 14.736 4.4107 14.4106L8.82145 9.99984L4.4107 5.58909C4.08527 5.26366 4.08527 4.73602 4.4107 4.41058Z" fill="white" />
	</svg> `;

			const svgSearch = `<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 16 16" fill = "none">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M7.66659 2.66683C4.90516 2.66683 2.66659 4.90541 2.66659 7.66683C2.66659 10.4283 4.90516 12.6668 7.66659 12.6668C9.00865 12.6668 10.2272 12.1381 11.1253 11.2775C11.1461 11.2488 11.1694 11.2213 11.1953 11.1954C11.2211 11.1695 11.2486 11.1463 11.2773 11.1255C12.1379 10.2274 12.6666 9.00887 12.6666 7.66683C12.6666 4.90541 10.428 2.66683 7.66659 2.66683ZM12.5916 11.649C13.4724 10.5611 13.9999 9.17558 13.9999 7.66683C13.9999 4.16903 11.1644 1.3335 7.66659 1.3335C4.16878 1.3335 1.33325 4.16903 1.33325 7.66683C1.33325 11.1646 4.16878 14.0002 7.66659 14.0002C9.17536 14.0002 10.5609 13.4726 11.6488 12.5918L13.5285 14.4716C13.7889 14.7319 14.211 14.7319 14.4713 14.4716C14.7317 14.2112 14.7317 13.7891 14.4713 13.5288L12.5916 11.649Z" fill="white" />
	</svg> `;

			const headerTop = document.querySelector('.header')
			const searchBlock = document.querySelector('.search-block')
			if (searchBlock) {
				let content = searchBlock.querySelector('.search-block__content')
				searchBtn.addEventListener('click', (e) => {
					e.stopPropagation()
					e.preventDefault()

					searchBlock.classList.toggle('active')

					if (searchBlock.classList.contains('active')) {
						searchBtn.innerHTML = svgClose;
						content.style.paddingTop = `${headerTop.offsetHeight + headerTop.offsetTop + 25} px`
						document.documentElement.classList.add('lock')
					} else {
						searchBtn.innerHTML = svgSearch;
						content.style.paddingTop = null;
						document.documentElement.classList.remove('lock')
					}
					if (document.documentElement.clientWidth <= 768) {

						let mobHead = document.querySelector('.header__bottom')
						content.style.paddingTop = `${mobHead.offsetHeight + mobHead.offsetTop + 25} px`
					}

				})
				document.addEventListener('click', (e) => {
					if (e.target == searchBlock) {
						searchBlock.classList.remove('active');
						document.documentElement.classList.remove('lock')
						searchBtn.innerHTML = svgSearch;
					}
				})
				document.addEventListener('keydown', (e) => {

					if (e.key == "Escape" && searchBlock.classList.contains('active')) {
						searchBlock.classList.remove('active');
						document.documentElement.classList.remove('lock')
						searchBtn.innerHTML = svgSearch;
					}
				})
			}
		}
	}

	openSearch()

	function searchMatches() {

		const headerSearch = document.querySelector('.search-block__input')

		if (headerSearch) {

			const inputValueClear = headerSearch.parentElement.querySelector('.clear-btn')


			const matchBlock = document.querySelector('.search-block__matches')

			const oftenSearch = document.querySelector('.search-result__column.often')

			const loader = document.querySelector('.load__block')

			inputValueClear.addEventListener('click', () => {
				headerSearch.value = ''
			})

			headerSearch.addEventListener('input', () => {

				loader.style.display = 'flex';

				oftenSearch.classList.add('inactive')

				setTimeout(function as() {

					loader.style.display = 'none';

				}, 3000);

				matchBlock.classList.add('active')


				if (headerSearch.value == "") {

					matchBlock.classList.remove('active')

					oftenSearch.classList.remove('inactive')

					loader.style.display = 'none';
				}
				else {

				}

			})

			headerSearch.addEventListener('blur', () => {

				if (headerSearch.value == "") {
					matchBlock.classList.remove('active')

					oftenSearch.classList.remove('inactive')
				}

			})

		}
	}
	searchMatches()


	// Добавление в корзину Листинг

	function listingdAddCard() {

		let count = 0

		const addToCart = document.querySelectorAll('.products__list-item__price > button')

		if (addToCart) {

			let btnInner = `< span > В корзине</span > <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="check"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8047 3.52851C14.0651 3.78886 14.0651 4.21097 13.8047 4.47132L6.4714 11.8047C6.21106 12.065 5.78894 12.065 5.5286 11.8047L2.19526 8.47132C1.93491 8.21097 1.93491 7.78886 2.19526 7.52851C2.45561 7.26816 2.87772 7.26816 3.13807 7.52851L6 10.3904L12.8619 3.52851C13.1223 3.26816 13.5444 3.26816 13.8047 3.52851Z" fill="#285BF3"></path></svg>`;
			let cartIco = document.querySelector('.header-cart-counter')
			for (const btn of addToCart) {
				btn.addEventListener('click', () => {
					btn.classList.toggle('incart')
					if (btn.classList.contains('incart')) {
						btn.innerHTML = btnInner;
						count++
					} else {
						count--
					}
					cartIco.innerText = count;
				})
			}

		}
	}

	listingdAddCard()

	// Добавление в корзину Листинг


	// Закрыть  Popup`ы при нажатии ESCAPE

	const allPopups = document.querySelectorAll('.popup');
	if (allPopups) {
		for (const popup of allPopups) {

			document.addEventListener('keydown', (e) => {
				if (e.key == "Escape" && popup.classList.contains('active')) {
					closePopupElement(popup)
				}
				return
			})

			document.addEventListener('click', (e) => {
				if (e.key == "Escape" && popup.classList.contains('active')) {
					if (e.target == popup) {
						closePopupElement(popup)
					}
				}
			})

			if (popup.classList.contains('active')) {
				const btnClose = popup.querySelector('.popup__close')
				if (btnClose) {
					btn.addEventListener('click', () => {
						closePopupElement(popup)
					})
				}

			}
		}
	}


	// Закрыть  Popup`ы при нажатии ESCAPE



	// popup при успешной отправке

	function succesFormAction() {

		const submitBtn = document.querySelector('[data-standart]');

		if (submitBtn) {
			const standartPopup = document.querySelector('.cart-submit__popup')
			if (standartPopup) {
				submitBtn.addEventListener('click', (e) => {
					e.preventDefault()
					let allPopups = document.querySelectorAll('.popup.active')
					allPopups.forEach(el => {
						closePopupElement(el)
					})
					standartPopup.classList.add('active')

				})
			}
		}

	}

	succesFormAction()

	// popup при успешной отправке


	// Попап быстрый заказ 15 минут

	const quickPopup = document.querySelector('.callback-popup')

	if (quickPopup) {

		const openQuickBtns = document.querySelectorAll('.cart-popup__item-tocart')

		const closeBtn = quickPopup.querySelector('.popup__close')

		if (openQuickBtns) {

			for (const openQuickBtn of openQuickBtns) {
				openQuickBtn.addEventListener('click', () => {
					openPopupElement(quickPopup)
					closePopupElement(document.querySelector('.cart-popup'))

				})

				closeBtn.addEventListener('click', () => {
					closePopupElement(quickPopup)
				})
			}
		}

		document.addEventListener('click', (e) => {
			if (e.target == quickPopup) {
				closePopupElement(quickPopup)
			}
		})

	}

	// Попап быстрый заказ 15 минут

	// Обратный звонок 15 мин

	const fastCallback = document.querySelector('.callback-popup2')

	if (fastCallback) {
		const fastCallbackBtns = document.querySelectorAll('.request-card__btn')
		for (const btn of fastCallbackBtns) {
			btn.addEventListener('click', () => {
				openPopupElement(fastCallback)
			})
		}

		const btn2 = document.querySelector('.header__menu-mobile__item--js')
		if (btn2) {
			btn2.addEventListener('click', () => {
				openPopupElement(fastCallback)
			})
		}
	}

	// Обратный звонок 15 мин


	// Закрывает все модалки по крестику и клику вне

	const closeAllPopups = document.querySelectorAll('.popup')
	if (closeAllPopups) {
		for (const popup of closeAllPopups) {
			let close = popup.querySelector('.popup__close')
			close.addEventListener('click', () => {
				closePopupElement(popup)
			})
			document.addEventListener('click', (e) => {
				if (e.target == popup) {
					closePopupElement(popup)
				}
			})
		}
	}


	// Закрывает все модалки по крестику и клику вне



	// Открыть модалку вакансии

	const vacancyPopupEmpty = document.querySelector('.vacancy-popup-empty')

	if (vacancyPopupEmpty) {
		const openBtn = document.querySelector('.jobs-block__btn')
		if (openBtn) {
			openBtn.addEventListener('click', (e) => {
				e.preventDefault()
				openPopupElement(vacancyPopupEmpty)
			})
			const submit = vacancyPopupEmpty.querySelector('.vacancy-form__submit')

			submit.addEventListener('click', (e) => {
				e.preventDefault()
				closePopupElement(vacancyPopupEmpty)
				openPopupElement(document.querySelector('.empty-popup'))
			})
		}
	}

	// Открыть модалку вакансии


	// Скрол к блоку
	const blockIds = document.querySelectorAll('[data-id]')

	for (const block of blockIds) {
		block.addEventListener('click', () => {
			const blockId = block.dataset.id;
			const anchor = document.querySelector(`[data-anchor=${blockId}]`)
			console.log(anchor);
			const anchorTop = anchor.offsetTop;

			window.scrollTo({

				top: anchorTop,

				behavior: "smooth"

			});

		})

	}

	// Скрол к блоку


	const newsCategories = document.querySelector('.news-materials__btns')

	if (newsCategories) {

		let btns = newsCategories.querySelectorAll('.news-materials__btn')

		for (const btn of btns) {
			btn.addEventListener('click', () => {
				btns.forEach(el => el.classList.remove('active'))
				btn.classList.add('active')
			})
		}

		newsCategories.querySelector('.news-materials__btn').click()

	}


	const servicesOrderBtn = document.querySelectorAll('.categories-card__btn-order')

	if (servicesOrderBtn) {

		servicesOrderBtn.forEach(el => {
			const popup = document.querySelector('.callback-popup')
			el.addEventListener('click', () => {

				openPopupElement(popup)
			})
		})
	}

	const servicesCartBtn = document.querySelectorAll('.categories-card__btn-cart')

	if (servicesCartBtn) {
		const cartPopup = document.querySelector('.cart-popup')


		if (cartPopup) {

			const cartPopupBtn = cartPopup.querySelector('.cart-popup__item-btn');

			if (cartPopupBtn) {

				servicesCartBtn.forEach(el => {
					el.addEventListener('click', () => {
						openPopupElement(cartPopup)
					})
				})

				cartPopupBtn.addEventListener('click', () => {
					closePopupElement(cartPopup)
				})

			}
		}

	}

	const bannerPopupBtn = document.querySelector('.service-banner__btn')
	if (bannerPopupBtn) {
		const popup = document.querySelector('.callback-popup')
		bannerPopupBtn.addEventListener('click', () => {
			openPopupElement(popup)

		})
	}

	const orderService = document.querySelector('.service-order')
	if (orderService) {
		const popup = document.querySelector('.callback-popup')
		orderService.addEventListener('click', () => {
			openPopupElement(popup)
		})
	}


	const calculateBannerBtn = document.querySelector('.calculate-banner__btn')
	if (calculateBannerBtn) {
		calculateBannerBtn.addEventListener('click', (e) => {
			e.preventDefault()
			openPopupElement(document.querySelector('.callback-popup'))
		})
	}

	const manufactureOrder = document.querySelectorAll('.manufacture-card__btn')
	if (manufactureOrder) {
		for (const btn of manufactureOrder) {
			btn.addEventListener('click', (e) => {
				e.preventDefault()
				openPopupElement(document.querySelector('.callback-popup'))
			})
		}
	}

	let links = document.querySelectorAll('[data-anchor]')

	if (links) {

		links.forEach(link => {
			const linkId = link.getAttribute('href').replace('#', '');
			link.addEventListener('click', (e) => {
				e.preventDefault()
				let scrollTarget = document.querySelector(`[id="${linkId}"]`);
				let topOffset = document.querySelector('.header').offsetHeight;
				console.log(topOffset);
				let elementPos = scrollTarget.getBoundingClientRect().top;
				let offsetPos = elementPos - (topOffset + 100);

				window.scrollBy({
					top: offsetPos,
					behavior: "smooth"
				})

			})
		})
	}

	function showPriceInfo() {
		const infoTitles = document.querySelectorAll('.price-info--js')
		if (infoTitles) {
			infoTitles.forEach(el => {
				let title = el.querySelector('.title')
				el.addEventListener('click', (e) => {
					e.stopPropagation()
					document.querySelectorAll('.title').forEach(el => {
						el.classList.remove('active')
					})
					title.classList.add('active')
				})


				document.addEventListener('click', (e) => {
					title.classList.remove('active')
				})
			})

		}
	}

	showPriceInfo()

	const zoomImages = document.querySelectorAll('[data-zoom]')
	if (zoomImages) {

		let btnCloseHtml = `<button class="popup-image__close">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.41083 4.41083C4.73626 4.08539 5.2639 4.08539 5.58934 4.41083L10.0001 8.82157L14.4108 4.41083C14.7363 4.08539 15.2639 4.08539 15.5893 4.41083C15.9148 4.73626 15.9148 5.2639 15.5893 5.58934L11.1786 10.0001L15.5893 14.4108C15.9148 14.7363 15.9148 15.2639 15.5893 15.5893C15.2639 15.9148 14.7363 15.9148 14.4108 15.5893L10.0001 11.1786L5.58934 15.5893C5.2639 15.9148 4.73626 15.9148 4.41083 15.5893C4.08539 15.2639 4.08539 14.7363 4.41083 14.4108L8.82157 10.0001L4.41083 5.58934C4.08539 5.2639 4.08539 4.73626 4.41083 4.41083Z" fill="#fff"></path>
</svg>
</button>`

		let imgPopup = document.createElement('div')

		document.documentElement.append(imgPopup)

		imgPopup.classList.add('popup-image')

		imgPopup.insertAdjacentHTML('beforeend', btnCloseHtml)

		let popupBody = document.createElement('div')

		popupBody.classList.add('popup-image__body')

		imgPopup.append(popupBody)

		let img = document.createElement('img')

		popupBody.append(img)

		zoomImages.forEach(el => {

			let imgPath = el.src

			el.addEventListener('click', (e) => {

				e.stopPropagation()

				e.preventDefault()

				img.setAttribute('src', `${imgPath}`)

				imgPopup.classList.add('active')

				if (imgPopup.classList.contains('active')) {
					document.body.classList.add('lock', 'dark')
					document.documentElement.classList.add('lock')
				}
				else {
					document.body.classList.remove('lock', 'dark')
					document.documentElement.classList.remove('lock')

				}

				document.addEventListener('click', (e) => {
					if (e.target == imgPopup) {
						imgPopup.classList.remove('active')
						document.body.classList.remove('lock', 'dark')
						document.documentElement.classList.remove('lock')

					}
				})

				document.addEventListener('keydown', (e) => {
					if (e.key === "Escape") {
						imgPopup.classList.remove('active')
						document.body.classList.remove('lock', 'dark')
						document.documentElement.classList.remove('lock')
					}
				})

			})

		})

		document.querySelector('.popup-image__close').addEventListener('click', () => {
			imgPopup.classList.remove('active')
			document.body.classList.remove('lock', 'dark')
			document.documentElement.classList.remove('lock')
		})

	}




	function sublistPos() {
		const dropdownBtn = document.querySelectorAll('[data-dropdown]')
		if (dropdownBtn) {
			for (const btn of dropdownBtn) {
				btn.addEventListener('click', () => {
					let posTop = btn.offsetTop
					let posLeft = btn.getBoundingClientRect().left
					const sublist = btn.querySelector('[data-sublist]')

					btn.style.position = 'initial'
					sublist.style.right = 'initial'
					sublist.style.top = `${posTop + (btn.scrollHeight + 10)}px`
					sublist.style.left = `${posLeft}px`

					if (+sublist.style.left.replace('px', '') + sublist.offsetWidth >= window.innerWidth) {
						let difference = +sublist.style.left.replace('px', '') + sublist.offsetWidth;
						sublist.style.left = `${posLeft - (difference - window.innerWidth)}px`
					}

				})
			}
		}
	}

	sublistPos()




	function mapPoint() {
		const points = document.querySelectorAll('.map-points__point')
		if (points) {
			for (const point of points) {
				point.addEventListener('click', () => {
					points.forEach(el => el.classList.remove('active'))
					point.classList.add('active')
				})
			}
		}
	}

	mapPoint()


	const priceListPopupBtn = document.querySelector('.pricelist-popup-btn')
	if (priceListPopupBtn) {

		const pricelistPopup = document.querySelector('.qa-popup')
		if (pricelistPopup) {
			priceListPopupBtn.addEventListener('click', () => {
				openPopupElement(pricelistPopup)
			})
		}
	}


	const reviewBtns = document.querySelectorAll('.opinions__card-more')
	const reviewPopup = document.querySelector('.review-popup')
	if (reviewBtns && reviewPopup) {
		reviewBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				// reviewPopup.classList.add('active')
				openPopupElement(reviewPopup)
			})
		})
	}


	const galleryBtns = document.querySelectorAll('.zoom-btn--js');
	const galleryPopup = document.querySelector('.sertif-gallery-popup')
	if (galleryBtns && galleryPopup) {
		galleryBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				openPopupElement(galleryPopup)
			})
		})
	}

	function openSpecofferFilter() {
		const dropdowns = document.querySelectorAll('.specoffer-filter__dropdown')
		if (dropdowns) {
			for (const dropdown of dropdowns) {
				const dropdownBtn = dropdown.querySelector('.specoffer-filter__btn')
				const dropdownBody = dropdown.querySelector('.specoffer-filter__body')

				dropdownBtn.addEventListener('click', (e) => {
					e.preventDefault()
					dropdown.classList.toggle('active')

					document.addEventListener('click', (e) => {
						if (e.target !== dropdownBtn) {
							dropdown.classList.remove('active')
						}
					})
				})
			}
		}
	}




	openSpecofferFilter()

	function moovElement() {

		const moveableEl = document.querySelector('[data-moveableElement]')

		const moveablePlace = document.querySelector('[data-moveablePlace]')

		if (moveableEl && moveablePlace) {

			const homePlace = document.querySelector('.claim-form__body')

			if (window.innerWidth <= 769) {

				moveablePlace.append(moveableEl)

			}
			else {
				homePlace.append(moveableEl)
			}
			window.addEventListener('resize', () => {
				if (window.innerWidth <= 769) {

					moveablePlace.append(moveableEl)

				}
				else {
					homePlace.append(moveableEl)
				}
			})
		}
	}
	moovElement()


	function openMobMenuSublist() {
		const dropdowns = document.querySelectorAll('.mobile-menu__dropdown')
		if (dropdowns) {
			for (const dropdown of dropdowns) {
				const dropdownBtn = dropdown.querySelector('.mobile-menu__dropdown-btn')
				const dropdownList = dropdown.querySelector('.mobile-menu__sublist')

				dropdown.addEventListener('click', (e) => {
					e.stopPropagation()
					dropdown.classList.toggle('active')
					if (dropdown.classList.contains('active')) {
						dropdownBtn.classList.add('active')
						dropdownList.classList.add('active')
					}
					else {
						dropdownBtn.classList.remove('active')
						dropdownList.classList.remove('active')
					}

				})

				document.addEventListener('click', (e) => {
					if (e.target !== dropdown) {
						dropdown.classList.remove('active')
						dropdownBtn.classList.remove('active')
						dropdownList.classList.remove('active')
					} else {
						console.log(dropdown);
					}
				})

			}

		}
	}

	openMobMenuSublist()




	const mobMenuWrap = document.querySelector('.mobile-menu__list-wrapper')
	const mobCatalogWraps = document.querySelectorAll('.header__catalog-mobile__menu')

	if (mobMenuWrap) {
		mobMenuWrap.style.maxHeight = `
		${window.innerHeight - document.querySelector('.header__catalog-mobile__top').offsetHeight
			-
			document.querySelector('.header__menu-mobile').offsetHeight - 36}px`;

		window.addEventListener('resize', () => {
			mobMenuWrap.style.maxHeight = `
		${window.innerHeight - document.querySelector('.header__catalog-mobile__top').offsetHeight
				-
				document.querySelector('.header__menu-mobile').offsetHeight - 36}px`;
		})
	}



	const writeReview = document.querySelector('.write-rewiev-popup')
	if (writeReview) {
		const openBtn = document.querySelector('.open-review-popup')
		const submit = writeReview.querySelector('.popup__form-btn')
		const emptyPopup = document.querySelector('.empty-popup')
		openBtn.addEventListener('click', e => {
			e.preventDefault()
			openPopupElement(writeReview)
		})
		submit.addEventListener('click', e => {
			e.preventDefault()
			closePopupElement(writeReview)
			openPopupElement(emptyPopup)
		})
	}

	// фиксация блока для Safari

	if (mobCatalogWraps) {

		for (const mobCatalogWrap of mobCatalogWraps) {
			mobCatalogWrap.style.maxHeight = `
	${window.innerHeight - document.querySelector('.header__catalog-mobile__top').offsetHeight
				-
				document.querySelector('.header__menu-mobile').offsetHeight
				-
				document.querySelector('.header__catalog-mobile__search').offsetHeight}px`;


			window.addEventListener('resize', () => {
				mobCatalogWrap.style.maxHeight = `
					${window.innerHeight - document.querySelector('.header__catalog-mobile__top').offsetHeight
					-
					document.querySelector('.header__menu-mobile').offsetHeight
					-
					document.querySelector('.header__catalog-mobile__search')}px`;
			})
		}
	}
	// фиксация блока для Safari


	// Скрол к блоку для страницы Product

	function scrollToElement() {

		const anchors = document.querySelectorAll('.bottom-menu__link')

		if (anchors) {
			for (const anchor of anchors) {

				const anchorLink = anchor.getAttribute('href').replaceAll('#', '');

				const block = document.querySelector(`[id=${anchorLink}]`)

				anchor.addEventListener('click', (e) => {

					e.preventDefault()

					anchors.forEach(el => el.classList.remove('active'))

					const blockTop = block.getBoundingClientRect().top - document.querySelector('.header__bottom').offsetHeight;

					anchor.classList.add('active')

					window.scrollBy({
						top: blockTop - 30,
						behavior: 'smooth',
					});
				})

				window.addEventListener('scroll', () => {
					if (window.scrollY > block.getBoundingClientRect().top - document.documentElement.clientHeight) {
						console.log(block);
						console.log(anchor);
					}
				})

			}
		}
	}
	scrollToElement()


	// Скрол к блоку для страницы Product

})