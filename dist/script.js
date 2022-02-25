// Cart
const cart = document.querySelector(".cart");
const cartPath = document.querySelector(".cart path");
const popUp = document.querySelector(".pop-up");
const insideCart = document.getElementById("inside-cart");

// Amount items
const amount = document.querySelector("#amount");
const amountCart = document.querySelector("#amount-cart");

// Thumbnails and Hero
const thumbnails = document.querySelectorAll(".thumbnails div");
const thumbsLight = document.querySelectorAll(".thumbnails-light div");
const hero = document.getElementById("hero");
const heroLightbox = document.getElementById("hero-lightbox");

// Lightbox
const light1 = document.getElementById("light-1");
const light2 = document.getElementById("light-2");
let lightbox = false;

// Hamburger Menu
const sideNavbar = document.getElementById("side-nav");
const contentCover = document.getElementById("content-cover");

// Functions
function emptyCart(inside) {
	inside.innerHTML = `
	<p class="m-auto text-dark-grayish">
		Your cart is empty.
	</p>`;
}
function loadCart(inside, items) {
	inside.innerHTML = `
	<section>
		<div class="flex gap-3 relative">
			<img
				src="./images/image-product-1.jpg"
				alt=""
				class="w-1/6 rounded"
			/>

			<header class="py-1/2">
				<h5
					class="text-sm font-normal text-dark-grayish"
				>
					Fall Limited Edition
					Sneakers
				</h5>
				<p
					class="text-dark-grayish font-normal mt-[2px]"
				>
					$125.00 x ${items}
					<span
						class="font-bold text-very-dark"
						>$${125 * items}.00</span
					>
				</p>
				<svg
					width="12"
					height="14"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 14 16"
					class="absolute top-4 fill-[#C3CAD9] right-0 cursor-pointer hover:fill-dark-grayish transition"
					id="delete"
				>
					<defs>
						<path
							d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
							id="a"
						/>
					</defs>
					<use
						fill=""
						fill-rule="nonzero"
						xlink:href="#a"
						id="delete"
					/>
				</svg>
			</header>
		</div>
	</section>

	<button
		class="bg-orange text-white text-center w-full py-3 rounded-lg hover:brightness-125 transition  select-none"
		id="checkout"
	>
		Checkout
	</button>`;
}
function lightBox(thumbsLight, heroLight, index) {
	thumbsLight.forEach((e) => {
		e.children[0].classList.remove("active");
		e.classList.remove("ring-active");
	});

	let thumbnailsArray = Array.from(thumbsLight);
	let found = thumbnailsArray.find((e) => e.id == index);

	found.classList.add("ring-active");
	found.children[0].classList.add("active");

	heroLight.src = found.children[0].src;

	heroLight.classList.add("animate-change");
	setTimeout(() => {
		heroLight.classList.remove("animate-change");
	}, 400);
}

// localStorage["total"] = 0;
// Check cart items
let items = parseInt(localStorage.getItem("total"));
if (items <= 0 || !items) {
	emptyCart(insideCart);
} else {
	loadCart(insideCart, items);
}

// Config localStrogae
if (localStorage["total"] == 0) {
	localStorage.setItem("total", amount.innerHTML);
} else {
	amountCart.innerHTML = items;
	if (amountCart.innerHTML >= 1) {
		amountCart.classList.replace("scale-0", "scale-1");
	}
}

document.addEventListener("click", function (e) {
	// console.log(e.target);
	console.log(e.target.id);

	// Cart pops up
	if (e.target == cart || e.target == cartPath) {
		cart.classList.toggle("cart-active");
		return popUp.classList.toggle("hide");
	}

	// Dynamic Hero
	if (e.target.id.includes("thumb")) {
		const index = e.target.id.substring(e.target.id.length - 1);

		lightBox(thumbsLight, heroLightbox, index);

		if (!lightbox) {
			thumbnails.forEach((e, i) => {
				if (i >= 4) {
					e.children[0].classList.remove("active");
					e.classList.remove("ring-active");
				}
			});

			thumbnailsArray = Array.from(thumbnails).slice(4);
			found = thumbnailsArray.find((e) => e.id == index);

			found.classList.add("ring-active");
			found.children[0].classList.add("active");

			hero.src = found.children[0].src;

			hero.classList.add("animate-change");
			setTimeout(() => {
				hero.classList.remove("animate-change");
			}, 400);
		}

		return;
	}

	// Total increment/decrement
	if (e.target.id == "plus" || e.target.id == "minus") {
		let amountAdd = parseInt(amount.innerHTML);
		if (e.target.id == "plus") {
			amountAdd += 1;
		} else if (e.target.id == "minus") {
			if (amountAdd <= 0) return;
			amountAdd -= 1;
		}

		amount.innerHTML = amountAdd;
	}

	// Add to cart
	if (e.target.id == "add-cart") {
		if (amount.innerHTML == 0) return;
		amountCart.innerHTML =
			parseInt(amountCart.innerHTML) + parseInt(amount.innerHTML);
		amountCart.classList.replace("scale-0", "scale-1");

		amount.innerHTML = 0;
		loadCart(insideCart, amountCart.innerHTML);
		return localStorage.setItem("total", amountCart.innerHTML);
	}

	// Delete from cart
	if (e.target.id == "delete") {
		localStorage["total"] = 0;
		amountCart.innerHTML = 0;
		amountCart.classList.replace("scale-1", "scale-0");
		return emptyCart(insideCart);
	}

	// LIGHTBOX
	if (e.target.id == "hero") {
		console.log(e.target.classList);
		light1.classList.remove("hidden");
		light2.classList.remove("invisible");
		console.log("in");

		light1.classList.add("animate-lightChange");
		light2.classList.add("animate-change");
		setTimeout(() => {
			light1.classList.remove("animate-lightChange");
			light2.classList.remove("animate-change");
		}, 400);

		return (lightbox = true);
	}

	// Next and previous
	if (e.target.id == "previous" || e.target.id == "next") {
		const src = heroLightbox.src;

		const thumbnailsArray = Array.from(thumbsLight);
		let foundSrc = thumbnailsArray.find((e) => e.children[0].src == src);

		let id;
		if (e.target.id == "previous") {
			id = parseInt(foundSrc.id) - 1;
		} else {
			id = parseInt(foundSrc.id) + 1;
		}
		if (id > 4) {
			id = 1;
		} else if (id <= 0) {
			id = 4;
		}

		lightBox(thumbsLight, heroLightbox, id);
		return;
	}

	// MOBILE
	// Hamburger menu
	if (e.target.id == "hamburger") {
		sideNavbar.classList.remove("-translate-x-96");
		contentCover.classList.replace("opacity-0", "opacity-75");
		contentCover.classList.remove("hidden");

		contentCover.classList.add("animate-lightChange");
		setTimeout(() => {
			contentCover.classList.remove("animate-lightChange");
		}, 400);
	}

	// Next and Previous 2
	if (e.target.id == "previous-mobile" || e.target.id == "next-mobile") {
		let index = parseInt(
			hero.src.substring(hero.src.length - 5, hero.src.length - 4)
		);
		const firstIndex = index;

		if (e.target.id == "next-mobile") {
			index += 1;
		} else {
			index -= 1;
		}

		if (index > 4) {
			index = 1;
		} else if (index < 1) {
			index = 4;
		}

		hero.src = hero.src
			.slice(0, hero.src.length - 5)
			.concat(`${index}.jpg`);

		hero.classList.add("animate-change");
		setTimeout(() => {
			hero.classList.remove("animate-change");
		}, 400);
	}

	// REMOVAL
	// Cart pop up removal
	if (!popUp.classList.contains("hide")) {
		popUp.classList.add("hide");
	}

	// Lightbox removal
	if (
		(!light1.classList.contains("hidden") ||
			!light2.classList.contains("invisible")) &&
		!light2.classList.contains("hidden")
	) {
		light1.classList.add("animate-lightReverse");
		setTimeout(() => {
			light1.classList.remove("animate-lightReverse");
			light1.classList.add("hidden");
		}, 400);
		light2.classList.add("invisible");
		lightbox = false;
	}

	// Sidebar removal
	if (e.target.id == "close") {
		sideNavbar.classList.add("-translate-x-96");
		contentCover.classList.replace("opacity-75", "opacity-0");
		contentCover.classList.add("animate-lightReverse");
		setTimeout(() => {
			contentCover.classList.remove("animate-lightReverse");
		}, 400);
		contentCover.classList.add("hidden");
	}
});
