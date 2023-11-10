import { useState } from 'react'
import { database } from '../firebase'


const CreateNote = ({ setMessage1 }) => {
	const [noteTitle, setNoteTitle] = useState('')
	const [noteText, setNoteText] = useState('')
	const [noteTagline, setNoteTagline] = useState('')


	const submitNote = async () => {
		if (noteTitle.length === 0 && noteText.length === 0) {
			return setMessage1('Note is Empty')
		}

		setMessage1('Loading...')
		const dataObj = {
			title: noteTitle,
			description: noteText
		}
		function creteNote(title, description) {
			const newNoteKey = database.ref('/notes').push().key
			const addNote = {}
			addNote['/notes/' + newNoteKey] = { id: newNoteKey, title, description }
			database.ref().update(addNote)
		}
		creteNote(dataObj.title, dataObj.description)
		setNoteTitle('')
		setNoteText('')
		setNoteTagline('')
		setMessage1('')
	}

	return (
		<form className='create-note'>
			<input
				type='text'
				className='note-title'
				placeholder='Title'
				value={noteTitle}
				onChange={(e) => setNoteTitle(e.target.value)}
			/>
			{/* <input
				type='text'
				className='note-title2'
				placeholder='Tagline'
				value={noteTagline}
				onChange={(e) => setNoteTagline(e.target.value)}
			/> */}
			<textarea
				className='note-area'
				value={noteText}
				onChange={(e) => setNoteText(e.target.value)}
				placeholder='Take a note...'
			/>

			<input
				className='note-create-btn'
				type='button'
				value='+'
				onClick={() => submitNote()}
			/>
		</form>
	)
}

export default CreateNote
