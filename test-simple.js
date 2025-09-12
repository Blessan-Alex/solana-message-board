#!/usr/bin/env node

const { Connection, PublicKey } = require('@solana/web3.js');

// Configuration
const PROGRAM_ID = 'CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj';
const RPC_URL = 'https://api.devnet.solana.com';

async function testProgram() {
  console.log('🚀 Starting Simple Solana Program Test...\n');

  // Create connection
  const connection = new Connection(RPC_URL, 'confirmed');
  console.log('✅ Connected to Solana devnet');

  try {
    // Test 1: Check if the program exists
    console.log('\n📋 Test 1: Checking if program exists...');
    const programInfo = await connection.getAccountInfo(new PublicKey(PROGRAM_ID));
    
    if (programInfo) {
      console.log('✅ Program exists on blockchain');
      console.log(`   Owner: ${programInfo.owner.toString()}`);
      console.log(`   Executable: ${programInfo.executable}`);
      console.log(`   Data length: ${programInfo.data.length} bytes`);
    } else {
      console.log('❌ Program not found on blockchain');
      return;
    }

    // Test 2: Try to find message accounts
    console.log('\n📋 Test 2: Looking for message accounts...');
    
    // Get all accounts owned by our program
    const accounts = await connection.getProgramAccounts(new PublicKey(PROGRAM_ID));
    console.log(`Found ${accounts.length} accounts owned by the program`);

    if (accounts.length > 0) {
      console.log('\n📄 Message accounts found:');
      
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        console.log(`\n  Account ${i + 1}:`);
        console.log(`    Address: ${account.pubkey.toString()}`);
        console.log(`    Data length: ${account.account.data.length} bytes`);
        
        // Try to decode the account data
        try {
          // The account data structure should be:
          // 8 bytes discriminator + 32 bytes author + 4 bytes content length + content + 8 bytes timestamp
          const data = account.account.data;
          
          if (data.length >= 8) {
            // Skip the 8-byte discriminator
            let offset = 8;
            
            // Read author (32 bytes)
            if (data.length >= offset + 32) {
              const authorBytes = data.slice(offset, offset + 32);
              const author = new PublicKey(authorBytes);
              console.log(`    Author: ${author.toString()}`);
              offset += 32;
            }
            
            // Read content length (4 bytes)
            if (data.length >= offset + 4) {
              const contentLength = data.readUInt32LE(offset);
              console.log(`    Content length: ${contentLength} bytes`);
              offset += 4;
              
              // Read content
              if (data.length >= offset + contentLength) {
                const contentBytes = data.slice(offset, offset + contentLength);
                const content = contentBytes.toString('utf8');
                console.log(`    Content: "${content}"`);
                offset += contentLength;
                
                // Read timestamp (8 bytes)
                if (data.length >= offset + 8) {
                  const timestampBytes = data.slice(offset, offset + 8);
                  const timestamp = timestampBytes.readBigInt64LE();
                  const timestampMs = Number(timestamp) * 1000;
                  console.log(`    Timestamp: ${timestamp}`);
                  console.log(`    Timestamp (formatted): ${new Date(timestampMs).toLocaleString()}`);
                  
                  if (timestamp > 0) {
                    console.log(`    ✅ Timestamp is working!`);
                  } else {
                    console.log(`    ⚠️ Timestamp is zero or invalid`);
                  }
                } else {
                  console.log(`    ❌ No timestamp field found (old message format)`);
                }
              }
            }
          }
        } catch (error) {
          console.log(`    ❌ Error decoding account data: ${error.message}`);
        }
      }
    } else {
      console.log('No message accounts found');
    }

    // Test 3: Check recent transactions
    console.log('\n📋 Test 3: Checking recent program transactions...');
    try {
      const signatures = await connection.getSignaturesForAddress(new PublicKey(PROGRAM_ID), { limit: 5 });
      console.log(`Found ${signatures.length} recent transactions`);
      
      for (const sig of signatures) {
        console.log(`  ${sig.signature} - Slot: ${sig.slot} - ${sig.blockTime ? new Date(sig.blockTime * 1000).toLocaleString() : 'No block time'}`);
      }
    } catch (error) {
      console.log(`❌ Error fetching transactions: ${error.message}`);
    }

  } catch (error) {
    console.log('❌ Error during testing:', error.message);
    console.log('Error details:', error);
  }

  console.log('\n🏁 Test completed');
}

// Run the test
testProgram().catch(console.error);
