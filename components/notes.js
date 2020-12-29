import { useEffect, useState } from 'react'
import { database } from '../firebase'


const Notes = ({
	setEditId,
	setEditTitle,
	setEditText,
	setShowEditForm,

}) => {
	const [allNotes, updateAllNotes] = useState([])

	useEffect(() => {
		function getAllNotes() {
			const notesRef = database.ref('/notes')

			notesRef.on('value', snapshot => {
				let data = snapshot.val() || []
				data = Object.values(data).reverse()
				updateAllNotes(data)
			})
		}
		getAllNotes()
	}, [])


	const handleClick = (id, title, description) => {
		setEditId(id)
		setEditTitle(title)
		setEditText(description)
		setShowEditForm(true)
	}

	return (
		<div className='notes'>
			{allNotes?.map((note) => (
				<div
					key={note.id}
					className='note'
					onClick={() =>
						handleClick(note.id, note.title, note.description)
					}
				>
					<img
						src='/svgs/edit-pen.svg'
						alt='edit-svg'
						className='edit-svg'
					/>

					<h3>{note.title}</h3>
					<p>{note.description}</p>
				</div>
			))}
		</div>
	)
}

export default Notes
