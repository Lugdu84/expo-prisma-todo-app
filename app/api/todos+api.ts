import { prisma } from '@/prisma/client';

export async function GET() {
	const todos = await prisma.todo.findMany();
	return new Response(JSON.stringify(todos), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
