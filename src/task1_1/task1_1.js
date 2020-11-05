import readline from 'readline';

const rl = readline.createInterface({
      input: process.stdin,
    });

rl.on('line', (line) => {
  process.stdout.write(`${[...line].reverse().join('')}\n`);
});