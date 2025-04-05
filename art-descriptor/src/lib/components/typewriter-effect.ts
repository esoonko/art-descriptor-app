export function animateTyping(node: HTMLElement, texts: string[]) {
	let textsToType = texts;

	let textsIndex = 0;
	let charIndex = 0;
	let currentText = '';

	const updateInnerHTML = (isTyping?: boolean) => {
		// Always include the zero-width space and conditionally add the text and cursor
		node.innerHTML = '&#8203;' + currentText;
	};

	// Blinking cursor effect
	const waitingEffect = (delay: number) => {
		setTimeout(() => {
			updateInnerHTML();
		}, delay);
	};

	// Typing animation effect
	const typeEffect = () => {
		const currentString = textsToType[textsIndex];
		const delay = currentString[charIndex] === ' ' ? 10 : 25; // Faster delay for spaces

		if (charIndex < currentString.length) {
			currentText += currentString[charIndex++];
			setTimeout(typeEffect, delay);
		} else {
			waitingEffect(3000);
		}

		updateInnerHTML(true);
	};
	const deleteEffect = () => {
		if (charIndex > 0) {
			currentText = currentText.slice(0, --charIndex);
			setTimeout(deleteEffect, 50);
		} else {
			textsIndex = (textsIndex + 1) % textsToType.length;
			currentText = ''; // Clear text but keep zero-width space
			waitingEffect(3000);
			setTimeout(typeEffect, 3000);
		}

		updateInnerHTML();
	};

	setTimeout(typeEffect, 500);

	return {
		onDestroy() {},
		update(newTexts: string[]) {
			textsToType = newTexts;
		}
	};
}
