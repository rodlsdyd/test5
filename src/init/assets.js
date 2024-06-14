import fs from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

let gameAssets = {};

// 경로에 파일 을 읽는방법
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 최상위 경로 + assets 폴더
const basePath = path.join(__dirname, '../../assets');

//파일 읽는 함수
// 비동기 병렬로 파일을 읽는다.
const readFilesAsync = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(JSON.parse(data));
    });
  });
};

// promise.all()
export const loadGameAssets = async () => {
  try {
    const [stages, items, itemUnlocks] = await Promise.all([
      readFilesAsync('stage.json'),
      readFilesAsync('item.json'),
      readFilesAsync('item_unlock.json'),
    ]);

    gameAssets = { stages, items, itemUnlocks };
    return gameAssets;
  } catch (e) {
    throw new Error('failed to load game assets: ' + e.message);
  }
};

export const getGameAssets = () => {
  return gameAssets;
};
