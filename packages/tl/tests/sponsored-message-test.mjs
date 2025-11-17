/**
 * Test to verify SponsoredMessage types exist in the schema
 * This test reads the api-schema.json and verifies the types are present
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schemaPath = join(__dirname, '../api-schema.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));

console.log('Testing SponsoredMessage support...\n');

// Test data: [id, name, type]
const requiredTypes = [
  [0x7dbf8673, 'sponsoredMessage', 'SponsoredMessage'],
  [0xffda656d, 'messages.sponsoredMessages', 'messages.SponsoredMessages'],
  [0x1839490f, 'messages.sponsoredMessagesEmpty', 'messages.SponsoredMessages'],
];

let allPassed = true;

for (const [id, name, expectedType] of requiredTypes) {
  const entry = schema.e.find(e => e.id === id);
  
  if (!entry) {
    console.error(`❌ FAIL: ${name} (id: ${id.toString(16)}) not found in schema`);
    allPassed = false;
    continue;
  }
  
  if (entry.name !== name) {
    console.error(`❌ FAIL: Expected name ${name}, got ${entry.name}`);
    allPassed = false;
    continue;
  }
  
  if (entry.type !== expectedType) {
    console.error(`❌ FAIL: Expected type ${expectedType}, got ${entry.type}`);
    allPassed = false;
    continue;
  }
  
  console.log(`✅ PASS: ${name}`);
  console.log(`   ID: 0x${id.toString(16)}`);
  console.log(`   Type: ${entry.type}`);
  if (entry.arguments && entry.arguments.length > 0) {
    console.log(`   Fields: ${entry.arguments.map(a => a.name).join(', ')}`);
  }
  console.log();
}

// Test that related methods exist
const relatedMethods = [
  'messages.getSponsoredMessages',
  'messages.viewSponsoredMessage',
  'messages.clickSponsoredMessage',
];

console.log('Checking related methods...');
for (const methodName of relatedMethods) {
  const method = schema.e.find(e => e.name === methodName);
  if (method) {
    console.log(`✅ PASS: ${methodName} exists`);
  } else {
    console.error(`❌ FAIL: ${methodName} not found`);
    allPassed = false;
  }
}

console.log('\n' + '='.repeat(80));
if (allPassed) {
  console.log('✅ All tests passed! SponsoredMessage support is complete.');
  process.exit(0);
} else {
  console.error('❌ Some tests failed!');
  process.exit(1);
}
