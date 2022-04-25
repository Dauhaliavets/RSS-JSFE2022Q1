function shuffle(array) {
	let curInd = array.length;
	let randInd;

	while (curInd !== 0) {
		randInd = Math.floor(Math.random() * curInd);
		curInd--;
		[array[curInd], array[randInd]] = [array[randInd], array[curInd]];
	}

	return array;
}

export { shuffle };