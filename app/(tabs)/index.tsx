import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
	const handleCreateTodo = async () => {
		const response = await fetch('/api/todo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: 'Nouvelle tâche' }),
		});
	};
	return (
		<SafeAreaView style={styles.container}>
			<Text> Hello Prisma ! </Text>
			<Button
				title="Créer une tâche"
				onPress={() => {
					handleCreateTodo()
						.then(() => {
							console.log('Tâche créée avec succès');
						})
						.catch((error) => {
							console.error('Erreur lors de la création de la tâche:', error);
						});
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
});
