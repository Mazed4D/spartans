// EXAMPLE FUNCTION ARGUMENTS
const obj1 = { a: 1, b: 'yes', c: false };
const arr1 = ['foo', 'bar', 3];
const obj2 = { b: 'yes', c: false, a: 1 };
const arr2 = [3, 'foo', 'bar'];

const inputFunction = (...args) => {
	// RETURN A NUMBER OF CHARACTERS OF GIVEN STRINGIFIED ARGUMENT ARRAY
	const stringedArgs = JSON.stringify(args);
	const length = stringedArgs.length;

	console.log(`Result done in function: ${length}`);
	console.log(`Arguments: ${stringedArgs}\n`);

	return length;
};

const memo = (func) => {
	// CREATE CACHE OBJECT
	const cache = {};

	return (...args) => {
		// CREATE A NEW ARRAY WITH SORTED ELEMENTS
		const sortedArgs = args.map((arg) => {
			if (Array.isArray(arg)) {
				// RETURN A NEW SORTED ARRAY
				return arg.slice(0).sort();
			} else if (typeof arg === 'object') {
				// RETURN A NEW OBJECT WITH SORTED KEYS
				const newObj = {};
				// CREATE A SORTED ARRAY OF KEYS OF GIVEN ARGUMENT OBJECT
				const keys = Object.keys(arg).sort();
				// ITERATE THROUGH KEYS ARRAY AND SET KEY:VALUE PAIRS TO NEW OBJECT
				keys.forEach((key) => {
					newObj[key] = arg[key];
				});
				return newObj;
			} else {
				// IF NOT ARRAY OR OBJECT RETURN UNMODIFIED ARGUMENT
				return arg;
			}
		});

		// CREATE KEY STRING FOR GIVEN ARGUMENTS
		const key = JSON.stringify(sortedArgs);
		// CHECK IF CREATED KEY DOESN'T EXIST WITHIN CACHE OBJECT
		// IF IT DOESN'T EXIST RUN GIVEN GIVEN FUNCTION AND ADD THE RESULT TO CACHE OBJECT
		if (!cache[key]) {
			cache[key] = func(...sortedArgs);
			return;
		}
		// IF IT EXISTS RETURN VALUE FROM CACHE OBJECT
		console.log(`Result pulled from cache: ${cache[key]}`);
		console.log(`Arguments: ${key}\n`);
		return cache[key];
	};
};

const memoizedInputFunc = memo(inputFunction);

memoizedInputFunc(obj1, arr1);
memoizedInputFunc(obj2, arr2);
