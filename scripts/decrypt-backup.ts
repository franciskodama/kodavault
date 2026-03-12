import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

const ALGORITHM = 'aes-256-gcm';

function decrypt(encryptedData: string, password: string) {
  const buffer = Buffer.from(encryptedData, 'base64');
  
  // Extract pieces from the buffer
  const salt = buffer.subarray(0, 16);
  const iv = buffer.subarray(16, 28);
  const authTag = buffer.subarray(28, 44);
  const encryptedText = buffer.subarray(44);

  // Derive key using the same salt
  // @ts-ignore
  const key = crypto.scryptSync(password, salt, 32);
  // @ts-ignore
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  // @ts-ignore
  return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString('utf8');
}

async function main() {
  const password = process.env.BACKUP_PASSWORD;
  const filePath = process.argv[2];

  if (!password || !filePath) {
    console.log('Usage: BACKUP_PASSWORD=your_password npx tsx scripts/decrypt-backup.ts <path_to_enc_file>');
    process.exit(1);
  }

  try {
    const encryptedContent = fs.readFileSync(path.resolve(filePath), 'utf8');
    const decryptedJson = decrypt(encryptedContent, password);
    
    const outputName = filePath.replace('.enc', '.json');
    fs.writeFileSync(outputName, decryptedJson);
    
    console.log(`✅ Decrypted successfully! Saved as: ${outputName}`);
  } catch (error) {
    console.error('❌ Decryption failed. Check your password or file integrity.');
  }
}

main();
