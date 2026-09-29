const interactionLayer = document.querySelector(".interaction-layer");
const supportsMousePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (interactionLayer && supportsMousePointer && !prefersReducedMotion) {
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