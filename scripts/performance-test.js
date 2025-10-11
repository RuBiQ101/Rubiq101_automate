const autocannon = require('autocannon');

async function runTests() {
  console.log('🚀 Starting performance tests...\n');

  const tests = [
    { url: 'http://localhost:3001/health', title: 'Health Check' },
    { url: 'http://localhost:3001/api/workflows', title: 'Workflows API', headers: { 'Authorization': 'Bearer your-test-token' } },
    { url: 'http://localhost:3000', title: 'Frontend' },
  ];

  for (const test of tests) {
    console.log(`Testing: ${test.title}`);
    const result = await autocannon({
      url: test.url,
      connections: 10,
      duration: 10,
      headers: test.headers,
    });

    console.log(`\nResults for ${test.title}:`);
    console.log(`  Requests/sec: ${result.requests.average}`);
    console.log(`  Latency (avg): ${result.latency.average}ms`);
    console.log(`  Throughput: ${result.throughput.average} bytes/sec\n`);
  }
}

if (require.main === module) {
  runTests().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
