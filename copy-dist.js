import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.lstatSync(fromPath).isDirectory()) {
            copyFolderSync(fromPath, toPath);
        } else {
            fs.copyFileSync(fromPath, toPath);
        }
    });
}

if (process.env.RENDER === 'true') {
    console.log('Detecting Render environment. Copying build output to root...');
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
        copyFolderSync(distPath, __dirname);
        console.log('Successfully copied dist files to root for Render deploy.');
    } else {
        console.error('Error: dist folder not found!');
    }
} else {
    console.log('Running locally. Skipped copying dist to root to preserve dev environment.');
}
