# Queue Functionality Verification Guide

## Prerequisites
- ✅ Redis is running (Docker container: workflow_redis)
- ✅ PostgreSQL is running (Docker container: workflow_postgres)
- ✅ Redis Commander UI available at http://localhost:8081

## Step 1: Start the API Server

Open a terminal and run:
```powershell
cd "c:\New workspace for n8n\ai-workflow-platform\backend"
npm run dev
```

You should see:
```
✅ Server running on http://localhost:3001
🔗 API Endpoints:
   - Root: http://localhost:3001/
   - Execute Workflow: http://localhost:3001/api/executions/:workflowId/execute
```

## Step 2: Start the Worker

Open a **second terminal** and run:
```powershell
cd "c:\New workspace for n8n\ai-workflow-platform\backend"
npm run worker
```

You should see:
```
✅ Workflow worker started and listening for jobs...
📋 Queue: workflowQueue
🔗 Redis: localhost:6379
```

## Step 3: Test Queue Functionality

### Option A: Using PowerShell
In a **third terminal**, run:
```powershell
$body = @{
    triggerData = @{ foo = "bar"; timestamp = (Get-Date).ToString() }
    userId = "user-uuid-123"
} | ConvertTo-Json

$response = Invoke-RestMethod `
    -Uri "http://localhost:3001/api/executions/workflow-123/execute" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"

$response | ConvertTo-Json
```

### Option B: Using the Test Script
```powershell
cd "c:\New workspace for n8n\ai-workflow-platform\backend"
node test-queue.js
```

### Option C: Using curl (if available)
```bash
curl -X POST http://localhost:3001/api/executions/workflow-123/execute \
  -H "Content-Type: application/json" \
  -d '{"triggerData": {"foo": "bar"}, "userId": "user-uuid"}'
```

### Option D: Using Browser/Postman
- URL: `POST http://localhost:3001/api/executions/workflow-123/execute`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "triggerData": {
    "foo": "bar"
  },
  "userId": "user-uuid"
}
```

## Expected Results

### 1. API Response
You should receive:
```json
{
  "jobId": "1",
  "status": "queued"
}
```

### 2. Worker Terminal
You should see:
```
Processing workflow workflow-123 for user user-uuid
Job 1 completed
```

### 3. Redis Commander UI
Visit http://localhost:8081 and you should see keys like:
- `bull:workflowQueue:id`
- `bull:workflowQueue:completed`
- `bull:workflowQueue:jobs`

## Step 4: Verify in Redis CLI (Optional)

```powershell
docker exec -it workflow_redis redis-cli

# Inside Redis CLI:
KEYS bull:workflowQueue:*
GET bull:workflowQueue:id
LRANGE bull:workflowQueue:completed 0 -1
```

## Troubleshooting

### Server exits immediately
- Make sure no other process is using port 3001
- Check if there are any TypeScript compilation errors

### Worker exits immediately  
- Verify Redis is running: `docker ps | findstr redis`
- Test Redis connection: Run the test-queue.js script

### "Cannot connect to server" error
- Ensure the server is running and hasn't exited
- Try accessing http://localhost:3001/health in your browser

### Jobs not being processed
- Verify the worker is running
- Check Redis connection
- Look for errors in the worker terminal

## Success Indicators

✅ API returns `{ jobId: '...', status: 'queued' }`
✅ Worker logs show "Job ... completed"
✅ Redis Commander shows bull:workflowQueue:* keys
✅ No errors in server or worker terminals

## Next Steps

Once verified, you can:
1. Implement the actual WorkflowEngine class
2. Add more job types and handlers
3. Implement job progress tracking
4. Add job retry logic
5. Set up job scheduling