const Semaphore = require('coroutine').Semaphore;

/**
 * constructor Function
 * size number optional
 * timeout number optional
 */
module.exports = (constructor, size = 10, timeout = 60000) => {
	const sem = new Semaphore(size);
	let pools = [];
	let count = 0;

	return fn => {
		let result;
		let instance;
		let instanceHandler;
		const now = Date.now();

		while (count) {
			instance = pools[0];
			if (now - instance.time > timeout) {
				pools = pools.slice(1);
				count--;
				try {
					instance.instanceHandler.dispose();
				} catch (e) {
					console.error("pool error: ", e.toString());
				}
			} else { break; }
		}

		sem.acquire();
		try {
			instanceHandler = count ? pools[--count].instanceHandler : constructor();
			result = fn(instanceHandler);
			pools[count++] = {
				instanceHandler,
				time: Date.now()
			};
			sem.post();
		} catch (err) {
			sem.post();
			try {
				instance.dispose();
			} catch (err) { }

			throw err;
		}
		return result;
	}
}