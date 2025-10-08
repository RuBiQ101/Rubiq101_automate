const { Queue } = require('bullmq');
const Redis = require('ioredis');

const redisOptions = {
  host: 'localhost',
  port: 6379,
};

async function testQueue() {
  console.log('🧪 Testing Queue Functionality\n');

  // Create queue
  const queue = new Queue('workflowQueue', {
    connection: redisOptions,
  });

  try {
    // Add a test job
    console.log('📤 Adding test job to queue...');
    const job = await queue.add('executeWorkflow', {
      workflowId: 'test-workflow-123',
      triggerData: { foo: 'bar', test: true },
      userId: 'test-user-uuid',
    });

    console.log(`✅ Job added successfully!`);
    console.log(`   Job ID: ${job.id}`);
    console.log(`   Job Name: ${job.name}`);
    console.log(`   Job Data:`, job.data);

    // Check Redis keys
    console.log('\n🔍 Checking Redis keys...');
    const redis = new Redis(redisOptions);
    const keys = await redis.keys('bull:workflowQueue:*');
    console.log(`   Found ${keys.length} keys in Redis:`);
    keys.slice(0, 10).forEach(key => console.log(`   - ${key}`));
    if (keys.length > 10) {
      console.log(`   ... and ${keys.length - 10} more`);
    }

    // Get job status
    console.log('\n📊 Job Status:');
    const jobState = await job.getState();
    console.log(`   State: ${jobState}`);

    await redis.quit();
    await queue.close();

    console.log('\n✅ Test completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. Start the worker: npm run worker');
    console.log('   2. The worker will process this job');
    console.log('   3. Check Redis Commander at http://localhost:8081');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await queue.close();
    process.exit(1);
  }
}

testQueue();