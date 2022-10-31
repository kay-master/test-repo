import fs from "fs";

async function openFile(path: string): Promise<number> {
	return new Promise((resolve, reject) => {
		fs.open(path, "r", (err, fd) => {
			if (err) {
				if (err.code === "ENOENT") {
					reject(new Error("File does not exist"));
					return;
				}

				reject(err);
			}

			resolve(fd);
		});
	});
}

async function fileContents(
	path: string,
	callback: (
		err: NodeJS.ErrnoException | null,
		data?: { bytes: number; buffer: string }
	) => void
) {
	let fileDescriptor = 0;

	try {
		if (!path) {
			console.error(`Path is required`);
			return;
		}

		fileDescriptor = await openFile(path);

		fs.read(fileDescriptor, (err, bytes, buffer) => {
			if (err) {
				return callback(err);
			}

			return callback(null, {
				// @ts-ignore
				buffer: buffer.slice(0, bytes).toString(),
				bytes,
			});
		});
	} catch (error) {
		// Close the opened file.
		fs.close(fileDescriptor, (err) => {
			if (err) {
				console.log(err);
			}
		});

		callback(error);
	}
}

async function getFileContents(path: string) {
	const data = new Promise(async (resolve, reject) => {
		await fileContents(path, (err, contents) => {
			if (err) {
				reject(err);
				return;
			}

			if (contents && contents.bytes > 0) {
				resolve(contents.buffer);
			}

			reject("No file contents");
		});
	});

	return (await data) as Promise<string>;
}

export default getFileContents;
