import { prisma } from '@/prisma/client';

export async function POST(request: Request) {
	const { title } = await request.json();

	if (!title) {
		return Response.json({ error: 'Title is required' }, { status: 400 });
	}

	const todo = await prisma.todo.create({
		data: {
			title,
		},
	});
	return new Response(JSON.stringify(todo), {
		status: 201,
	});
}
