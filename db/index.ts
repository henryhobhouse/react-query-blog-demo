import fs from 'fs-extra';
import path from 'path';
import { Post } from '../src/api/types';

const storeLocation = path.resolve(process.cwd(), 'store.json');

interface DbContent {
  posts: Post[];
}

async function set(updater: (db: DbContent) => void) {
  const file = await fs.readJSON(storeLocation);
  const newFile = updater(file);
  await fs.writeJSON(storeLocation, newFile, { spaces: 2 });
}

function get(): Promise<DbContent> {
  return fs.readJSON(storeLocation);
}

const dbGetterAndSetter = {
  set,
  get,
};

export default dbGetterAndSetter;
