const interactionLayer = document.querySelector(".interaction-layer");
const supportsPointerEffects = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (interactionLayer && supportsPointerEffects && !prefersReducedMotion) {
	document.addEventListener("pointermove", (event) => {
		if (event.pointerType !== "mouse") return;

		interactionLayer.style.setProperty("--pointer-x", `${event.clientX}px`);
		interactionLayer.style.setProperty("--pointer-y", `${event.clientY}px`);
		document.body.classList.add("has-pointer");
	});

	document.addEventListener("pointerleave", () => {
		document.body.classList.remove("has-pointer");
	});

	document.addEventListener("pointerup", (event) => {
		if (event.pointerType !== "mouse" || event.button !== 0) return;
		if (!(event.target instanceof Element) || !event.target.closest("a, button")) return;

		const ripple = document.createElement("span");
		ripple.className = "click-ripple";
		ripple.style.left = `${event.clientX}px`;
		ripple.style.top = `${event.clientY}px`;
		ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
		interactionLayer.append(ripple);
	});
}