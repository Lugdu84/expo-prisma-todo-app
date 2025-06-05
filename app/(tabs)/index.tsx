import { Todo } from '@/prisma/generated/client';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
	const [title, setTitle] = useState('');
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		const response = await fetch('/api/todos');
		const data = await response.json();
		if (!response.ok) {
			console.error('Erreur lors de la récupération des tâches:', data);
			return;
		}
		setTodos(data);
		console.log('Tâches récupérées:', data);
	};

	const handleCreateTodo = async () => {
		const response = await fetch('/api/todo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title }),
		});

		const data = await response.json();

		if (!response.ok) {
			console.error('Erreur lors de la création de la tâche:', data);
			return;
		}
		setTodos((prevTodos) => [...prevTodos, data]);

		setTitle('');

		console.log('Tâche créée:', data);
	};
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}> Hello Prisma ! </Text>
			<TextInput
				onChangeText={setTitle}
				value={title}
				style={styles.input}
				placeholder="Nouvelle tâche"
			/>
			<Button
				disabled={!title}
				title="Créer une tâche"
				onPress={() => handleCreateTodo()}
			/>
			<FlatList
				data={todos}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Text>
						{item.title} - {item.completed ? 'Terminé' : 'En cours'}
					</Text>
				)}
				ListEmptyComponent={<Text>Aucune tâche à afficher</Text>}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		gap: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 12,
		marginBottom: 16,
		paddingHorizontal: 8,
	},
});
