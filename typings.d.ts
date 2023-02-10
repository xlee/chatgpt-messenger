interface Message {
	text: string, 
	createdAt: adming.firestore.Timestamp; 
	user: {
		_id: string;
		name: string; 
		avatar: string, 
	};
}