// A simple function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

export const mockUsers = [
  { id: 'u1', username: 'admin', role: 'admin' },
  { id: 'u2', username: 'student1', role: 'student' },
  { id: 'u3', username: 'student2', role: 'student' },
  { id: 'u4', username: 'student3', role: 'student' },
];

// Use current date for assignment deadlines
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

export const mockAssignments = [
  {
    id: generateId(),
    title: 'React Component Lifecycle',
    description: 'Create a component that uses all three phases of the lifecycle (mounting, updating, unmounting) with logging.',
    dueDate: tomorrow.toISOString().split('T')[0], // Due tomorrow
    maxScore: 100,
  },
  {
    id: generateId(),
    title: 'Tailwind CSS Layout Challenge',
    description: 'Recreate a provided Figma design using only Tailwind utility classes.',
    dueDate: tomorrow.toISOString().split('T')[0], // Due tomorrow
    maxScore: 50,
  },
  {
    id: generateId(),
    title: 'Node.js Server Setup',
    description: 'Set up a basic express server.',
    dueDate: yesterday.toISOString().split('T')[0], // Overdue
    maxScore: 75,
  },
];

// Initial mock submission for testing the tracker and grading features
export const mockSubmissions = [
    { 
        id: generateId(), 
        assignmentId: mockAssignments[0].id, 
        studentId: 'u2', 
        submittedOn: new Date().toISOString().split('T')[0], 
        status: 'graded',
        score: 85,
        feedback: "Good use of useEffect hooks. Missing cleanup in unmount phase."
    },
    { 
        id: generateId(), 
        assignmentId: mockAssignments[1].id, 
        studentId: 'u3', 
        submittedOn: new Date().toISOString().split('T')[0], 
        status: 'submitted',
        score: null,
        feedback: null
    },
];