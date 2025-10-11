import { db } from '../database/db';
import { hashPassword } from '../utils/password';

async function seedDatabase() {
  console.log('Seeding database...');

  // Create demo user
  const hashedPassword = await hashPassword('demo123');
  const userResult = await db.query(
    `INSERT INTO users (email, password_hash, name, role) 
     VALUES ($1, $2, $3, $4) 
     ON CONFLICT (email) DO NOTHING 
     RETURNING id`,
    ['demo@example.com', hashedPassword, 'Demo User', 'user']
  );

  let userId = userResult.rows[0]?.id;
  if (!userId) {
    // User already exists, get their ID
    const existingUser = await db.query('SELECT id FROM users WHERE email = $1', ['demo@example.com']);
    userId = existingUser.rows[0].id;
  }

  // Create sample workflows
  const workflows = [
    {
      name: 'Welcome Email Automation',
      description: 'Sends personalized welcome emails to new users',
      definition: {
        steps: [
          {
            id: 'trigger1',
            type: 'trigger',
            name: 'New User Signup',
            config: { event: 'user.created' },
            next: ['ai1']
          },
          {
            id: 'ai1',
            type: 'ai',
            name: 'Generate Welcome Message',
            config: {
              prompt: 'Generate a personalized welcome email for {{user.name}} who signed up for our AI workflow platform',
              model: 'gpt-3.5-turbo'
            },
            next: ['action1']
          },
          {
            id: 'action1',
            type: 'action',
            name: 'Send Email',
            config: {
              service: 'email',
              to: '{{user.email}}',
              subject: 'Welcome to AI Workflow Platform!'
            },
            next: []
          }
        ]
      },
      status: 'active'
    },
    {
      name: 'Content Generation Pipeline',
      description: 'Generates blog posts from topics using AI',
      definition: {
        steps: [
          {
            id: 'trigger2',
            type: 'trigger',
            name: 'Topic Input',
            config: { type: 'manual' },
            next: ['ai2']
          },
          {
            id: 'ai2',
            type: 'ai',
            name: 'Generate Outline',
            config: {
              prompt: 'Create a detailed blog post outline for the topic: {{topic}}',
              model: 'gpt-4'
            },
            next: ['ai3']
          },
          {
            id: 'ai3',
            type: 'ai',
            name: 'Write Article',
            config: {
              prompt: 'Write a full blog post based on this outline: {{outline}}',
              model: 'gpt-4'
            },
            next: ['action2']
          },
          {
            id: 'action2',
            type: 'action',
            name: 'Save to CMS',
            config: {
              service: 'cms',
              action: 'create_draft'
            },
            next: []
          }
        ]
      },
      status: 'draft'
    }
  ];

  for (const workflow of workflows) {
    await db.query(
      `INSERT INTO workflows (user_id, name, description, definition, status)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT DO NOTHING`,
      [userId, workflow.name, workflow.description, JSON.stringify(workflow.definition), workflow.status]
    );
  }

  console.log('✅ Database seeded successfully!');
  console.log('Demo user: demo@example.com / demo123');
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export { seedDatabase };
