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
	locationBlockChange.addEventListener('click', function () {
		locationBlock.classList.remove('active');
		chooseLocationBlock.classList.add('active');
		let scrollWidth = (window.innerWidth - document.body.clientWidth);
		header.style.paddingRight = `${scrollWidth}px`
		document.body.style.paddingRight = `${scrollWidth}px`;
		document.body.classList.add('lock');
		document.documentElement.classList.add('lock');
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

	mobileMenuBtns = document.querySelectorAll('.header__menu-mobile__item');
	const mobileCatalogBtn = document.querySelector('.header__menu-mobile__item.catalog');
	mobileCatalogBtn.addEventListener('click', function () {
		mobileMenuBtns.forEach(btn => {
			if (btn !== mobileCatalogBtn) {
				btn.classList.remove('active');
			}
			mobileCatalogBtn.nextElementSibling.classList.toggle('active');
		})
	})

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
			// btn.parentElement.classList.remove('active');
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

		const categoriesBtns = document.querySelectorAll('.categories__btn');

		categoriesBtns.forEach(btn => {

			btn.addEventListener('click', function (e) {
				const currentBtns = btn.parentElement.querySelectorAll('.categories__btn');
				currentBtns.forEach(el => el.classList.remove('active', 'blue-btn'));
				btn.classList.add('active', 'blue-btn');

				if (btn.classList.contains('categories__btn--js')) {

					const moreBtn = document.querySelector('.categories__btn--js')

					if (moreBtn) {
						const moreBtnText = moreBtn.querySelector('p')

						const moreSublist = moreBtn.querySelector('.categories__btn-sublist')

						const moreSublistItems = moreSublist.querySelectorAll('.categories__btn-sublist li a')


						if (moreBtn.classList.contains('active')) {
							moreSublist.classList.add('active')
						} else {
							moreSublist.classList.remove('active')
						}

						moreSublistItems.forEach(el => {

							el.addEventListener('click', (e) => {

								e.preventDefault()

								e.stopPropagation()

								moreSublistItems.forEach(el => el.classList.remove('active'))

								e.currentTarget.classList.add('active')

								moreBtnText.innerText = el.innerText;

								moreBtn.dataset.path = el.innerText.replaceAll(' ', '').toLowerCase()

								moreBtn.click()

								moreSublist.classList.remove('active')

							})
							document.addEventListener('click', (e) => {

								if (e.target == el) {
									moreSublist.classList.remove('active')
								}
							})

						})

						moreBtn.addEventListener("click", e => {
							e.stopPropagation()
							moreSublist.classList.add('active')
						})

						document.addEventListener('click', (e) => {
							if (e.target !== moreBtn) {
								moreSublist.classList.remove('active')
							}
						})
					}
					moreBtn.click()

				}

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
			const text = btn.parentElement.querySelector('p');

			btn.addEventListener('click', function (e) {
				const button = e.target;
				text.classList.toggle('active');

				if (text.classList.contains('active')) {
					button.innerText = 'Свернуть';
				} else {
					button.innerText = 'Показать полностью';
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
				})
			}
		})

	}

	// открытие/закрытие категорий

	if (document.querySelector('.section-tags__list-item > button.show-more')) {
		const sectionTagsMoreBtn = document.querySelector('.section-tags__list-item > button.show-more');
		sectionTagsMoreBtn.addEventListener('click', function () {
			sectionTagsMoreBtn.classList.toggle('open');
			sectionTagsMoreBtn.nextElementSibling.classList.toggle('active');

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

	if (document.querySelector('.products__list-item__units')) {
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
				} else {
					parentBtn.querySelector('span').innerText = 'шт';
				}
			})
		})
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
			if (listingInfoBtn.classList.contains('active')) {
				listingInfoBtn.querySelector('span').innerText = 'Скрыть';
			} else listingInfoBtn.querySelector('span').innerText = 'Показать полностью';
			let content = listingInfoBtn.previousElementSibling;
			if (content.style.maxHeight) {
				content.style.maxHeight = null
			} else {
				console.log(content.scrollHeight);
				content.style.maxHeight = content.scrollHeight / 10 + "rem";
			}
		})
	}

	// открытие/закрытие модалки заявки

	if (document.querySelector('.banner1__left-btn') && document.querySelector('.callback-popup')) {
		const callbackPopup = document.querySelector('.callback-popup');
		const callbackPopupOpen = document.querySelector('.banner1__left-btn');
		const callbackPopupClose = callbackPopup.querySelector('.popup__close');

		callbackPopupOpen.addEventListener('click', function () {
			openPopupElement(callbackPopup);
		})

		callbackPopupClose.addEventListener('click', function () {
			closePopupElement(callbackPopup)
		})
	}


	// открытие/закрытие модалки обратного звонка


	if (document.querySelector('.choose-city__left-call') && document.querySelector('.callback-popup2')) {

		const callbackBtn = document.querySelector('.header-contacts__btn')
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

		callbackBtn.addEventListener('click', (e) => {
			openPopupElement(callback2Popup);
		})

		submitCallback.addEventListener('click', (e) => {
			e.preventDefault()
			closePopupElement(callback2Popup)
			openPopupElement(document.querySelector('.empty-popup'))
		})

		document.querySelector('.empty-popup__btn').addEventListener('click', (e) => {
			e.preventDefault()
			closePopupElement(document.querySelector('.empty-popup'))
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

		const orderBtn = document.querySelector('.request__right-form__btn')
		orderBtn.addEventListener('click', succesSubmit)
		function succesSubmit(e) {
			e.preventDefault()
			openPopupElement(document.querySelector('.empty-popup'))
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
			sortingBtn.addEventListener('click', function () {
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
		}

	}

	// Окрытие обратного звонка из Хедера



	// Окрытие обратного звонка из Хедера


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
					sublist.style.maxHeight = sublist.scrollHeight / 5 + "rem";
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


		reqTypes.forEach((el) => {

			const dropdownItem = document.querySelectorAll('.dropdown-body li')
			dropdownItem.forEach(item => {
				if (item.classList.contains('selected')) {
					el.value = item.textContent;
					console.log(item);
					console.log(item.textContent);
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

		})

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
		let priceBlock = document.querySelector('.show-price');
		let showPriceBtn = document.querySelector('.showPriceBtn');
		if (showPriceBtn) {

			showPriceBtn.addEventListener('click', () => {
				priceBlock.classList.add('active')
				setTimeout(() => {
					priceBlock.classList.remove('active')

				}, 3000);
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


	function fixedBottomMenu() {
		let bottomMenu = document.querySelector('.bottom-menu')
		let headerBottom = document.querySelector('.header__bottom')
		if (bottomMenu) {
			if (document.documentElement.clientWidth <= 768) {
				bottomMenu.style.top = `${headerBottom.scrollHeight + 20}px`
				bottomMenu.style.bottom = "initial"
				window.addEventListener('resize', () => {
					bottomMenu.style.top = `${headerBottom.scrollHeight + 20}px`
					bottomMenu.style.bottom = "initial"

				})
			}

		}
	}

	fixedBottomMenu()


	function asideMenu() {

		const asided = document.querySelector('.asided-js')

		if (asided) {

			if (document.documentElement.clientWidth >= 768) {

				const asideBlock = asided.querySelector('aside')

				const spaceLeftBlocks = asided.querySelectorAll('.aside-space')

				const firstElement = spaceLeftBlocks[0];

				firstElement.style.marginTop = `-${asideBlock.offsetHeight}px`;

				asideBlock.style.transform = `translateY(${window.getComputedStyle(firstElement).paddingTop})`;

				window.addEventListener('scroll', () => {

					if (document.documentElement.scrollTop - document.querySelector('.section-hero').offsetHeight >= asideBlock.offsetHeight) {
						asideBlock.style.transform = null;
					}
					else {
						asideBlock.style.transform = `translateY(${window.getComputedStyle(firstElement).paddingTop})`;
					}

				})


				for (const item of spaceLeftBlocks) {

					const container = item.querySelector('.container');


					container.style.paddingLeft = `${asideBlock.offsetWidth}px`;


					let containerMarginLeft = window.getComputedStyle(container).marginLeft;

					asideBlock.style.left = `calc(${containerMarginLeft}`
				}
			}
		}

	}

	asideMenu()

	// window.addEventListener('resize', asideMenu)

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
		}
	}


	// Закрыть  Popup`ы при нажатии ESCAPE


	function tabs() {

		let tabButtons = document.querySelectorAll('[data-parent]')


		if (tabButtons) {
			for (const button of tabButtons) {

				button.addEventListener('click', (e) => {

					let targetId = e.target.dataset.parent;

					let targetBlock = document.querySelector(`[data-child="${targetId}"]`);

					let tabsBody = document.querySelectorAll('[data-child]')

					tabsBody.forEach(item => item.classList.remove('active'))

					tabButtons.forEach(item => {
						item.classList.remove('active')
					})

					e.target.classList.add('active')

					targetBlock.classList.add('active')

				});

				let tabButton = document.querySelector('[data-parent]').click()
			};

		}
	}

	tabs()



	const vacancyPopup = document.querySelector('.vacancy-popup')

	if (vacancyPopup) {
		const emptyPopup = document.querySelector('.empty-popup')

		const vacancyBtn = document.querySelectorAll('.vacancies-hero__btn')
		for (const btn of vacancyBtn) {
			btn.addEventListener('click', () => openPopupElement(vacancyPopup))

		}
		const closePopup = document.querySelectorAll('.popup__close')

		closePopup.forEach((el) => {
			el.addEventListener('click', () => closePopupElement(vacancyPopup))

			el.addEventListener('click', () => closePopupElement(emptyPopup))

		})


		document.addEventListener('click', (e) => {
			if (e.target == vacancyPopup)
				closePopupElement(vacancyPopup)
		})

		const vacancySubmit = vacancyPopup.querySelector('.cart-form__submit')

		vacancySubmit.addEventListener('click', (e) => {

			e.preventDefault()

			closePopupElement(vacancyPopup)

			openPopupElement(emptyPopup)

		})
	}


	function newsDateFilter() {

		const newsFilterYear = document.querySelector('.news-materials__action-btn.year')

		const newsFilterMonth = document.querySelector('.news-materials__action-btn.month')

		if (newsFilterYear) {

			let yearSublistItems = newsFilterYear.querySelectorAll('.news-materials__action-sublist li a')

			newsFilterYear.addEventListener('click', (e) => {
				e.preventDefault()
				e.currentTarget.classList.toggle('active')
			})

			for (const item of yearSublistItems) {
				item.addEventListener('click', () => {

					yearSublistItems.forEach(el => el.classList.remove('check'))

					let btnText = newsFilterYear.querySelector('.text')


					item.classList.add('check')



					btnText.textContent = (/* item.textContent  */ item.textContent == "Все года" ? item.textContent : item.textContent + ' ' + 'год')
				})
			}
		}

		if (newsFilterMonth) {

			let monthSublistItems = newsFilterMonth.querySelectorAll('.news-materials__action-sublist li a');

			newsFilterMonth.addEventListener('click', (e) => {
				e.preventDefault()
				e.currentTarget.classList.toggle('active')
			})

			for (const item of monthSublistItems) {

				item.addEventListener('click', () => {

					monthSublistItems.forEach(el => el.classList.remove('check'))


					let btnText = newsFilterMonth.querySelector('.text')



					item.classList.add('check')


					btnText.textContent = (/* item.textContent  */ item.textContent == "Все месяца" ? item.textContent : 'за' + ' ' + item.textContent)
				})
			}
		}

	}

	newsDateFilter()

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

					title.style.top = `-${title.scrollHeight + 10}px`

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


						titleArrow.style.transform = `translate(67%,96%)`


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

			cartNavbar.style.width = `100%`


		}
	}

	addCartNavbar()

	function vacanciesBar() {

		const bar = document.querySelector('.vacancies-bar')
		if (bar) {

			const mobMenu = document.querySelector('.header__menu-mobile.mobile')

			if (document.documentElement.clientWidth <= 768) {
				bar.style.bottom = `${mobMenu.scrollHeight + 24}px`
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
		console.log(qaPopup);
		if (qaPopup) {

			const btn = document.querySelector('.qa__left-btn')

			btn.addEventListener('click', (e) => {
				e.preventDefault()
				openPopupElement(qaPopup)
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
			const submit = document.querySelector('.popup__form-btn')

			submit.addEventListener('click', (e) => {
				e.preventDefault()
				closePopupElement(qaPopup)
				openPopupElement(document.querySelector('.empty-popup'))
			})
		}
	}
	openQaPopup()
})





